
"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
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
import SimpleHintDisplay from './SimpleHintDisplay';
import { cacheHintAction } from '@/actions/cacheHintAction';

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

interface TriviaGameProps {
  isAiLoreEnabled: boolean;
}

export default function TriviaGame({ isAiLoreEnabled }: TriviaGameProps) {
  const { user, refreshUser } = useAuth();
  const { toast } = useToast();
  
  // Game State
  const [allTriviaQuestions, setAllTriviaQuestions] = useState<TriviaQuestion[]>([]);
  const [activeQuestions, setActiveQuestions] = useState<TriviaQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0); // This is session score
  const [gameOver, setGameOver] = useState(false);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(true);
  const [isGameInitialized, setIsGameInitialized] = useState(false);

  // UI/Feedback State
  const [showAnswerResult, setShowAnswerResult] = useState(false);
  const [answerCorrectness, setAnswerCorrectness] = useState(false);
  const [isResponseLoading, setIsResponseLoading] = useState(false);
  const [isAudioLoading, setIsAudioLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState<string | null>(null);
  const [pirateResponse, setPirateResponse] = useState<PirateResponse | null>(null);
  const [pirateAudioUri, setPirateAudioUri] = useState<string | null>(null);

  // User Progress State
  const [unlockedStoryHints, setUnlockedStoryHints] = useState<StorylineHint[]>([]);
  const [currentAchievements, setCurrentAchievements] = useState<Achievement[]>([]);
  const [toastedAchievementIds, setToastedAchievementIds] = useState<Set<string>>(new Set());
  const [answeredQuestionIds, setAnsweredQuestionIds] = useState<string[]>([]);

  // Refs to hold latest state for async operations
  const scoreRef = useRef(score);
  useEffect(() => { scoreRef.current = score }, [score]);
  
  const currentAchievementsRef = useRef(currentAchievements);
  useEffect(() => { currentAchievementsRef.current = currentAchievements }, [currentAchievements]);

  const unlockedStoryHintsRef = useRef(unlockedStoryHints);
  useEffect(() => { unlockedStoryHintsRef.current = unlockedStoryHints }, [unlockedStoryHints]);


  const loadUserProgress = useCallback(() => {
    if (user && typeof window !== 'undefined') {
      // Load Story Hints
      const storedProgressKey = `storyProgress_${user.username}`;
      const storedProgress = localStorage.getItem(storedProgressKey);
      let currentUnlockedKeys: string[] = initialStoryline.filter(h => h.unlocked).map(h => h.key);
      if (storedProgress) try { currentUnlockedKeys = JSON.parse(storedProgress) } catch (e) { console.error(e); }
      setUnlockedStoryHints(
        initialStoryline.map(hint => ({ ...hint, unlocked: currentUnlockedKeys.includes(hint.key) }))
      );

      // Load Achievements
      const achievementsKey = `achievements_progress_${user.username}`;
      const storedAchievementsStr = localStorage.getItem(achievementsKey);
      let storedAchProgress: StoredAchievementProgress[] = [];
      if (storedAchievementsStr) try { storedAchProgress = JSON.parse(storedAchievementsStr) } catch (e) { console.error(e); }
      setCurrentAchievements(initialAchievementsData.map(masterAch => {
        const progress = storedAchProgress.find(p => p.id === masterAch.id);
        return { ...masterAch, icon: masterAch.icon, unlocked: progress ? progress.unlocked : (masterAch.unlocked || false) };
      }));

      // Load Answered Questions
      const storedIds = localStorage.getItem(`answered_questions_${user.username}`);
      if (storedIds) try { setAnsweredQuestionIds(JSON.parse(storedIds)) } catch (e) { console.error(e) }
    }
  }, [user]);

  // Save User Progress
  useEffect(() => {
    if (user && typeof window !== 'undefined') {
      // Save story hints
      const keysToSave = unlockedStoryHints.filter(h => h.unlocked).map(h => h.key);
      if (keysToSave.length > 0) localStorage.setItem(`storyProgress_${user.username}`, JSON.stringify(keysToSave));

      // Save achievements
      const achievementsProgressToStore = currentAchievements.map(ach => ({ id: ach.id, unlocked: ach.unlocked }));
      if (achievementsProgressToStore.length > 0) localStorage.setItem(`achievements_progress_${user.username}`, JSON.stringify(achievementsProgressToStore));

      // Save answered questions
      localStorage.setItem(`answered_questions_${user.username}`, JSON.stringify(answeredQuestionIds));
    }
  }, [unlockedStoryHints, currentAchievements, answeredQuestionIds, user]);
  

  const fetchAndSetQuestions = useCallback(async () => {
    setIsLoadingQuestions(true);
    try {
      const questions = await getTriviaQuestions();
      setAllTriviaQuestions(questions);
    } catch (error) {
      console.error("Failed to fetch trivia questions:", error);
      toast({ title: "Error Loading Questions", description: "Could not load questions. Please try again later.", variant: "destructive" });
      setAllTriviaQuestions([]);
    } finally {
      setIsLoadingQuestions(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchAndSetQuestions();
    loadUserProgress();
  }, [fetchAndSetQuestions, loadUserProgress]);
  

  const resetGame = useCallback(() => {
    if (allTriviaQuestions.length === 0) return;

    let availableQuestions = allTriviaQuestions.filter(q => !answeredQuestionIds.includes(q.id));
    if (availableQuestions.length < QUESTIONS_PER_GAME) {
      toast({ title: "You've seen it all!", description: "Resetting the question pool. Well done!", });
      availableQuestions = allTriviaQuestions;
      setAnsweredQuestionIds([]);
    }
    
    const shuffled = [...availableQuestions].sort(() => 0.5 - Math.random());
    setActiveQuestions(shuffled.slice(0, QUESTIONS_PER_GAME));
    
    setCurrentQuestionIndex(0);
    setScore(0);
    setGameOver(false);
    setShowAnswerResult(false);
    setIsResponseLoading(false);
    setLoadingMessage(null);
    setPirateResponse(null);
    setPirateAudioUri(null);
    setToastedAchievementIds(new Set());
    setIsGameInitialized(true);
  }, [allTriviaQuestions, answeredQuestionIds, toast]);

  useEffect(() => {
    if (!isLoadingQuestions && allTriviaQuestions.length > 0 && !isGameInitialized) {
      resetGame();
    }
  }, [isLoadingQuestions, allTriviaQuestions, isGameInitialized, resetGame]);

  const currentQuestion = activeQuestions[currentQuestionIndex];
  
  const handleAnswerSubmit = useCallback(async (answer: string) => {
    if (!currentQuestion) return;

    const isCorrect = answer === currentQuestion.answer;
    setAnswerCorrectness(isCorrect);
    setShowAnswerResult(true);

    if (isCorrect) {
        if (typeof window !== 'undefined') new Audio('https://firebasestorage.googleapis.com/v0/b/islands-riverrat-lore.firebasestorage.app/o/coins-spill.mp3?alt=media&token=e36bc0a2-ff0b-4076-b863-d2cf384ee50c').play().catch(e => console.error(e));
        setScore(prev => prev + 10);
        const storyHintKey = currentQuestion.storylineHintKey;
        if (!unlockedStoryHintsRef.current.find(h => h.key === storyHintKey)?.unlocked) {
            setUnlockedStoryHints(prev => prev.map(h => (h.key === storyHintKey ? { ...h, unlocked: true } : h)));
            if (!currentAchievementsRef.current.find(a => a.id === 'first_hint')?.unlocked) {
              updateAchievementProgress(currentAchievementsRef.current, 'first_hint', setCurrentAchievements);
            }
        }
    } else {
        if (typeof window !== 'undefined') new Audio('https://firebasestorage.googleapis.com/v0/b/islands-riverrat-lore.firebasestorage.app/o/fog-horn.mp3?alt=media&token=fdc46aad-af9f-450d-b355-c6f2189fcd57').play().catch(e => console.error(e));
        setScore(prev => Math.max(0, prev - 5));
    }

    if (isAiLoreEnabled) {
      const responseAudios = isCorrect ? correctResponses : wrongResponses;
      const randomAudioUrl = responseAudios[Math.floor(Math.random() * responseAudios.length)];
      if (typeof window !== 'undefined') new Audio(randomAudioUrl).play().catch(e => console.error(e));
      
      const randomMessage = pirateLoadingMessages[Math.floor(Math.random() * pirateLoadingMessages.length)];
      setLoadingMessage(randomMessage);
      setIsResponseLoading(true);

      const processHint = async () => {
        let script = currentQuestion.cachedPirateScript;
        if (!script) {
          try {
            const scriptResult = await generatePirateScript({
              question: currentQuestion.question,
              playerAnswer: answer,
              correctAnswer: currentQuestion.answer,
              fallbackHint: currentQuestion.fallbackHint || "Arrr, this secret be lost to the depths!",
            });
            script = scriptResult.script;
            cacheHintAction(currentQuestion.id, script).catch(err => console.error("Failed to cache hint:", err));
          } catch (error) {
            console.error("Failed to generate pirate script:", error);
            toast({ title: "The spirits be quiet...", description: "Couldn't get a response from the pirate ghost. Using a fallback hint!", variant: "destructive" });
            script = currentQuestion.fallbackHint || "A mysterious force prevents the hint from appearing...";
          }
        }
        
        setPirateResponse({ script });
        setIsResponseLoading(false);
        setLoadingMessage(null);
        setIsAudioLoading(true);

        try {
          const audioResult = await generateSpokenPirateAudio({ script });
          setPirateAudioUri(audioResult.audioDataUri);
        } catch (err) {
          console.error("Failed to generate pirate audio:", err);
          toast({ title: "The parrot be shy...", description: "Couldn't generate the pirate's voice.", variant: "destructive" });
        } finally {
          setIsAudioLoading(false);
        }
      };
      processHint();
    } else {
      setPirateResponse({ script: currentQuestion.fallbackHint || "No hint available." });
    }
  }, [currentQuestion, isAiLoreEnabled, toast]);

  const handleProceedToNext = useCallback(async () => {
    if (currentQuestion) {
      setAnsweredQuestionIds(prevIds => Array.from(new Set([...prevIds, currentQuestion.id])));
    }

    const nextIndex = currentQuestionIndex + 1;

    // Reset feedback UI
    setShowAnswerResult(false);
    setIsResponseLoading(false);
    setIsAudioLoading(false);
    setPirateResponse(null);
    setPirateAudioUri(null);
    setLoadingMessage(null);

    if (nextIndex < activeQuestions.length) {
      setCurrentQuestionIndex(nextIndex);
    } else {
      setGameOver(true);
      if (user) {
        try {
          // Use the ref here to get the most up-to-date score
          await updateUserScore(user.username.toLowerCase(), user.username, scoreRef.current);
          await refreshUser(); 
        } catch (error) {
          console.error("Failed to update score on leaderboard:", error);
          toast({ title: "Leaderboard Error", description: "Could not save your score.", variant: "destructive" });
        }
      }
    }
  }, [currentQuestion, currentQuestionIndex, activeQuestions.length, user, toast, refreshUser]);

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
          action: ( <Link href="/achievements"><Button variant="outline" size="sm">View</Button></Link> ),
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
          <p className="text-2xl">Your haul this game: <span className="font-bold text-accent">{score.toLocaleString()}</span> gold coins!</p>
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
            <Button onClick={() => { setIsGameInitialized(false); resetGame(); }} className="bg-accent text-accent-foreground hover:bg-accent/80">
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

  const totalQuestionsToDisplay = activeQuestions.length;
  const progressPercentage = ((currentQuestionIndex + 1) / totalQuestionsToDisplay) * 100;
  const totalUserScore = (user?.score || 0) + score;

  return (
    <div className="space-y-8">
      <Card className="bg-card/80 backdrop-blur-sm shadow-md p-4">
        <div className="flex justify-between items-center mb-2">
            <p className="text-lg font-semibold text-primary">Total Gold: <span className="text-accent">{totalUserScore.toLocaleString()}</span></p>
            <p className="text-sm text-muted-foreground">Question {currentQuestionIndex + 1} of {totalQuestionsToDisplay}</p>
        </div>
        <Progress value={progressPercentage} className="w-full h-3 [&>div]:bg-accent" />
        <p className="text-xs text-muted-foreground italic mt-2 text-center">
            Earn 10 gold for each right answer, lose 5 for wrong ones. Rack up gold to <Link href="/leaderboard" className="underline hover:text-accent">rise in rank!</Link>
        </p>
      </Card>

      <div className="w-full max-w-2xl mx-auto min-h-[300px] flex justify-center items-center">
        {showAnswerResult ? (
          isAiLoreEnabled ? (
            <>
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
            </>
          ) : (
             pirateResponse && <SimpleHintDisplay 
              script={pirateResponse.script}
              isCorrect={answerCorrectness}
              correctAnswer={currentQuestion.answer}
              onProceed={handleProceedToNext}
              isLastQuestion={currentQuestionIndex >= totalQuestionsToDisplay - 1}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={totalQuestionsToDisplay}
            />
          )
        ) : (
          <QuestionCard
            question={currentQuestion}
            onAnswerSubmit={handleAnswerSubmit}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={totalQuestionsToDisplay}
          />
        )}
      </div>
    </div>
  );
}
