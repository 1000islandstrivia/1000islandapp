"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { storyline as initialStoryline, achievements as initialAchievementsData, getRankByScore, playerRanks } from '@/lib/trivia-data';
import type { TriviaQuestion, StorylineHint, Achievement, PlayerRank } from '@/lib/trivia-data';
import QuestionCard from './QuestionCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from "@/components/ui/progress";
import { generatePirateScript } from '@/ai/flows/generate-pirate-script';
import { generateSpokenPirateAudio } from '@/ai/flows/generate-spoken-pirate-audio';
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/hooks/useAuth';
import { Award, RefreshCw, type LucideIcon, Loader2, Skull } from 'lucide-react';
import Link from 'next/link';
import { updateUserScore } from '@/services/leaderboardService';
import { getTriviaQuestions } from '@/services/triviaService';
import HintDisplay from './HintDisplay';

const QUESTIONS_PER_GAME = 10;

// Pirate loading messages to show while waiting for the detailed AI hint
const pirateLoadingMessages = [
  "☠️ Hold fast, matey... a cursed clue be brewin’...",
  "⚓ Summonin’ the ghost of a river pirate...",
  "🦜 Squawk! The parrot’s whisperin’ secrets...",
  "🗺️ Unfurlin’ the scroll of shame...",
  "💀 Dredgin’ up facts from Davy Jones’s locker...",
  "🎣 Fishin’ for the truth in haunted waters...",
  "🧜‍♂️ Consultin’ the mermaid oracles...",
  "🕯️ Lightin’ the lanterns of lost legends...",
  "🏴‍☠️ Readin’ yer fortune in the river fog...",
  "📚 Flippin’ through the haunted captain’s log..."
];

// Pre-recorded audio clips for instant feedback
const correctMaleAudio = [
  'https://firebasestorage.googleapis.com/v0/b/islands-riverrat-lore.firebasestorage.app/o/male_right_answer_1.mp3?alt=media&token=e5f3fdb6-aaec-4616-b9b5-c1c37eba1898',
  'https://firebasestorage.googleapis.com/v0/b/islands-riverrat-lore.firebasestorage.app/o/male_right_answer_2.mp3?alt=media&token=ea2cb0fa-6299-4db4-bb7b-0d163526f5ba',
  'https://firebasestorage.googleapis.com/v0/b/islands-riverrat-lore.firebasestorage.app/o/male_right_answer_3.mp3?alt=media&token=c444e71e-b9da-4962-89a2-a8c3c5ea56c7',
  'https://firebasestorage.googleapis.com/v0/b/islands-riverrat-lore.firebasestorage.app/o/male_right_answer_4.mp3?alt=media&token=5609da46-1448-4fae-8a60-d2ee2971686e',
  'https://firebasestorage.googleapis.com/v0/b/islands-riverrat-lore.firebasestorage.app/o/male_right_answer_5.mp3?alt=media&token=5886b949-0c15-46fb-936b-21e2cdca2ced'
];
const correctFemaleAudio = [
    'https://firebasestorage.googleapis.com/v0/b/islands-riverrat-lore.firebasestorage.app/o/right_answer_1.mp3?alt=media&token=abc518be-b949-407e-9faf-1e33487fd580',
    'https://firebasestorage.googleapis.com/v0/b/islands-riverrat-lore.firebasestorage.app/o/right_answer_2.mp3?alt=media&token=946c0515-67ed-40e9-b342-d01127622da5',
    'https://firebasestorage.googleapis.com/v0/b/islands-riverrat-lore.firebasestorage.app/o/right_answer_3.mp3?alt=media&token=12cb05a5-6a89-49d6-8ccf-c9176affad94',
    'https://firebasestorage.googleapis.com/v0/b/islands-riverrat-lore.firebasestorage.app/o/right_answer_4.mp3?alt=media&token=8da50af1-c6dc-416f-b1c9-4008129a09e0',
    'https://firebasestorage.googleapis.com/v0/b/islands-riverrat-lore.firebasestorage.app/o/right_answer_5.mp3?alt=media&token=926275c9-9914-404d-9e63-b433a66614a5'
];
const wrongMaleAudio = [
    'https://firebasestorage.googleapis.com/v0/b/islands-riverrat-lore.firebasestorage.app/o/male_wrong_answer_1.mp3?alt=media&token=3ba1a143-3475-4fd4-bd30-448045bbc9f3',
    'https://firebasestorage.googleapis.com/v0/b/islands-riverrat-lore.firebasestorage.app/o/male_wrong_answer_2.mp3?alt=media&token=78c97623-b600-4a25-aa3a-d6ebea857a3e',
    'https://firebasestorage.googleapis.com/v0/b/islands-riverrat-lore.firebasestorage.app/o/male_wrong_answer_3.mp3?alt=media&token=ff958b5d-de42-43a5-a0d8-8968cde64d73',
    'https://firebasestorage.googleapis.com/v0/b/islands-riverrat-lore.firebasestorage.app/o/male_wrong_answer_4.mp3?alt=media&token=e166ab82-318c-455e-b5da-4fe13bcf834a',
    'https://firebasestorage.googleapis.com/v0/b/islands-riverrat-lore.firebasestorage.app/o/male_wrong_answer_5.mp3?alt=media&token=9ec1a31c-8da3-4fa1-99e5-36ccbea0cdcc'
];
const wrongFemaleAudio = [
    'https://firebasestorage.googleapis.com/v0/b/islands-riverrat-lore.firebasestorage.app/o/wrong_answer_1.mp3?alt=media&token=7d9158f9-5839-4eb2-985c-5ed7a67573c7',
    'https://firebasestorage.googleapis.com/v0/b/islands-riverrat-lore.firebasestorage.app/o/wrong_answer_2.mp3?alt=media&token=6257a8c3-943b-47f8-8003-58e62dfb5d8c',
    'https://firebasestorage.googleapis.com/v0/b/islands-riverrat-lore.firebasestorage.app/o/wrong_answer_3.mp3?alt=media&token=2b5b6ee1-83a9-4142-8213-0e82343ffb7f',
    'https://firebasestorage.googleapis.com/v0/b/islands-riverrat-lore.firebasestorage.app/o/wrong_answer_4.mp3?alt=media&token=aeeb0fcb-c2d7-48de-b006-b52428afa81f',
    'https://firebasestorage.googleapis.com/v0/b/islands-riverrat-lore.firebasestorage.app/o/wrong_answer_5.mp3?alt=media&token=bf43a337-1cec-49a2-92b8-c8000dcb8830'
];

const correctResponses = [...correctMaleAudio, ...correctFemaleAudio];
const wrongResponses = [...wrongMaleAudio, ...wrongFemaleAudio];

interface StoredAchievementProgress {
  id: string;
  unlocked: boolean;
}

interface PirateResponse {
  script: string;
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
  
  // Core Game State
  const [allTriviaQuestions, setAllTriviaQuestions] = useState<TriviaQuestion[]>([]);
  const [activeQuestions, setActiveQuestions] = useState<TriviaQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(true);

  // Response & Feedback State
  const [isResponseLoading, setIsResponseLoading] = useState(false);
  const [isAudioLoading, setIsAudioLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState<string | null>(null);
  const [pirateResponse, setPirateResponse] = useState<PirateResponse | null>(null);
  const [pirateAudioUri, setPirateAudioUri] = useState<string | null>(null);
  const [showAnswerResult, setShowAnswerResult] = useState(false);

  // User Progress State
  const [unlockedStoryHints, setUnlockedStoryHints] = useState<StorylineHint[]>(initialStoryline.map(h => ({ ...h, unlocked: h.unlocked })));
  const [currentAchievements, setCurrentAchievements] = useState<Achievement[]>(initialAchievementsData.map(a => ({ ...a })));
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
      setAllTriviaQuestions([]);
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
    setShowAnswerResult(false);
    setIsResponseLoading(false);
    setLoadingMessage(null);
    setPirateResponse(null);
    setPirateAudioUri(null);

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

    setToastedAchievementIds(new Set());
  }, [shuffleAndSelectQuestions, user, allTriviaQuestions]);

  useEffect(() => {
    if (!isLoadingQuestions && allTriviaQuestions.length > 0) {
      resetGame();
    }
  }, [isLoadingQuestions, allTriviaQuestions, resetGame]);

  const currentQuestion = activeQuestions[currentQuestionIndex];

  const handleAnswerSubmit = useCallback(async (answer: string) => {
    if (!currentQuestion) return;

    const isCorrect = answer === currentQuestion.answer;
    
    // Play instant audio feedback
    const responseAudios = isCorrect ? correctResponses : wrongResponses;
    const randomAudioUrl = responseAudios[Math.floor(Math.random() * responseAudios.length)];
    if (typeof window !== 'undefined') {
        new Audio(randomAudioUrl).play();
    }
    
    setShowAnswerResult(true);
    const randomMessage = pirateLoadingMessages[Math.floor(Math.random() * pirateLoadingMessages.length)];
    setLoadingMessage(randomMessage);
    setIsResponseLoading(true);
    setPirateResponse(null);
    setPirateAudioUri(null);

    let newSessionScore = score;

    if (isCorrect) {
        newSessionScore = score + 100;

        const storyHintKey = currentQuestion.storylineHintKey;
        const hintIndex = unlockedStoryHints.findIndex(h => h.key === storyHintKey);
        if (hintIndex !== -1 && !unlockedStoryHints[hintIndex].unlocked) {
            setUnlockedStoryHints(prevHints =>
                prevHints.map(h => (h.key === storyHintKey ? { ...h, unlocked: true } : h))
            );
            if (!currentAchievements.find(a => a.id === 'first_hint')?.unlocked) {
                updateAchievementProgress(currentAchievements, 'first_hint', setCurrentAchievements);
            }
        }
    } else {
        newSessionScore = score - 50;
    }
    setScore(Math.max(0, newSessionScore));

    if (user && user.score !== undefined) {
      const pointsChange = newSessionScore - score;
      const potentialTotalScoreAfterThisAnswer = (user.score + pointsChange);
      
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
    
    try {
        const scriptResult = await generatePirateScript({
            question: currentQuestion.question,
            playerAnswer: answer,
            correctAnswer: currentQuestion.answer,
            fallbackHint: currentQuestion.fallbackHint || "Arrr, this secret be lost to the depths!",
        });
        
        setPirateResponse(scriptResult);
        setIsResponseLoading(false);
        setLoadingMessage(null);
        setIsAudioLoading(true);

        // Fetch audio in the background
        generateSpokenPirateAudio({ script: scriptResult.script })
            .then(audioResult => {
                setPirateAudioUri(audioResult.audioDataUri);
            })
            .catch(err => {
                console.error("Failed to generate pirate audio:", err);
                toast({ title: "The parrot be shy...", description: "Couldn't generate the pirate's voice.", variant: "destructive" });
            })
            .finally(() => {
                setIsAudioLoading(false);
            });

    } catch (error) {
        console.error("Failed to generate pirate script:", error);
        toast({ title: "The spirits be quiet...", description: "Couldn't get a response from the pirate ghost. Using a fallback hint!", variant: "destructive" });
        setPirateResponse({ script: currentQuestion.fallbackHint || "A mysterious force prevents the hint from appearing..." });
        setIsResponseLoading(false);
        setLoadingMessage(null);
    }

  }, [currentQuestion, score, unlockedStoryHints, currentAchievements, user, toast]);

  const handleProceedToNext = useCallback(async () => {
    setShowAnswerResult(false);
    setIsResponseLoading(false);
    setIsAudioLoading(false);
    setPirateResponse(null);
    setPirateAudioUri(null);
    setLoadingMessage(null);

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
        <Skull className="w-12 h-12 text-primary mb-4" />
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

      {showAnswerResult ? (
        <Card className="w-full max-w-2xl mx-auto shadow-xl bg-card/90 backdrop-blur-sm animate-fadeIn p-6 min-h-[300px]">
          {(isResponseLoading || loadingMessage) && (
            <div className="animate-fadeIn space-y-4 flex flex-col justify-center items-center text-center h-full">
              <Loader2 className="w-12 h-12 text-primary mx-auto animate-spin" />
              <p className="text-lg font-semibold text-primary font-headline">{loadingMessage}</p>
            </div>
          )}
          {pirateResponse && !isResponseLoading && (
            <HintDisplay
                script={pirateResponse.script}
                isAudioLoading={isAudioLoading}
                pirateAudioUri={pirateAudioUri}
                onProceed={handleProceedToNext}
                isLastQuestion={currentQuestionIndex >= totalQuestionsToDisplay - 1}
            />
          )}
        </Card>
      ) : (
        <QuestionCard
          question={currentQuestion}
          onAnswerSubmit={handleAnswerSubmit}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={totalQuestionsToDisplay}
        />
      )}
    </div>
  );
}
