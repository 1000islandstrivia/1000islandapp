
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { triviaQuestions as allTriviaQuestions, storyline as initialStoryline, achievements as initialAchievementsData, leaderboardData } from '@/lib/trivia-data';
import type { TriviaQuestion, StorylineHint, Achievement, LeaderboardEntry } from '@/lib/trivia-data';
import QuestionCard from './QuestionCard';
import HintDisplay from './HintDisplay';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from "@/components/ui/progress";
import { generateHint } from '@/ai/flows/generate-hint';
import type { GenerateHintOutput } from '@/ai/flows/generate-hint';
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/hooks/useAuth'; // Import useAuth
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
  const { user } = useAuth(); // Get user from auth hook
  const [activeQuestions, setActiveQuestions] = useState<TriviaQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  
  // This state will hold the full StorylineHint objects for the current game session
  const [unlockedStoryHints, setUnlockedStoryHints] = useState<StorylineHint[]>([]);
  
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
       setActiveQuestions(allTriviaQuestions.slice(0, QUESTIONS_PER_GAME));
    } else if (selectedQuestions.length === 0 && allTriviaQuestions.length > 0) {
      setActiveQuestions(allTriviaQuestions.slice(0, Math.min(QUESTIONS_PER_GAME, allTriviaQuestions.length)));
    }
    else {
      setActiveQuestions(selectedQuestions);
    }
  }, []);

  // Effect to load unlocked story hints from localStorage when user changes
  useEffect(() => {
    if (user && typeof window !== 'undefined') {
      const storedProgressKey = `storyProgress_${user.username}`;
      const storedProgress = localStorage.getItem(storedProgressKey);
      let currentUnlockedKeys: string[] = [];

      if (storedProgress) {
        try {
          currentUnlockedKeys = JSON.parse(storedProgress);
        } catch (e) {
          console.error(`Failed to parse storyline progress for ${user.username} from localStorage in TriviaGame:`, e);
          currentUnlockedKeys = initialStoryline.filter(h => h.unlocked).map(h => h.key); // Fallback to default
        }
      } else {
        currentUnlockedKeys = initialStoryline.filter(h => h.unlocked).map(h => h.key); // Default if no progress
      }
      
      // Reconstruct StorylineHint objects based on keys
      setUnlockedStoryHints(
        initialStoryline.map(hint => ({
          ...hint,
          unlocked: currentUnlockedKeys.includes(hint.key),
          // Note: AI-generated text is not persisted here, only unlocked status.
          // The `text` will be the default from initialStoryline.
        }))
      );
    } else if (!user && typeof window !== 'undefined') {
      // No user or logged out, reset to initial state of storyline (only default unlocked hints)
      setUnlockedStoryHints(initialStoryline.map(hint => ({
        ...hint,
        unlocked: initialStoryline.find(h => h.key === hint.key)?.unlocked || false,
      })));
    }
  }, [user]);

  // Effect to save unlocked story hint keys to localStorage when they change or user changes
  useEffect(() => {
    if (user && typeof window !== 'undefined' && unlockedStoryHints.length > 0) {
      const keysToSave = unlockedStoryHints.filter(h => h.unlocked).map(h => h.key);
      localStorage.setItem(`storyProgress_${user.username}`, JSON.stringify(keysToSave));
    }
  }, [unlockedStoryHints, user]);


  const resetGame = useCallback(() => {
    shuffleAndSelectQuestions();
    setCurrentQuestionIndex(0);
    setScore(0);
    setGameOver(false);
    // unlockedStoryHints are now loaded via useEffect based on user
    setAchievements(initialAchievementsData.map(a => ({ ...a, unlocked: false })));
    setShowFeedback(null);
    setCurrentGeneratedHint(null);
    setToastedAchievementIds(new Set());
  }, [shuffleAndSelectQuestions]);

  useEffect(() => {
    resetGame();
  }, [resetGame]);

  const currentQuestion = activeQuestions[currentQuestionIndex];

  const playSound = useCallback((soundPath: string) => {
    if (typeof window === 'undefined' || !soundPath) return;
    try {
      const audio = new Audio(soundPath); // Ensure path starts with '/' if in public folder
      audio.onerror = (e) => {
        let errorMessage = `Failed to load audio: ${soundPath}.`;
        if (audio.error) {
          switch (audio.error.code) {
            case audio.error.MEDIA_ERR_ABORTED: errorMessage += ' Playback aborted.'; break;
            case audio.error.MEDIA_ERR_NETWORK: errorMessage += ' Network error.'; break;
            case audio.error.MEDIA_ERR_DECODE: errorMessage += ' Decoding error.'; break;
            case audio.error.MEDIA_ERR_SRC_NOT_SUPPORTED: errorMessage += ' Source not supported. Ensure file exists and format is correct.'; break;
            default: errorMessage += ` Unknown error code: ${audio.error.code}.`;
          }
        }
        console.error("Audio element error:", errorMessage, e, audio.error);
        toast({ title: "Audio Playback Issue", description: errorMessage, variant: "destructive" });
      };
      
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(playError => {
          console.error(`Error playing ${soundPath}:`, playError);
          // Avoid toast for common browser restrictions (e.g., autoplay without interaction)
          if (playError.name !== 'NotAllowedError' && playError.name !== 'NotSupportedError') {
            toast({ title: "Sound Playback Error", description: `Could not play ${soundPath}. ${playError.message}`, variant: "destructive" });
          }
        });
      }
    } catch (error: any) {
      console.error(`Error setting up sound ${soundPath}:`, error);
      toast({ title: "Audio Setup Error", description: `Issue with ${soundPath}: ${error.message}`, variant: "destructive" });
    }
  }, [toast]);


  const handleAnswerSubmit = useCallback(async (answer: string) => {
    if (!currentQuestion) return;

    const isCorrect = answer === currentQuestion.answer;

    if (isCorrect) {
      const newScore = score + 100;
      setScore(newScore);
      setShowFeedback({ type: 'correct', message: "Arr, well done, matey! That be correct!" });
      playSound('/sounds/pirate-correct.mp3'); 
      toast({
        title: "Shiver me timbers! Correct!",
        description: "Ye be a true captain o' this quiz!",
        variant: "default",
      });

      if (newScore >= 300 && newScore < 500) { // Example: Achievement for score range
         updateAchievementProgress(achievements, 'five_correct', setAchievements);
      }
       if (currentQuestion.storylineHintKey.includes("boldt")) { // Example: Category achievement
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

        const storyHintKey = currentQuestion.storylineHintKey;
        const hintIndex = unlockedStoryHints.findIndex(h => h.key === storyHintKey);

        if (hintIndex !== -1 && !unlockedStoryHints[hintIndex].unlocked) {
          setUnlockedStoryHints(prevHints => {
            const updatedHints = prevHints.map(h => 
              h.key === storyHintKey ? { ...h, unlocked: true, text: hintResult.hint } : h
            );
            // Check for story completion achievement
            const allNonFinalUnlocked = updatedHints
                .filter(h => h.key !== 'final_revelation')
                .every(h => h.unlocked);
            if (allNonFinalUnlocked) {
                updateAchievementProgress(achievements, 'story_complete', setAchievements);
            }
            return updatedHints;
          });
          updateAchievementProgress(achievements, 'first_hint', setAchievements);
        } else if (hintIndex === -1) {
          // This case should ideally not happen if all storylineHintKeys in questions exist in initialStoryline
          console.warn(`Storyline hint key "${storyHintKey}" not found in initial storyline data.`);
        }

      } catch (error) {
        console.error("Error generating hint:", error);
        toast({ title: "Hint Error", description: "Could not generate a hint at this time.", variant: "destructive" });
        setCurrentGeneratedHint(null);
      } finally {
        setIsHintLoading(false);
      }
    } else {
      setShowFeedback({ type: 'incorrect', message: `Avast! That be the wrong answer, scallywag! The correct answer was: ${currentQuestion.answer}` });
      playSound('/sounds/fog-horn.mp3'); 
      // Removed toast for incorrect answer as per user request
    }
  }, [currentQuestion, score, toast, unlockedStoryHints, achievements, playSound]);

  const handleProceedToNext = useCallback(() => {
    setShowFeedback(null);
    setCurrentGeneratedHint(null);

    if (currentQuestionIndex < (activeQuestions.length > 0 ? activeQuestions.length : QUESTIONS_PER_GAME) - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
      setGameOver(true);
      const finalScore = score; // Use the score from state
      
      // Update leaderboard data (this is client-side, ideally done on backend)
      const userEntry = leaderboardData.find(e => e.name === "You");
      if (userEntry) {
        userEntry.score = Math.max(userEntry.score, finalScore);
      } else if (user) { // Make sure user exists before adding to leaderboard
        leaderboardData.push({id: user.username, name: "You", score: finalScore, avatar: "https://placehold.co/40x40.png?text=U"});
      }
      leaderboardData.sort((a,b) => b.score - a.score);

      if(leaderboardData.findIndex(e => e.name === "You") < 3 && finalScore > 0){
          updateAchievementProgress(achievements, 'top_leaderboard', setAchievements);
      }
    }
  }, [currentQuestionIndex, activeQuestions.length, score, achievements, user]);


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
          <CardTitle className="font-headline text-4xl text-primary">Adventure Complete, Captain!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-2xl">Your Final Score: <span className="font-bold text-accent">{score}</span> pieces o' eight!</p>
          <p className="text-lg text-foreground/80">
            Ye've navigated the treacherous waters of Thousand Islands trivia. Check yer treasure map (storyline) and see how ye rank against other pirates on the leaderboard!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link href="/leaderboard">View Leaderboard</Link>
            </Button>
            <Button asChild variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
              <Link href="/storyline">View Storyline</Link>
            </Button>
            <Button onClick={resetGame} className="bg-accent text-accent-foreground hover:bg-accent/80">
                <RefreshCw className="mr-2 h-4 w-4" /> Set Sail Again!
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
        <p className="ml-4 text-xl">Loading Questions, Captain...</p>
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
            {currentQuestionIndex < totalQuestionsToDisplay - 1 ? 'Next Question, Arr!' : 'Finish Voyage!'}
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
