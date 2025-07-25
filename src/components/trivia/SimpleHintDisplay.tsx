
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

interface SimpleHintDisplayProps {
  script: string;
  isCorrect: boolean;
  correctAnswer: string;
  onProceed: () => void;
  isLastQuestion: boolean;
  questionNumber: number;
  totalQuestions: number;
}

export default function SimpleHintDisplay({ script, isCorrect, correctAnswer, onProceed, isLastQuestion, questionNumber, totalQuestions }: SimpleHintDisplayProps) {
  return (
    <div className="w-full flex flex-col items-center animate-fadeIn">
      <Card className="bg-secondary/30 p-4 w-full">
        <CardHeader className="pt-2 pb-2 text-center">
            <CardDescription>
                Question {questionNumber} of {totalQuestions}
            </CardDescription>
          <CardTitle className={isCorrect ? "text-green-600" : "text-destructive"}>
            {isCorrect ? 'Correct!' : 'Incorrect!'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-2 text-center">
          {!isCorrect && (
            <p className="text-secondary-foreground">
              The correct answer was: <span className="font-bold">{correctAnswer}</span>
            </p>
          )}
          <p className="text-secondary-foreground/90 italic">
            "{script}"
          </p>
        </CardContent>
      </Card>
      <Button onClick={onProceed} className="w-full max-w-sm mx-auto mt-6 bg-primary hover:bg-primary/90 text-primary-foreground">
        {isLastQuestion ? 'Finish Voyage!' : 'Next Question, Arr!'}
        <ChevronRight className="ml-2 h-5 w-5" />
      </Button>
    </div>
  );
}
