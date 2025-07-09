"use client";

import type { TriviaQuestion } from '@/lib/trivia-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface QuestionCardProps {
  question: TriviaQuestion;
  onAnswerSubmit: (answer: string) => void;
  questionNumber: number;
  totalQuestions: number;
}

export default function QuestionCard({ question, onAnswerSubmit, questionNumber, totalQuestions }: QuestionCardProps) {
  const [selectedOption, setSelectedOption] = useState<string | undefined>(undefined);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedOption) {
      onAnswerSubmit(selectedOption);
      setSelectedOption(undefined); // Reset for next question
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl bg-card/90 backdrop-blur-sm animate-fadeIn">
      <CardHeader>
        <CardDescription className="text-sm text-accent font-semibold">
          Question {questionNumber} of {totalQuestions}
        </CardDescription>
        <CardTitle className="font-headline text-2xl md:text-3xl text-primary">{question.question}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <RadioGroup 
            value={selectedOption} 
            onValueChange={setSelectedOption}
            className="space-y-3 mb-6"
          >
            {question.options && question.options.map((option, index) => (
              <Label 
                key={index}
                htmlFor={`option-${index}`}
                className={cn(
                  "flex items-center p-4 rounded-lg border-2 border-border cursor-pointer transition-all duration-200 hover:border-primary hover:bg-primary/10",
                  selectedOption === option && "border-primary bg-primary/20 ring-2 ring-primary"
                )}
              >
                <RadioGroupItem value={option} id={`option-${index}`} className="mr-3 shrink-0" />
                <span className="text-base text-foreground/90">{option}</span>
              </Label>
            ))}
          </RadioGroup>
          <Button type="submit" disabled={!selectedOption} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
            Submit Answer
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
