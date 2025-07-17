
"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { storyline as initialStoryline, achievements as initialAchievementsData } from '@/lib/trivia-data';
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

const correctMaleAudio = [
  'https://firebasestorage.googleapis.com/v0/b/islands-riverrat-lore.firebasestorage.app/o/male_right_answer_1.mp3?alt=media&token=e5f3fdb6-aaec-4616-b9b5-c1c37eba1898',
  'https://firebasestorage.googleapis.com/v0/b/islands-riverrat-lore.firebasestorage.app/o/male_right_answer_2.mp3?alt=media&token=ea2cb0fa-6299-4db4-bb7b-0d163526f5ba',
  'https://firebasestorage.googleapis.com/v0/b/islands-riverrat-lore.firebasestorage.app/o/male_right_answer_3.mp3?alt=media&token=c444e71e-b9da-4962-89a2-a8c3c5ea56c7',
  'https://firebasestorage.googleapis.com/v0/b/islands-riverrat-lore.firebasestorage.app/o/male_right_answer_4.mp3?alt=media&token=5609da46-1448-4fae-a60-d2ee2971686e',
  'https://firebasestorage.googleapis.com/v0/b/islands-riverrat-lore.firebasestorage.app/o/male_right_answer_5.mp3?alt=media&token=5886b949-0c15-46fb-936b-21e2cdca5ced'
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

interface TriviaGameProps {
  isAiLoreEnabled: boolean;
}

type GameState = 'LOADING' | 'READY' | 'PLAYING' | 'RESULT' | 'GAMEOVER' | 'ERROR';

export default function TriviaGame({ isAiLoreEnabled }: TriviaGameProps) {
  const { user, refreshUser } = useAuth();
  const { toast } = useToast();

  // Component State
  const [gameState, setGameState] = useState<GameState>('LOADING');
  const [errorMessage, setErrorMessage] = useState('');

  // Game Data State
  const [allTriviaQuestions, setAllTriviaQuestions] = useState<TriviaQuestion[]>([]);
  const [activeQuestions, setActiveQuestions] = useState<TriviaQuestion[]>([]);
  const [answeredQuestionIds, setAnsweredQuestionIds] = useState<Set<string>>(new Set());
  
  // In-Game State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState(false);
  
  // AI Response State
  const [pirateResponse, setPirateResponse] = useState<PirateResponse | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [pirateAudioUri, setPirateAudioUri] = useState<string | null>(null);
  const [isAudioLoading, setIsAudioLoading] = useState(false);
  
  // User Progress State
  const [unlockedStoryHints, setUnlockedStoryHints] = useState<StorylineHint[]>([]);
  const [currentAchievements, setCurrentAchievements] = useState<Achievement[]>([]);
  const [toastedAchievementIds, setToastedAchievementIds] = useState<Set<string>>(new Set());
  
  const loadingMessage = useRef(pirateLoadingMessages[0]);

  // Load all questions from DB once on component mount
  useEffect(() => {
    async function fetchAllQuestions() {
      try {
        const questions = await getTriviaQuestions();
        if (questions && questions.length > 0) {
          setAllTriviaQuestions(questions);
        } else {
          throw new Error("No trivia questions could be loaded from the database.");
        }
      } catch (e: any) {
        console.error("Failed to fetch trivia questions:", e);
        setErrorMessage(`Error loading questions: ${e.message}`);
        setGameState('ERROR');
      }
    }
    fetchAllQuestions();
  }, []);

  // Load user progress from localStorage when user is available
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

        const answeredKey = `answered_questions_${user.username}`;
        const storedAnswered = localStorage.getItem(answeredKey);
        setAnsweredQuestionIds(new Set(storedAnswered ? JSON.parse(storedAnswered) : []));
      } catch (e) {
        console.error("Failed to load user progress from localStorage", e);
      }
    }
  }, [user]);
  
  useEffect(() => {
    loadUserProgress();
  }, [user, loadUserProgress]);
  
  // Save progress to localStorage whenever it changes
  useEffect(() => {
    if (user && gameState !== 'LOADING') {
      try {
        const keysToSave = unlockedStoryHints.filter(h => h.unlocked).map(h => h.key);
        localStorage.setItem(`storyProgress_${user.username}`, JSON.stringify(keysToSave));
        
        const achievementsProgress = currentAchievements.map(a => ({ id: a.id, unlocked: a.unlocked }));
        localStorage.setItem(`achievements_progress_${user.username}`, JSON.stringify(achievementsProgress));
        
        localStorage.setItem(`answered_questions_${user.username}`, JSON.stringify(Array.from(answeredQuestionIds)));
      } catch (e) {
        console.error("Failed to save progress to localStorage", e);
      }
    }
  }, [unlockedStoryHints, currentAchievements, answeredQuestionIds, user, gameState]);

  const initializeGame = useCallback(() => {
    setGameState('LOADING');
    setCurrentScore(0);
    setCurrentQuestionIndex(0);
    setPirateResponse(null);
    setPirateAudioUri(null);
    setLastAnswerCorrect(false);
    setToastedAchievementIds(new Set());
    
    if (allTriviaQuestions.length < QUESTIONS_PER_GAME) {
        setErrorMessage(`Not enough unique questions available to start a new game (need ${QUESTIONS_PER_GAME}, only ${allTriviaQuestions.length} exist). Please contact an admin.`);
        setGameState('ERROR');
        return;
    }
    
    let currentAnsweredIds = new Set<string>();
    try {
        const storedAnswered = localStorage.getItem(`answered_questions_${user?.username}`);
        currentAnsweredIds = new Set(storedAnswered ? JSON.parse(storedAnswered) : []);
    } catch (e) {
        console.error("Error parsing answered questions, starting fresh.", e);
    }

    let availableQuestions = allTriviaQuestions.filter(q => !currentAnsweredIds.has(q.id));
    
    if (availableQuestions.length < QUESTIONS_PER_GAME) {
        toast({
          title: "You've Seen It All!",
          description: "Resetting the question pool. Well done, Captain!",
        });
        currentAnsweredIds.clear();
        if(user) localStorage.removeItem(`answered_questions_${user.username}`);
        availableQuestions = allTriviaQuestions;
    }

    const shuffled = [...availableQuestions].sort(() => 0.5 - Math.random());
    const newGameQuestions = shuffled.slice(0, QUESTIONS_PER_GAME);
    
    setActiveQuestions(newGameQuestions);
    setGameState('PLAYING');
  }, [allTriviaQuestions, user, toast]);

  // Start a new game once all questions are loaded
  useEffect(() => {
    if(allTriviaQuestions.length > 0) {
      setGameState('READY');
    }
  }, [allTriviaQuestions]);


  const checkAndToastAchievements = useCallback(() => {
    const updatedAchievements = [...currentAchievements];
    let changed = false;

    updatedAchievements.forEach(ach => {
      if (ach.unlocked) return;

      let unlocked = false;
      if (lastAnswerCorrect && ach.id === 'first_hint' && unlockedStoryHints.filter(h => h.unlocked).length === 1) {
        unlocked = true;
      }
      
      if(unlocked) {
        const achievement = updatedAchievements.find(a => a.id === ach.id);
        if (achievement) {
            achievement.unlocked = true;
            changed = true;
            if (!toastedAchievementIds.has(ach.id)) {
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
        }
      }
    });

    if (changed) {
      setCurrentAchievements(updatedAchievements);
    }
  }, [lastAnswerCorrect, unlockedStoryHints, currentAchievements, toast, toastedAchievementIds]);

  useEffect(() => {
    checkAndToastAchievements();
  }, [checkAndToastAchievements]);

  const handleAnswerSubmit = useCallback(async (answer: string) => {
    const question = activeQuestions[currentQuestionIndex];
    if (!question) return;

    const isCorrect = answer === question.answer;
    setLastAnswerCorrect(isCorrect);
    setAnsweredQuestionIds(prev => new Set(prev).add(question.id));

    if (isAiLoreEnabled) {
      const responseAudios = isCorrect ? correctResponses : wrongResponses;
      const randomAudioUrl = responseAudios[Math.floor(Math.random() * responseAudios.length)];
      if (typeof window !== 'undefined') {
        new Audio(randomAudioUrl).play().catch(e => console.error("Audio play failed:", e));
      }
    }

    if (isCorrect) {
      setCurrentScore(s => s + 10);
      if (typeof window !== 'undefined') {
          new Audio('https://firebasestorage.googleapis.com/v0/b/islands-riverrat-lore.firebasestorage.app/o/coins-spill.mp3?alt=media&token=e36bc0a2-ff0b-4076-b863-d2cf384ee50c').play().catch(e => console.error("Audio play failed:", e));
      }
      const hintKey = question.storylineHintKey;
      const isAlreadyUnlocked = unlockedStoryHints.some(h => h.key === hintKey && h.unlocked);

      if (!isAlreadyUnlocked) {
        toast({
          title: "Lore Unlocked!",
          description: `You've uncovered a new secret: "${initialStoryline.find(h => h.key === hintKey)?.title}"`,
          action: (<Link href="/storyline"><Button variant="secondary" size="sm">View Story</Button></Link>),
        });
        setUnlockedStoryHints(prev => prev.map(h => (h.key === hintKey ? { ...h, unlocked: true } : h)));
      }
    } else {
      setCurrentScore(s => Math.max(0, s - 5));
      if (typeof window !== 'undefined') {
        new Audio('https://firebasestorage.googleapis.com/v0/b/islands-riverrat-lore.firebasestorage.app/o/fog-horn.mp3?alt=media&token=fdc46aad-af9f-450d-b355-c6f2189fcd57').play().catch(e => console.error("Audio play failed:", e));
      }
    }

    setGameState('RESULT');
    
    if (isAiLoreEnabled) {
      setIsAiLoading(true);
      loadingMessage.current = pirateLoadingMessages[Math.floor(Math.random() * pirateLoadingMessages.length)];
      
      let script = question.cachedPirateScript;
      if (!script) {
        try {
          const scriptResult = await generatePirateScript({
            question: question.question,
            playerAnswer: answer,
            correctAnswer: question.answer,
            fallbackHint: question.fallbackHint || "Arrr, this secret be lost to the depths!",
          });
          script = scriptResult.script;
          if (script) cacheHintAction(question.id, script).catch(err => console.error("Failed to cache hint:", err));
        } catch (error) {
          script = question.fallbackHint || "A mysterious force prevents the hint from appearing...";
        }
      }
      setPirateResponse({ script });
      setIsAiLoading(false);

      if (script) {
        setIsAudioLoading(true);
        try {
          const audioResult = await generateSpokenPirateAudio({ script });
          setPirateAudioUri(audioResult.audioDataUri);
        } catch (err) {
          setPirateAudioUri(null);
        } finally {
          setIsAudioLoading(false);
        }
      }
    } else {
      setPirateResponse({ script: question.fallbackHint || "No hint available." });
    }

  }, [activeQuestions, currentQuestionIndex, isAiLoreEnabled, toast, unlockedStoryHints]);

  const handleProceedToNext = useCallback(async () => {
    const nextIndex = currentQuestionIndex + 1;
    
    setPirateResponse(null);
    setPirateAudioUri(null);

    if (nextIndex < activeQuestions.length) {
      setCurrentQuestionIndex(nextIndex);
      setGameState('PLAYING');
    } else {
      setGameState('GAMEOVER');
      if (user) {
        try {
          await updateUserScore(user.username.toLowerCase(), user.username, currentScore);
          await refreshUser();
        } catch (error) {
          console.error("Failed to update score on leaderboard:", error);
          toast({ title: "Leaderboard Error", description: "Could not save your score.", variant: "destructive" });
        }
      }
      
      const newAchievements = [...currentAchievements];
      let changed = false;
      newAchievements.forEach(ach => {
        if (ach.unlocked) return;
        let unlocked = false;
        if (ach.id === 'first_game') unlocked = true;
        if (ach.id === 'first_blood' && currentScore > 0) unlocked = true;
        if (unlocked) {
          ach.unlocked = true;
          changed = true;
        }
      });
      if (changed) setCurrentAchievements(newAchievements);
    }
  }, [currentQuestionIndex, activeQuestions.length, user, currentScore, toast, refreshUser, currentAchievements]);
  

  const currentQuestion = activeQuestions[currentQuestionIndex];
  const totalQuestions = activeQuestions.length;

  // RENDER LOGIC
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
        <Skull className="w-12 h-12 text-destructive-foreground mb-4" />
        <p className="text-xl text-destructive-foreground">A Squall has Hit!</p>
        <p className="text-destructive-foreground/80 mt-2">{errorMessage}</p>
        <Button onClick={() => window.location.reload()} className="mt-4" variant="destructive">
            <RefreshCw className="mr-2 h-4 w-4" /> Try Again
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
                <p className="text-lg text-foreground/80">A new voyage of {QUESTIONS_PER_GAME} questions awaits. Test your knowledge of river lore and earn your place on the leaderboard!</p>
                <Button onClick={initializeGame} className="w-full mt-6 bg-primary hover:bg-primary/90">
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
          <p className="text-2xl">Your haul this game: <span className="font-bold text-accent">{currentScore.toLocaleString()}</span> gold coins!</p>
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
            <Button onClick={initializeGame} className="bg-accent text-accent-foreground hover:bg-accent/80">
                <RefreshCw className="mr-2 h-4 w-4" /> Set Sail Again!
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!currentQuestion) {
    return (
        <div className="flex items-center justify-center min-h-[300px] bg-card/80 backdrop-blur-sm rounded-lg shadow-md">
            <Loader2 className="w-12 h-12 animate-spin text-primary" />
            <p className="ml-4 text-xl">Summoning Questions...</p>
        </div>
    );
  }
  
  const progressPercentage = ((currentQuestionIndex) / totalQuestions) * 100;
  const totalUserScore = (user?.score || 0) + currentScore;

  return (
    <div className="space-y-8">
      <Card className="bg-card/80 backdrop-blur-sm shadow-md p-4">
        <div className="flex justify-between items-center mb-2">
            <p className="text-lg font-semibold text-primary">Total Gold: <span className="text-accent">{totalUserScore.toLocaleString()}</span></p>
            <p className="text-sm text-muted-foreground">Question {currentQuestionIndex + 1} of {totalQuestions}</p>
        </div>
        <Progress value={progressPercentage} className="w-full h-3 [&>div]:bg-accent" />
        <p className="text-xs text-muted-foreground italic mt-2 text-center">
            Earn 10 gold for each right answer, lose 5 for wrong ones. Rack up gold to <Link href="/leaderboard" className="underline hover:text-accent">rise in rank!</Link>
        </p>
      </Card>

      <div className="w-full max-w-2xl mx-auto min-h-[300px] flex justify-center items-center">
        {gameState === 'PLAYING' && (
          <QuestionCard
            question={currentQuestion}
            onAnswerSubmit={handleAnswerSubmit}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={totalQuestions}
          />
        )}
        {gameState === 'RESULT' && (
          isAiLoreEnabled ? (
            <>
              {isAiLoading && (
                <div className="animate-fadeIn space-y-4 flex flex-col justify-center items-center text-center h-full">
                  <Loader2 className="w-12 h-12 text-primary mx-auto animate-spin" />
                  <p className="text-lg font-semibold text-primary font-headline">{loadingMessage.current}</p>
                </div>
              )}
              {pirateResponse && !isAiLoading && (
                <HintDisplay
                    script={pirateResponse.script}
                    isAudioLoading={isAudioLoading}
                    pirateAudioUri={pirateAudioUri}
                    onProceed={handleProceedToNext}
                    isLastQuestion={currentQuestionIndex >= totalQuestions - 1}
                />
              )}
            </>
          ) : (
             pirateResponse && <SimpleHintDisplay 
              script={pirateResponse.script}
              isCorrect={lastAnswerCorrect}
              correctAnswer={currentQuestion.answer}
              onProceed={handleProceedToNext}
              isLastQuestion={currentQuestionIndex >= totalQuestions - 1}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={totalQuestions}
            />
          )
        )}
      </div>
    </div>
  );
}

    

    