
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { triviaQuestions as allTriviaQuestions, storyline, achievements as initialAchievementsData, leaderboardData } from '@/lib/trivia-data';
import type { TriviaQuestion, StorylineHint, Achievement, LeaderboardEntry } from '@/lib/trivia-data';
import QuestionCard from './QuestionCard';
import HintDisplay from './HintDisplay';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from "@/components/ui/progress";
import { generateHint } from '@/ai/flows/generate-hint';
import type { GenerateHintOutput } from '@/ai/flows/generate-hint';
import { useToast } from "@/hooks/use-toast";
import { Award, CheckCircle, XCircle, Zap, ChevronRight, RefreshCw } from 'lucide-react';
import Link from 'next/link';

const QUESTIONS_PER_GAME = 10; // Number of questions to play per game

// Helper to update achievement state
const updateAchievementProgress = (
  achievementsList: Achievement[],
  achievementId: string,
  setAchievements: React.Dispatch<React.SetStateAction<Achievement[]>>
) => {
  setAchievements(prev =>
    prev.map(ach =>
      ach.id === achievementId && !ach.unlocked ? { ...ach, unlocked: true } : ach
    )
  );
};


export default function TriviaGame() {
  const [activeQuestions, setActiveQuestions] = useState<TriviaQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [unlockedStoryHints, setUnlockedStoryHints] = useState<StorylineHint[]>(
    () => storyline.filter(h => h.unlocked)
  );
  const [currentGeneratedHint, setCurrentGeneratedHint] = useState<GenerateHintOutput | null>(null);
  const [isHintLoading, setIsHintLoading] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [achievements, setAchievements] = useState<Achievement[]>(() =>
    initialAchievementsData.map(a => ({ ...a, unlocked: false }))
  );
  const [showFeedback, setShowFeedback] = useState<{ type: 'correct' | 'incorrect'; message: string } | null>(null);

  const { toast } = useToast();
  const [toastedAchievementIds, setToastedAchievementIds] = useState<Set<string>>(new Set());

  const shuffleAndSelectQuestions = useCallback(() => {
    const shuffled = [...allTriviaQuestions].sort(() => 0.5 - Math.random());
    const selectedQuestions = shuffled.slice(0, QUESTIONS_PER_GAME);
    if (selectedQuestions.length < QUESTIONS_PER_GAME && allTriviaQuestions.length >= QUESTIONS_PER_GAME) {
      // Fallback if somehow slice didn't get enough, though unlikely with QUESTIONS_PER_GAME <= allTriviaQuestions.length
       setActiveQuestions(allTriviaQuestions.slice(0, QUESTIONS_PER_GAME));
    } else if (selectedQuestions.length === 0 && allTriviaQuestions.length > 0) {
      // Fallback if allTriviaQuestions is very small
      setActiveQuestions(allTriviaQuestions.slice(0, allTriviaQuestions.length));
    }
    else {
      setActiveQuestions(selectedQuestions);
    }
  }, []);

  const resetGame = useCallback(() => {
    shuffleAndSelectQuestions();
    setCurrentQuestionIndex(0);
    setScore(0);
    setGameOver(false);
    setUnlockedStoryHints(storyline.filter(h => h.unlocked)); // Reset to initially unlocked
    setAchievements(initialAchievementsData.map(a => ({ ...a, unlocked: false })));
    setShowFeedback(null);
    setCurrentGeneratedHint(null);
    setToastedAchievementIds(new Set());
  }, [shuffleAndSelectQuestions]);

  useEffect(() => {
    resetGame();
  }, [resetGame]);

  const currentQuestion = activeQuestions[currentQuestionIndex];

  const handleAnswerSubmit = useCallback(async (answer: string) => {
    if (!currentQuestion) return;

    const isCorrect = answer === currentQuestion.answer;

    if (isCorrect) {
      const newScore = score + 100;
      setScore(newScore);
      setShowFeedback({ type: 'correct', message: 'Correct! Well done, RiverRat!' });
      toast({
        title: "Correct!",
        description: "You're navigating these waters like a true expert!",
        variant: "default",
      });

      // Simplified achievement checks for example
      if (newScore >= 300 && newScore < 500) { // Example: first few correct
         updateAchievementProgress(achievements, 'five_correct', setAchievements); // Re-purpose or rename achievement
      }
       if (currentQuestion.storylineHintKey.includes("boldt")) {
        updateAchievementProgress(achievements, 'all_hints_category1', setAchievements);
      }
      if (currentQuestion.storylineHintKey === "fish_expert_clue") {
        updateAchievementProgress(achievements, 'fish_expert', setAchievements);
      }


      setIsHintLoading(true);
      try {
        const hintResult = await generateHint({
          question: currentQuestion.question,
          answer: currentQuestion.answer,
        });
        setCurrentGeneratedHint(hintResult);

        const storyHint = storyline.find(h => h.key === currentQuestion.storylineHintKey);
        if (storyHint && !unlockedStoryHints.some(ush => ush.key === storyHint.key)) {
          const newUnlockedHint = { ...storyHint, unlocked: true, text: hintResult.hint };
          setUnlockedStoryHints(prev => {
            const updatedHints = [...prev, newUnlockedHint];
            if (updatedHints.length >= storyline.filter(h => h.key !== 'final_revelation').length) {
                updateAchievementProgress(achievements, 'story_complete', setAchievements);
            }
            return updatedHints;
          });
           updateAchievementProgress(achievements, 'first_hint', setAchievements);
        }
      } catch (error) {
        console.error("Error generating hint:", error);
        toast({ title: "Hint Error", description: "Could not generate a hint at this time.", variant: "destructive" });
        setCurrentGeneratedHint(null);
      } finally {
        setIsHintLoading(false);
      }
    } else {
      setShowFeedback({ type: 'incorrect', message: `Not quite! The correct answer was: ${currentQuestion.answer}` });
      toast({
        title: "Incorrect",
        description: `The correct answer was: ${currentQuestion.answer}`,
        variant: "destructive",
      });
      // Play fog horn sound
      try {
        const audio = new Audio('/sounds/fog-horn.mp3');
        audio.play();
      } catch (error) {
        console.error("Error playing sound:", error);
        // You could add a toast here if sound playback fails, if desired
      }
    }
  }, [currentQuestion, score, toast, unlockedStoryHints, achievements]);

  const handleProceedToNext = useCallback(() => {
    setShowFeedback(null);
    setCurrentGeneratedHint(null);

    if (currentQuestionIndex < (activeQuestions.length > 0 ? activeQuestions.length : QUESTIONS_PER_GAME) - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
      setGameOver(true);
      const finalScore = score;
      const userEntry = leaderboardData.find(e => e.name === "You");
      if (userEntry) {
        userEntry.score = Math.max(userEntry.score, finalScore); // Keep highest score
      } else {
        leaderboardData.push({id: "currentUser", name: "You", score: finalScore, avatar: "https://placehold.co/40x40.png?text=U"});
      }
      leaderboardData.sort((a,b) => b.score - a.score);
      if(leaderboardData.findIndex(e => e.name === "You") < 3 && finalScore > 0){
          updateAchievementProgress(achievements, 'top_leaderboard', setAchievements);
      }
    }
  }, [currentQuestionIndex, activeQuestions.length, score, achievements]);


  useEffect(() => {
    achievements.forEach(ach => {
      if (ach.unlocked && !toastedAchievementIds.has(ach.id)) {
        toast({
          title: "Achievement Unlocked!",
          description: (
            <div className="flex items-center">
              {React.createElement(ach.icon, { className: "w-5 h-5 mr-2 text-accent" })}
              <span>{ach.name}: {ach.description}</span>
            </div>
          ),
          action: (
            <Link href="/achievements">
              <Button variant="outline" size="sm">
                View
              </Button>
            </Link>
          ),
        });
        setToastedAchievementIds(prev => new Set(prev).add(ach.id));
      }
    });
  }, [achievements, toast, toastedAchievementIds]);


  if (gameOver) {
    return (
      <Card className="w-full max-w-lg mx-auto text-center p-8 shadow-xl bg-card/90 backdrop-blur-sm animate-slideUp">
        <CardHeader>
          <Award className="w-16 h-16 mx-auto text-accent mb-4" />
          <CardTitle className="font-headline text-4xl text-primary">Adventure Complete!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-2xl">Your Final Score: <span className="font-bold text-accent">{score}</span></p>
          <p className="text-lg text-foreground/80">
            You've navigated the treacherous waters of Thousand Islands trivia. Check the storyline for your discovered secrets and the leaderboard to see your standing!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link href="/leaderboard">View Leaderboard</Link>
            </Button>
            <Button asChild variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
              <Link href="/storyline">View Storyline</Link>
            </Button>
            <Button onClick={resetGame} className="bg-accent text-accent-foreground hover:bg-accent/80">
                <RefreshCw className="mr-2 h-4 w-4" /> Play Again
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  if (!activeQuestions.length || !currentQuestion) {
    return (
      <div className="flex items-center justify-center min-h-[300px] bg-card/80 backdrop-blur-sm rounded-lg shadow-md">
        <Zap className="w-12 h-12 animate-pulse text-primary" />
        <p className="ml-4 text-xl">Loading Questions...</p>
      </div>
    );
  }

  const totalQuestionsToDisplay = activeQuestions.length > 0 ? activeQuestions.length : QUESTIONS_PER_GAME;
  const progressPercentage = (currentQuestionIndex / totalQuestionsToDisplay) * 100;

  return (
    <div className="space-y-8">
      <Card className="bg-card/80 backdrop-blur-sm shadow-md p-4">
        <div className="flex justify-between items-center mb-2">
          <p className="text-lg font-semibold text-primary">Score: <span className="text-accent">{score}</span></p>
          <p className="text-sm text-muted-foreground">Question Progress</p>
        </div>
        <Progress value={progressPercentage} className="w-full h-3 [&>div]:bg-accent" />
      </Card>

      {showFeedback && (
        <div className="animate-fadeIn space-y-4">
          <Card className={`p-4 text-center ${showFeedback.type === 'correct' ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500'}`}>
            {showFeedback.type === 'correct' ?
              <CheckCircle className="w-8 h-8 mx-auto text-green-600 mb-2" /> :
              <XCircle className="w-8 h-8 mx-auto text-red-600 mb-2" />
            }
            <p className={`font-semibold ${showFeedback.type === 'correct' ? 'text-green-700' : 'text-red-700'}`}>{showFeedback.message}</p>
          </Card>
          <HintDisplay hint={currentGeneratedHint} isLoading={isHintLoading} />
          <Button onClick={handleProceedToNext} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
            {currentQuestionIndex < totalQuestionsToDisplay - 1 ? 'Next Question' : 'Finish Game'}
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      )}

      {!showFeedback && currentQuestion && (
        <QuestionCard
          question={currentQuestion}
          onAnswerSubmit={handleAnswerSubmit}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={totalQuestionsToDisplay}
        />
      )}

      {!showFeedback && <HintDisplay hint={currentGeneratedHint} isLoading={isHintLoading} />}
    </div>
  );
}

