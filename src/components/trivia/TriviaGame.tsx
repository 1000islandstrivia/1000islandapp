
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { storyline as initialStoryline, achievements as initialAchievementsData, getRankByScore, playerRanks } from '@/lib/trivia-data';
import type { TriviaQuestion, StorylineHint, Achievement, PlayerRank } from '@/lib/trivia-data';
import QuestionCard from './QuestionCard';
import HintDisplay from './HintDisplay';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from "@/components/ui/progress";
import { generateHint } from '@/ai/flows/generate-hint';
import type { GenerateHintOutput } from '@/ai/flows/generate-hint';
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/hooks/useAuth';
import { Award, CheckCircle, XCircle, Zap, ChevronRight, RefreshCw, type LucideIcon, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { updateUserScore } from '@/services/leaderboardService';
import { getTriviaQuestions } from '@/services/triviaService'; // Import the new service

const QUESTIONS_PER_GAME = 10;

interface StoredAchievementProgress {
  id: string;
  unlocked: boolean;
}

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
  const { user, refreshUser } = useAuth();
  const { toast } = useToast();
  const [allTriviaQuestions, setAllTriviaQuestions] = useState<TriviaQuestion[]>([]);
  const [activeQuestions, setActiveQuestions] = useState<TriviaQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  const [unlockedStoryHints, setUnlockedStoryHints] = useState<StorylineHint[]>(initialStoryline.map(h => ({ ...h, unlocked: h.unlocked })));

  const [currentGeneratedHint, setCurrentGeneratedHint] = useState<GenerateHintOutput | null>(null);
  const [isHintLoading, setIsHintLoading] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(true);

  const [currentAchievements, setCurrentAchievements] = useState<Achievement[]>(initialAchievementsData.map(a => ({ ...a })));
  const [showFeedback, setShowFeedback] = useState<{ type: 'correct' | 'incorrect'; message: string } | null>(null);
  const [toastedAchievementIds, setToastedAchievementIds] = useState<Set<string>>(new Set());

  const fetchAndSetQuestions = useCallback(async () => {
    setIsLoadingQuestions(true);
    try {
      const questions = await getTriviaQuestions();
      setAllTriviaQuestions(questions);
    } catch (error) {
      console.error("Failed to fetch trivia questions:", error);
      toast({
        title: "Error Loading Questions",
        description: "Could not load trivia questions. Please try again later.",
        variant: "destructive",
      });
      setAllTriviaQuestions([]); // Set to empty to prevent errors
    } finally {
      setIsLoadingQuestions(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchAndSetQuestions();
  }, [fetchAndSetQuestions]);


  const shuffleAndSelectQuestions = useCallback(() => {
    if (allTriviaQuestions.length === 0) {
      setActiveQuestions([]);
      return;
    }
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
  }, [allTriviaQuestions]);

  useEffect(() => {
    if (user && typeof window !== 'undefined') {
      const storedProgressKey = `storyProgress_${user.username}`;
      const storedProgress = localStorage.getItem(storedProgressKey);
      let currentUnlockedKeys: string[] = initialStoryline.filter(h => h.unlocked).map(h => h.key);
      if (storedProgress) {
        try {
          currentUnlockedKeys = JSON.parse(storedProgress);
        } catch (e) {
          console.error(`Failed to parse storyline progress for ${user.username} from localStorage:`, e);
        }
      }
      setUnlockedStoryHints(
        initialStoryline.map(hint => ({
          ...hint,
          unlocked: currentUnlockedKeys.includes(hint.key),
        }))
      );

      const achievementsKey = `achievements_progress_${user.username}`;
      const storedAchievementsProgressString = localStorage.getItem(achievementsKey);
      let storedProgressData: StoredAchievementProgress[] = [];
      if (storedAchievementsProgressString) {
        try {
          storedProgressData = JSON.parse(storedAchievementsProgressString);
        } catch (e) {
          console.error("Failed to parse achievements progress from localStorage", e);
        }
      }
      const rehydratedAchievements = initialAchievementsData.map(masterAch => {
        const progress = storedProgressData.find(p => p.id === masterAch.id);
        const AchIconComponent = masterAch.icon;
        return {
          ...masterAch,
          icon: AchIconComponent,
          unlocked: progress ? progress.unlocked : (masterAch.unlocked || false),
        };
      });
      setCurrentAchievements(rehydratedAchievements);

    } else if (!user && typeof window !== 'undefined') {
      setUnlockedStoryHints(initialStoryline.map(hint => ({
        ...hint,
        unlocked: initialStoryline.find(h => h.key === hint.key)?.unlocked || false,
      })));
      setCurrentAchievements(initialAchievementsData.map(a => {
        const AchIconComponent = a.icon;
        return ({ ...a, icon: AchIconComponent });
      }));
    }
  }, [user]);


  useEffect(() => {
    if (user && typeof window !== 'undefined' && unlockedStoryHints.length > 0) {
      const keysToSave = unlockedStoryHints.filter(h => h.unlocked).map(h => h.key);
      localStorage.setItem(`storyProgress_${user.username}`, JSON.stringify(keysToSave));
    }
  }, [unlockedStoryHints, user]);

  useEffect(() => {
    if (user && typeof window !== 'undefined' && currentAchievements.some(a => a.unlocked)) {
      const achievementsProgressToStore: StoredAchievementProgress[] = currentAchievements.map(ach => ({
        id: ach.id,
        unlocked: ach.unlocked,
      }));
      localStorage.setItem(`achievements_progress_${user.username}`, JSON.stringify(achievementsProgressToStore));
    }
  }, [currentAchievements, user]);


  const resetGame = useCallback(() => {
    if (allTriviaQuestions.length > 0) {
      shuffleAndSelectQuestions();
    }
    setCurrentQuestionIndex(0);
    setScore(0);
    setGameOver(false);

    if (user) {
        const achievementsKey = `achievements_progress_${user.username}`;
        const storedAchievementsProgressString = localStorage.getItem(achievementsKey);
        let storedProgressData: StoredAchievementProgress[] = [];
        if (storedAchievementsProgressString) {
            try {
                storedProgressData = JSON.parse(storedAchievementsProgressString);
            } catch (e) {
                console.error("Failed to parse achievements progress from localStorage on reset", e);
            }
        }
        const rehydratedAchievements = initialAchievementsData.map(masterAch => {
            const progress = storedProgressData.find(p => p.id === masterAch.id);
            const AchIconComponent = masterAch.icon;
            return { ...masterAch, icon: AchIconComponent, unlocked: progress ? progress.unlocked : (masterAch.unlocked || false) };
        });
        setCurrentAchievements(rehydratedAchievements);
    } else {
         setCurrentAchievements(initialAchievementsData.map(a => {
           const AchIconComponent = a.icon;
           return ({...a, icon: AchIconComponent});
         }));
    }

    setShowFeedback(null);
    setCurrentGeneratedHint(null);
    setToastedAchievementIds(new Set());
  }, [shuffleAndSelectQuestions, user, allTriviaQuestions]);

  useEffect(() => {
    // Only reset game if questions are loaded
    if (!isLoadingQuestions && allTriviaQuestions.length > 0) {
      resetGame();
    }
  }, [isLoadingQuestions, allTriviaQuestions, resetGame]);

  const currentQuestion = activeQuestions[currentQuestionIndex];

  const playSound = useCallback((soundPath: string) => {
    if (typeof window === 'undefined' || !soundPath) return;
    try {
      const audio = new Audio(soundPath);
      audio.onerror = (e) => {
        let errorMessage = `Failed to load audio: ${soundPath}.`;
        if (audio.error) {
          switch (audio.error.code) {
            case audio.error.MEDIA_ERR_ABORTED: errorMessage += ' Playback aborted by user.'; break;
            case audio.error.MEDIA_ERR_NETWORK: errorMessage += ' Network error during loading.'; break;
            case audio.error.MEDIA_ERR_DECODE: errorMessage += ' Error decoding the media.'; break;
            case audio.error.MEDIA_ERR_SRC_NOT_SUPPORTED: errorMessage += ' Source format not supported or file not found.'; break;
            default: errorMessage += ` Unknown error code: ${audio.error.code}.`;
          }
        }
        console.error("Audio element error:", errorMessage, e, audio.error);
      };

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(playError => {
          console.error(`Error playing ${soundPath}:`, playError);
          if (playError.name !== 'NotAllowedError' && playError.name !== 'NotSupportedError') {
          }
        });
      }
    } catch (error: any) {
      console.error(`Error setting up sound ${soundPath}:`, error);
    }
  }, []);


  const handleAnswerSubmit = useCallback(async (answer: string) => {
    if (!currentQuestion) return;

    const isCorrect = answer === currentQuestion.answer;
    let newSessionScore = score;

    if (isCorrect) {
      newSessionScore = score + 100;
      // setScore(newSessionScore); // Score state updated later after all calcs
      setShowFeedback({ type: 'correct', message: "Arr, well done, matey! That be correct!" });
      playSound('/sounds/pirate-correct.mp3');
      toast({
        title: "Shiver me timbers! Correct!",
        description: "Ye be a true captain o' this quiz!",
        variant: "default",
      });

      if (newSessionScore >= 500 && !currentAchievements.find(a=>a.id === 'five_correct')?.unlocked) {
         updateAchievementProgress(currentAchievements, 'five_correct', setCurrentAchievements);
      }
      if (currentQuestion.storylineHintKey.includes("boldt") && !currentAchievements.find(a=>a.id === 'all_hints_category1')?.unlocked) {
        const boldtHintsUnlocked = unlockedStoryHints.filter(h => h.key.startsWith("boldt_") && h.unlocked).length;
        if (boldtHintsUnlocked >= 2) { 
           updateAchievementProgress(currentAchievements, 'all_hints_category1', setCurrentAchievements);
        }
      }
      if (currentQuestion.storylineHintKey === "fish_expert_clue" && !currentAchievements.find(a=>a.id === 'fish_expert')?.unlocked) {
        updateAchievementProgress(currentAchievements, 'fish_expert', setCurrentAchievements);
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

            const allNonFinalUnlocked = updatedHints
                .filter(h => h.key !== 'final_revelation')
                .every(h => h.unlocked);

            if (allNonFinalUnlocked && !currentAchievements.find(a=>a.id === 'story_complete')?.unlocked) {
                updateAchievementProgress(currentAchievements, 'story_complete', setCurrentAchievements);
            }
            return updatedHints;
          });
          if (!currentAchievements.find(a=>a.id === 'first_hint')?.unlocked) {
            updateAchievementProgress(currentAchievements, 'first_hint', setCurrentAchievements);
          }
        } else if (hintIndex === -1) {
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
      newSessionScore = score - 500; // Deduct points for wrong answer
      // setScore(newSessionScore); // Score state updated later
      setShowFeedback({ type: 'incorrect', message: `Avast! That be the wrong answer, scallywag! The correct answer was: ${currentQuestion.answer}` });
      playSound('/sounds/fog-horn.mp3');
      toast({
        title: "Walk the Plank!",
        description: "Ye lost 500 points for that blunder, scallywag!",
        variant: "destructive",
      });
    }
    setScore(newSessionScore); // Update score state here after all calculations for this answer


    if (user && user.score !== undefined) {
        const potentialTotalScoreAfterThisAnswer = (user.score + (newSessionScore - score)); // User's total score PLUS the change from this single answer
        
        const pettyOfficerRank = playerRanks.find(r => r.title === "Petty Officer Third Class");
        if (pettyOfficerRank && potentialTotalScoreAfterThisAnswer >= pettyOfficerRank.minScore && !currentAchievements.find(a=>a.id === 'rank_petty_officer')?.unlocked) {
            updateAchievementProgress(currentAchievements, 'rank_petty_officer', setCurrentAchievements);
        }
        
        const chiefRank = playerRanks.find(r => r.title === "Chief Petty Officer");
        if (chiefRank && potentialTotalScoreAfterThisAnswer >= chiefRank.minScore && !currentAchievements.find(a=>a.id === 'rank_chief')?.unlocked) {
            updateAchievementProgress(currentAchievements, 'rank_chief', setCurrentAchievements);
        }

        const officerRank = playerRanks.find(r => r.title === "Ensign");
        if (officerRank && potentialTotalScoreAfterThisAnswer >= officerRank.minScore && !currentAchievements.find(a=>a.id === 'rank_officer')?.unlocked) {
           updateAchievementProgress(currentAchievements, 'rank_officer', setCurrentAchievements);
        }

        const admiralRank = playerRanks.find(r => r.title === "Admiral");
        if (admiralRank && potentialTotalScoreAfterThisAnswer >= admiralRank.minScore && !currentAchievements.find(a=>a.id === 'rank_admiral')?.unlocked) {
            updateAchievementProgress(currentAchievements, 'rank_admiral', setCurrentAchievements);
        }
    }


  }, [currentQuestion, score, toast, unlockedStoryHints, currentAchievements, playSound, user]);

  const handleProceedToNext = useCallback(async () => {
    setShowFeedback(null);
    setCurrentGeneratedHint(null);

    if (currentQuestionIndex < (activeQuestions.length > 0 ? activeQuestions.length : QUESTIONS_PER_GAME) - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
      setGameOver(true);
      const finalSessionScore = score; 

      if (user) {
        try {
          await updateUserScore(user.username, user.username, finalSessionScore);
          await refreshUser(); 
        } catch (error) {
          console.error("Failed to update score on leaderboard:", error);
          toast({
            title: "Leaderboard Error",
            description: "Could not save your score to the leaderboard. Please try again later.",
            variant: "destructive",
          });
        }
      }
    }
  }, [currentQuestionIndex, activeQuestions.length, score, user, toast, refreshUser]);


  useEffect(() => {
    currentAchievements.forEach(ach => {
      if (ach.unlocked && !toastedAchievementIds.has(ach.id)) {
        const AchIconComponent = ach.icon as LucideIcon | undefined;
        toast({
          title: "Achievement Unlocked!",
          description: (
            <div className="flex items-center">
              {AchIconComponent && <AchIconComponent className="w-5 h-5 mr-2 text-accent" />}
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
  }, [currentAchievements, toast, toastedAchievementIds]);


  if (isLoadingQuestions) {
    return (
      <div className="flex items-center justify-center min-h-[300px] bg-card/80 backdrop-blur-sm rounded-lg shadow-md">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
        <p className="ml-4 text-xl">Loading Trivia Questions...</p>
      </div>
    );
  }

  if (gameOver) {
    return (
      <Card className="w-full max-w-lg mx-auto text-center p-8 shadow-xl bg-card/90 backdrop-blur-sm animate-slideUp">
        <CardHeader>
          <Award className="w-16 h-16 mx-auto text-accent mb-4" />
          <CardTitle className="font-headline text-4xl text-primary">Adventure Complete, Captain!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-2xl">Your Score this Game: <span className="font-bold text-accent">{score}</span> pieces o' eight!</p>
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
      <div className="flex flex-col items-center justify-center min-h-[300px] bg-card/80 backdrop-blur-sm rounded-lg shadow-md p-6 text-center">
        <Zap className="w-12 h-12 text-primary mb-4" />
        <p className="ml-4 text-xl text-primary">No Trivia Questions Available</p>
        <p className="text-muted-foreground mt-2">Could not load questions. Please try refreshing or check back later.</p>
        <Button onClick={fetchAndSetQuestions} className="mt-4">
            <RefreshCw className="mr-2 h-4 w-4" /> Try Reloading Questions
        </Button>
      </div>
    );
  }

  const totalQuestionsToDisplay = activeQuestions.length > 0 ? activeQuestions.length : QUESTIONS_PER_GAME;
  const progressPercentage = (currentQuestionIndex / totalQuestionsToDisplay) * 100;

  return (
    <div className="space-y-8">
      <Card className="bg-card/80 backdrop-blur-sm shadow-md p-4">
        <div className="flex justify-between items-center mb-2">
          <p className="text-lg font-semibold text-primary">Session Score: <span className="text-accent">{score}</span></p>
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

    