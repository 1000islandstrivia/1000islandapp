
"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { storyline as initialStoryline, achievements as initialAchievementsData } from '@/lib/trivia-data';
import type { TriviaQuestion, StorylineHint, Achievement, PlayerRank } from '@/lib/trivia-data';
import QuestionCard from './QuestionCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from "@/components/ui/progress";
import { getAiPirateResponseAction } from '@/actions/getAiPirateResponseAction';
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/hooks/useAuth';
import { Award, RefreshCw, type LucideIcon, Loader2, Skull, BookOpen, Play } from 'lucide-react';
import Link from 'next/link';
import { updateUserScore } from '@/services/leaderboardService';
import { getTriviaQuestions, getQuestionHints, preloadHintsForQuestions } from '@/services/triviaService';
import HintDisplay from './HintDisplay';
import SimpleHintDisplay from './SimpleHintDisplay';

const QUESTIONS_PER_GAME = 10;
const USER_HISTORY_LENGTH = 50;


const pirateLoadingMessages = [
  "☠️ Hold fast, matey... a cursed clue be brewin'...",
  "⚓ Summonin' the ghost of a river pirate...",
  "🦜 Squawk! The parrot's whisperin' secrets...",
  "🗺️ Unfurlin' the scroll of shame...",
  "💀 Dredgin' up facts from Davy Jones's locker...",
];

const correctMaleAudio = [
  'https://firebasestorage.googleapis.com/v0/b/islands-riverrat-lore.firebasestorage.app/o/male_right_answer_1.mp3?alt=media&token=e5f3fdb6-aaec-4616-b9b5-c1c37eba1898',
  'https://firebasestorage.googleapis.com/v0/b/islands-riverrat-lore.firebasestorage.app/o/male_right_answer_2.mp3?alt=media&token=ea2cb0fa-6299-4db4-bb7b-0d163526f5ba',
];
const correctFemaleAudio = [
    'https://firebasestorage.googleapis.com/v0/b/islands-riverrat-lore.firebasestorage.app/o/right_answer_1.mp3?alt=media&token=abc518be-b949-407e-9faf-1e33487fd580',
    'https://firebasestorage.googleapis.com/v0/b/islands-riverrat-lore.firebasestorage.app/o/right_answer_2.mp3?alt=media&token=946c0515-67ed-40e9-b342-d01127622da5',
];
const wrongMaleAudio = [
    'https://firebasestorage.googleapis.com/v0/b/islands-riverrat-lore.firebasestorage.app/o/male_wrong_answer_1.mp3?alt=media&token=3ba1a143-3475-4fd4-bd30-448045bbc9f3',
    'https://firebasestorage.googleapis.com/v0/b/islands-riverrat-lore.firebasestorage.app/o/male_wrong_answer_2.mp3?alt=media&token=78c97623-b600-4a25-aa3a-d6ebea857a3e',
];
const wrongFemaleAudio = [
    'https://firebasestorage.googleapis.com/v0/b/islands-riverrat-lore.firebasestorage.app/o/wrong_answer_1.mp3?alt=media&token=7d9158f9-5839-4eb2-985c-5ed7a67573c7',
    'https://firebasestorage.googleapis.com/v0/b/islands-riverrat-lore.firebasestorage.app/o/wrong_answer_2.mp3?alt=media&token=6257a8c3-943b-47f8-8003-58e62dfb5d8c',
];

const correctResponses = [...correctMaleAudio, ...correctFemaleAudio];
const wrongResponses = [...wrongMaleAudio, ...wrongFemaleAudio];

interface StoredAchievementProgress {
  id: string;
  unlocked: boolean;
}

interface PirateResponse {
  script: string;
  audioDataUris?: string[];
}

interface TriviaGameProps {
  isAiLoreEnabled: boolean;
  isInstantResponseEnabled: boolean;
}

type GameState = 'LOADING' | 'READY' | 'STARTING' | 'PLAYING' | 'RESULT' | 'GAMEOVER' | 'ERROR' | 'QUESTION_LOADING';

// Client-side helper to get user history from localStorage
function getUserQuestionHistory(): string[] {
  if (typeof window !== 'undefined') {
    return JSON.parse(localStorage.getItem('userQuestionHistory') || '[]');
  }
  return [];
}

// Client-side helper to update user history in localStorage
function updateUserHistory(questionId: string) {
  const history = getUserQuestionHistory();
  const updatedHistory = [questionId, ...history];
  if (updatedHistory.length > USER_HISTORY_LENGTH) {
    updatedHistory.pop();
  }
  localStorage.setItem('userQuestionHistory', JSON.stringify(updatedHistory));
}

export default function TriviaGame({ isAiLoreEnabled, isInstantResponseEnabled }: TriviaGameProps) {
  const { user, refreshUser } = useAuth();
  const { toast } = useToast();

  const [gameState, setGameState] = useState<GameState>('LOADING');
  const [errorMessage, setErrorMessage] = useState('');
  const [gameQuestions, setGameQuestions] = useState<TriviaQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState(false);
  const [pirateResponse, setPirateResponse] = useState<PirateResponse | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [isHintPlaying, setIsHintPlaying] = useState(false);
  const [unlockedStoryHints, setUnlockedStoryHints] = useState<StorylineHint[]>([]);
  const [currentAchievements, setCurrentAchievements] = useState<Achievement[]>([]);
  const [toastedAchievementIds, setToastedAchievementIds] = useState<Set<string>>(new Set());
  
  const [achievementsToToast, setAchievementsToToast] = useState<Achievement[]>([]);
  const [storyToastQueue, setStoryToastQueue] = useState<string[]>([]);

  const loadingMessage = useRef(pirateLoadingMessages[0]);
  const gameInitialized = useRef(false);
  const isProcessingAnswer = useRef(false);

  // Load questions on initial component mount
  useEffect(() => {
    async function loadInitialQuestions() {
      try {
        setGameState('LOADING');
        const userHistory = getUserQuestionHistory();
        const questions = await getTriviaQuestions(userHistory);
        
        if (!questions || questions.length < QUESTIONS_PER_GAME) {
          throw new Error(`Not enough unique questions available. Need ${QUESTIONS_PER_GAME}, but only found ${questions?.length || 0}.`);
        }
        
        setGameQuestions(questions);
        setGameState('READY');
      } catch (e: any) {
        console.error("Failed to fetch trivia questions:", e);
        setErrorMessage(`Error loading questions: ${e.message}`);
        setGameState('ERROR');
      }
    }
    loadInitialQuestions();
  }, []);
  
  const loadUserProgress = useCallback(() => {
    if (user) {
      try {
        const storyKey = `storyProgress_${user.username}`;
        const storedStory = localStorage.getItem(storyKey);
        const unlockedKeys = storedStory ? JSON.parse(storedStory) : initialStoryline.filter(h => h.unlocked).map(h => h.key);
        setUnlockedStoryHints(initialStoryline.map(h => ({ ...h, unlocked: unlockedKeys.includes(h.key) })));

        const achKey = `achievements_progress_${user.username}`;
        const storedAch = localStorage.getItem(achKey);
        const storedProgress: StoredAchievementProgress[] = storedAch ? JSON.parse(storedAch) : [];
        setCurrentAchievements(initialAchievementsData.map(masterAch => {
          const progress = storedProgress.find(p => p.id === masterAch.id);
          return { ...masterAch, icon: masterAch.icon, unlocked: !!progress?.unlocked };
        }));

      } catch (e) {
        console.error("Failed to load user progress from localStorage", e);
      }
    }
  }, [user]);

  useEffect(() => {
    loadUserProgress();
  }, [user, loadUserProgress]);
  
  useEffect(() => {
    if (user && gameInitialized.current) {
      try {
        const keysToSave = unlockedStoryHints.filter(h => h.unlocked).map(h => h.key);
        localStorage.setItem(`storyProgress_${user.username}`, JSON.stringify(keysToSave));
        
        const achievementsProgress = currentAchievements.map(a => ({ id: a.id, unlocked: a.unlocked }));
        localStorage.setItem(`achievements_progress_${user.username}`, JSON.stringify(achievementsProgress));
        
      } catch (e) {
        console.error("Failed to save progress to localStorage", e);
      }
    }
  }, [unlockedStoryHints, currentAchievements, user]);

  const playAudio = useCallback((audioUrl: string, description: string = 'audio') => {
    if (typeof window !== 'undefined') {
      try {
        const audio = new Audio(audioUrl);
        audio.play().catch(e => console.warn(`${description} play failed`, e));
      } catch (e) {
        console.warn(`Failed to create ${description} element:`, e);
      }
    }
  }, []);

  const initializeGame = useCallback(() => {
    console.log('🎮 Initializing new game...');
    setGameState('STARTING');
    gameInitialized.current = true;
    setCurrentScore(0);
    setCurrentQuestionIndex(0);
    setPirateResponse(null);
    setLastAnswerCorrect(false);
    setIsHintPlaying(false);
    setToastedAchievementIds(new Set());
    isProcessingAnswer.current = false;
    
    // Preload hints for first few questions
    preloadHintsForQuestions(gameQuestions.slice(0, 3).map(q => q.id)).catch(console.warn);
    
    setGameState('PLAYING');
  }, [gameQuestions]);

  const handleAnswerSubmit = useCallback(async (answer: string) => {
    if (isProcessingAnswer.current) return;
    
    const question = gameQuestions[currentQuestionIndex];
    if (!question) {
      setErrorMessage("Lost the next question! Please restart.");
      setGameState('ERROR');
      return;
    }
    
    isProcessingAnswer.current = true;
    setGameState('QUESTION_LOADING');
    updateUserHistory(question.id);
  
    const isCorrect = answer === question.answer;
    setLastAnswerCorrect(isCorrect);

    if (isInstantResponseEnabled) {
      const audioSet = isCorrect ? correctResponses : wrongResponses;
      playAudio(audioSet[Math.floor(Math.random() * audioSet.length)], 'instant feedback');
    }

    if (isCorrect) {
      setCurrentScore(s => s + 10);
      playAudio('https://firebasestorage.googleapis.com/v0/b/islands-riverrat-lore.firebasestorage.app/o/coins-spill.mp3?alt=media&token=e36bc0a2-ff0b-4076-b863-d2cf384ee50c', 'coin spill');
      
      const hintKey = question.storylineHintKey;
      setUnlockedStoryHints(prev => {
        const isNew = !prev.some(h => h.key === hintKey && h.unlocked);
        if (isNew) {
          const hint = initialStoryline.find(h => h.key === hintKey);
          if (hint) setStoryToastQueue(q => [...q, hint.title]);
          return prev.map(h => h.key === hintKey ? { ...h, unlocked: true } : h);
        }
        return prev;
      });
    } else {
      setCurrentScore(s => Math.max(0, s - 5));
    }

    let hintScript: PirateResponse;
    if (isAiLoreEnabled) {
      setIsAiLoading(true);
      loadingMessage.current = pirateLoadingMessages[Math.floor(Math.random() * pirateLoadingMessages.length)];
      try {
        const result = await getAiPirateResponseAction({ question, playerAnswer: answer });
        if (!result.success || !result.script) throw new Error(result.error || "AI failed.");
        hintScript = { script: result.script, audioDataUris: result.audioDataUris };
      } catch (error) {
        const hintData = await getQuestionHints(question.id);
        hintScript = { script: hintData.fallbackHint || "A mysterious force prevents the hint..." };
      }
    } else {
      const hintData = await getQuestionHints(question.id);
      hintScript = { script: hintData.fallbackHint || "No hint available." };
    }

    setPirateResponse(hintScript);
    setIsAiLoading(false);
    setIsHintPlaying(isAiLoreEnabled);
    isProcessingAnswer.current = false;
    setGameState('RESULT');

  }, [currentQuestionIndex, gameQuestions, isAiLoreEnabled, isInstantResponseEnabled, playAudio]);

  const onHintTypingComplete = useCallback(() => {}, []);

  const handleProceedToNext = useCallback(async () => {
    const nextIndex = currentQuestionIndex + 1;
    setPirateResponse(null);
    setIsHintPlaying(false);

    if (nextIndex < gameQuestions.length) {
      setCurrentQuestionIndex(nextIndex);
      preloadHintsForQuestions(gameQuestions.slice(nextIndex + 1, nextIndex + 3).map(q => q.id)).catch(console.warn);
      setGameState('PLAYING');
    } else {
      setGameState('GAMEOVER');
      if (user) {
        try {
          await updateUserScore(user.username.toLowerCase(), user.username, currentScore);
          await refreshUser();
        } catch (error) {
          toast({ title: "Leaderboard Error", description: "Could not save your score.", variant: "destructive" });
        }
      }
      
      setCurrentAchievements(prev => {
          const newlyUnlocked: Achievement[] = [];
          const updated = prev.map(ach => {
              if (ach.unlocked) return ach;
              let unlocked = (ach.id === 'first_game') || (ach.id === 'first_blood' && currentScore > 0);
              if (unlocked) {
                  const newAch = { ...ach, unlocked: true };
                  if (!toastedAchievementIds.has(ach.id)) newlyUnlocked.push(newAch);
                  return newAch;
              }
              return ach;
          });
          if (newlyUnlocked.length > 0) {
              setAchievementsToToast(q => [...q, ...newlyUnlocked]);
              setToastedAchievementIds(ids => new Set([...ids, ...newlyUnlocked.map(a => a.id)]));
          }
          return updated;
      });
    }
  }, [currentQuestionIndex, gameQuestions, user, currentScore, toast, refreshUser, toastedAchievementIds]);
  
  useEffect(() => {
    if (achievementsToToast.length > 0) {
      achievementsToToast.forEach(ach => {
        const Icon = ach.icon as LucideIcon | undefined;
        toast({
            title: "Achievement Unlocked!",
            description: (<div className="flex items-center">{Icon && <Icon className="w-5 h-5 mr-2 text-accent" />}<span>{ach.name}</span></div>),
        });
      });
      setAchievementsToToast([]);
    }
  }, [achievementsToToast, toast]);

  useEffect(() => {
    if (storyToastQueue.length > 0) {
      storyToastQueue.forEach(title => {
        toast({
          title: "Lore Unlocked!",
          description: `You've uncovered: "${title}"`,
          action: (<Link href="/storyline"><Button variant="secondary" size="sm">View Story</Button></Link>),
        });
      });
      setStoryToastQueue([]); 
    }
  }, [storyToastQueue, toast]);

  const currentQuestion = gameQuestions[currentQuestionIndex];
  const totalUserScore = (user?.score || 0) + currentScore;

  if (gameState === 'LOADING') {
    return (
      <div className="flex items-center justify-center min-h-[300px] bg-card/80 backdrop-blur-sm rounded-lg shadow-md">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
        <p className="ml-4 text-xl">Charting the course...</p>
      </div>
    );
  }

  if (gameState === 'ERROR') {
     return (
      <div className="flex flex-col items-center justify-center min-h-[300px] bg-destructive/10 backdrop-blur-sm rounded-lg shadow-md p-6 text-center">
        <Skull className="w-16 h-16 text-destructive mb-4" />
        <p className="font-headline text-2xl text-destructive">A Squall has Hit!</p>
        <p className="text-destructive-foreground/80 mt-2">{errorMessage}</p>
        <Button onClick={() => window.location.reload()} className="mt-6" variant="destructive">
            <RefreshCw className="mr-2 h-4 w-4" /> Reload Page
        </Button>
      </div>
    );
  }

  if (gameState === 'READY') {
    return (
        <Card className="w-full max-w-lg mx-auto text-center p-8 shadow-xl bg-card/90 backdrop-blur-sm animate-slideUp">
            <CardHeader>
                <Award className="w-16 h-16 mx-auto text-accent mb-4" />
                <CardTitle className="font-headline text-4xl text-primary">Ready to Set Sail?</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-lg text-foreground/80">A new voyage of {QUESTIONS_PER_GAME} questions awaits. Test your knowledge of river lore!</p>
                <div className="text-sm text-muted-foreground mt-2">
                    Cache Status: ✅ Loaded {gameQuestions.length} fresh questions
                </div>
                <Button onClick={initializeGame} className="w-full mt-6 bg-primary hover:bg-primary/90">
                    <Play className="mr-2 h-4 w-4" />
                    Begin Trivia Challenge
                </Button>
            </CardContent>
        </Card>
    );
  }

  if (gameState === 'GAMEOVER') {
    return (
      <Card className="w-full max-w-lg mx-auto text-center p-8 shadow-xl bg-card/90 backdrop-blur-sm animate-slideUp">
        <CardHeader>
          <Award className="w-16 h-16 mx-auto text-accent mb-4" />
          <CardTitle className="font-headline text-4xl text-primary">Adventure Complete, Captain!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-2xl">Your haul: <span className="font-bold text-accent">{currentScore.toLocaleString()}</span> gold!</p>
          <p className="text-lg text-foreground/80">
            Ye've navigated the treacherous waters of trivia. Check the leaderboard to see yer new rank!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link href="/leaderboard">View Leaderboard</Link>
            </Button>
            <Button asChild variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
              <Link href="/storyline">View Storyline</Link>
            </Button>
            <Button onClick={() => window.location.reload()} className="bg-accent text-accent-foreground hover:bg-accent/80">
                <RefreshCw className="mr-2 h-4 w-4" /> New Voyage
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  const progressPercentage = gameQuestions.length > 0 ? ((currentQuestionIndex) / gameQuestions.length) * 100 : 0;

  return (
    <div className="space-y-8">
      <Card className="bg-card/80 backdrop-blur-sm shadow-md p-4">
        <div className="flex justify-between items-center mb-2">
            <p className="text-lg font-semibold text-primary">Total Gold: <span className="text-accent">{totalUserScore.toLocaleString()}</span></p>
            {(gameState === 'PLAYING' || gameState === 'QUESTION_LOADING') &&
                <p className="text-sm text-muted-foreground">Question {currentQuestionIndex + 1} of {gameQuestions.length}</p>
            }
        </div>
        <Progress value={progressPercentage} className="w-full h-3 [&>div]:bg-accent" />
        <p className="text-xs text-muted-foreground italic mt-2 text-center">
            Earn 10 gold for right answers, lose 5 for wrong. Rack up gold to <Link href="/leaderboard" className="underline hover:text-accent">rise in rank!</Link>
        </p>
      </Card>

      <div className="w-full max-w-2xl mx-auto min-h-[300px] flex justify-center items-center">
        {gameState === 'PLAYING' && currentQuestion ? (
          <QuestionCard
            question={currentQuestion}
            onAnswerSubmit={handleAnswerSubmit}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={gameQuestions.length}
          />
        ) : (gameState === 'PLAYING' && !currentQuestion) ? (
            <div className="flex flex-col items-center justify-center min-h-[300px] bg-destructive/10 backdrop-blur-sm rounded-lg shadow-md p-6 text-center animate-fadeIn">
                <Skull className="w-16 h-16 text-destructive mb-4" />
                <p className="font-headline text-2xl text-destructive">A Squall has Hit!</p>
                <p className="text-destructive-foreground/80 mt-2">The next question was lost to the river mists.</p>
                <Button onClick={() => window.location.reload()} className="mt-6" variant="destructive">
                    <RefreshCw className="mr-2 h-4 w-4" /> Restart Voyage
                </Button>
            </div>
        ) : null }

        {gameState === 'QUESTION_LOADING' && (
          <div className="flex items-center justify-center min-h-[300px] bg-card/80 backdrop-blur-sm rounded-lg shadow-md animate-fadeIn">
            <Loader2 className="w-12 h-12 animate-spin text-primary" />
            <p className="ml-4 text-xl">Processing answer...</p>
          </div>
        )}

        {gameState === 'RESULT' && (
          isAiLoreEnabled ? (
            <>
              {isAiLoading && !pirateResponse?.script ? (
                <div className="animate-fadeIn space-y-6 flex flex-col justify-center items-center text-center h-full">
                  <Skull className="w-48 h-48 text-primary/30 animate-pulse-and-rotate" />
                  <p className="text-lg font-semibold text-primary font-headline animate-fadeIn">
                    {loadingMessage.current}
                  </p>
                </div>
              ) : pirateResponse && (
                <HintDisplay
                    script={pirateResponse.script}
                    audioDataUris={pirateResponse.audioDataUris}
                    onProceed={handleProceedToNext}
                    isLastQuestion={currentQuestionIndex >= gameQuestions.length - 1}
                    onTypingComplete={onHintTypingComplete}
                    startPlayback={isHintPlaying}
                    setIsPlaying={setIsHintPlaying}
                />
              )}
            </>
          ) : (
             pirateResponse && currentQuestion && <SimpleHintDisplay 
              script={pirateResponse.script}
              isCorrect={lastAnswerCorrect}
              correctAnswer={currentQuestion.answer}
              onProceed={handleProceedToNext}
              isLastQuestion={currentQuestionIndex >= gameQuestions.length - 1}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={gameQuestions.length}
            />
          )
        )}
      </div>
    </div>
  );
}
