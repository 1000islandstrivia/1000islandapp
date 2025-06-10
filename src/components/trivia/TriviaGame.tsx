"use client";

import { useState, useEffect, useCallback } from 'react';
import { triviaQuestions, storyline, achievements as initialAchievements, leaderboardData } from '@/lib/trivia-data';
import type { TriviaQuestion, StorylineHint, Achievement, LeaderboardEntry } from '@/lib/trivia-data';
import QuestionCard from './QuestionCard';
import HintDisplay from './HintDisplay';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from "@/components/ui/progress";
import { generateHint } from '@/ai/flows/generate-hint';
import type { GenerateHintOutput } from '@/ai/flows/generate-hint';
import { useToast } from "@/hooks/use-toast";
import { Award, CheckCircle, XCircle, Zap } from 'lucide-react';
import Link from 'next/link';

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
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [unlockedStoryHints, setUnlockedStoryHints] = useState<StorylineHint[]>(
    storyline.filter(h => h.unlocked)
  );
  const [currentGeneratedHint, setCurrentGeneratedHint] = useState<GenerateHintOutput | null>(null);
  const [isHintLoading, setIsHintLoading] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [achievements, setAchievements] = useState<Achievement[]>(initialAchievements);
  const [showFeedback, setShowFeedback] = useState<{ type: 'correct' | 'incorrect'; message: string } | null>(null);
  
  const { toast } = useToast();

  const currentQuestion = triviaQuestions[currentQuestionIndex];

  const handleAnswerSubmit = useCallback(async (answer: string) => {
    setShowFeedback(null); // Clear previous feedback
    const isCorrect = answer === currentQuestion.answer;

    if (isCorrect) {
      setScore(prevScore => prevScore + 100);
      setShowFeedback({ type: 'correct', message: 'Correct! Well done, RiverRat!' });
      toast({
        title: "Correct!",
        description: "You're navigating these waters like a true expert!",
        variant: "default",
      });

      // Update achievements for correct answers
      if (score + 100 >= 500) { // Example: 5 correct answers for Trivia Novice
         updateAchievementProgress(achievements, 'five_correct', setAchievements);
      }
      if (currentQuestion.id === "1") { // Example: Correctly answered Boldt Castle question
        updateAchievementProgress(achievements, 'all_hints_category1', setAchievements);
      }


      // Generate and unlock hint
      setIsHintLoading(true);
      try {
        const hintResult = await generateHint({
          question: currentQuestion.question,
          answer: currentQuestion.answer,
        });
        setCurrentGeneratedHint(hintResult);

        const storyHint = storyline.find(h => h.key === currentQuestion.storylineHintKey);
        if (storyHint && !unlockedStoryHints.some(ush => ush.key === storyHint.key)) {
          const newUnlockedHint = { ...storyHint, unlocked: true, text: hintResult.hint }; // Use AI hint text
          setUnlockedStoryHints(prev => [...prev, newUnlockedHint]);
           updateAchievementProgress(achievements, 'first_hint', setAchievements); // Unlock "Budding Detective"
           if (unlockedStoryHints.length + 1 === storyline.filter(h => h.key !== 'final_revelation').length) {
            updateAchievementProgress(achievements, 'story_complete', setAchievements);
          }
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
    }

    // Move to next question or end game after a short delay for feedback
    setTimeout(() => {
      setShowFeedback(null);
      setCurrentGeneratedHint(null); // Clear hint for next question
      if (currentQuestionIndex < triviaQuestions.length - 1) {
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      } else {
        setGameOver(true);
        // Add final score to leaderboard (mock)
        const userEntry = leaderboardData.find(e => e.name === "CurrentUser"); // Replace with actual user
        if (userEntry) userEntry.score = score; else leaderboardData.push({id: "currentUser", name: "You", score: score, avatar: "https://placehold.co/40x40.png?text=U"});
        leaderboardData.sort((a,b) => b.score - a.score);
        if(leaderboardData.findIndex(e => e.name === "You") < 3){
            updateAchievementProgress(achievements, 'top_leaderboard', setAchievements);
        }
      }
    }, 2500); // 2.5 second delay

  }, [currentQuestion, currentQuestionIndex, score, toast, unlockedStoryHints, achievements]);

  useEffect(() => {
    // Check for unlocked achievements and show toasts
    achievements.forEach(ach => {
      if (ach.unlocked && !initialAchievements.find(iach => iach.id === ach.id)?.unlocked) {
        // Find the achievement in the current state to ensure it's marked as "seen" for toast
        const currentAch = initialAchievements.find(iach => iach.id === ach.id);
        if(currentAch) currentAch.unlocked = true; // Mark as seen to prevent re-toasting on re-renders

        toast({
          title: "Achievement Unlocked!",
          description: `${ach.name}: ${ach.description}`,
          action: (
            <Link href="/achievements">
              <Button variant="outline" size="sm">
                View
              </Button>
            </Link>
          ),
        });
      }
    });
  }, [achievements, toast]);


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
          <div className="flex justify-center gap-4 mt-6">
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link href="/leaderboard">View Leaderboard</Link>
            </Button>
            <Button asChild variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
              <Link href="/storyline">View Storyline</Link>
            </Button>
            <Button onClick={() => { setCurrentQuestionIndex(0); setScore(0); setGameOver(false); setUnlockedStoryHints(storyline.filter(h => h.unlocked)); setAchievements(initialAchievements.map(a => ({...a, unlocked: false}))); }} className="bg-accent text-accent-foreground hover:bg-accent/80">
                Play Again
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const progressPercentage = (currentQuestionIndex / triviaQuestions.length) * 100;

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
        <Card className={`p-4 mb-4 text-center animate-fadeIn ${showFeedback.type === 'correct' ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500'}`}>
          {showFeedback.type === 'correct' ? 
            <CheckCircle className="w-8 h-8 mx-auto text-green-600 mb-2" /> : 
            <XCircle className="w-8 h-8 mx-auto text-red-600 mb-2" />
          }
          <p className={`font-semibold ${showFeedback.type === 'correct' ? 'text-green-700' : 'text-red-700'}`}>{showFeedback.message}</p>
        </Card>
      )}

      {!showFeedback && currentQuestion && (
        <QuestionCard 
          question={currentQuestion} 
          onAnswerSubmit={handleAnswerSubmit}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={triviaQuestions.length}
        />
      )}
      
      <HintDisplay hint={currentGeneratedHint} isLoading={isHintLoading} />
    </div>
  );
}