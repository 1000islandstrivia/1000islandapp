
'use server';

import { addTriviaQuestion } from '@/services/triviaService';
import type { TriviaQuestion } from '@/lib/trivia-data';
import * as z from 'zod';

const formSchema = z.object({
  question: z.string(),
  option1: z.string(),
  option2: z.string(),
  option3: z.string(),
  option4: z.string(),
  answer: z.string(),
  storylineHintKey: z.string(),
  fallbackHint: z.string(),
});

export type AddQuestionFormValues = z.infer<typeof formSchema>;

/**
 * A server action to add a new trivia question to the database.
 * Restricted to the admin user "Dan".
 * @param values The form data for the new question.
 * @param username The username of the user attempting the action.
 * @returns An object with success status and a message or question ID.
 */
export async function addQuestionAction(
  values: AddQuestionFormValues,
  username: string
): Promise<{ success: boolean; message?: string; questionId?: string }> {
  // Security check: Only allow admin user to add questions.
  if (username.toLowerCase() !== 'dan') {
    return { success: false, message: 'Permission denied. You are not authorized.' };
  }

  const newQuestion: Omit<TriviaQuestion, 'id'> = {
    question: values.question,
    options: [values.option1, values.option2, values.option3, values.option4],
    answer: values.answer,
    storylineHintKey: values.storylineHintKey,
    fallbackHint: values.fallbackHint,
  };

  try {
    const newQuestionId = await addTriviaQuestion(newQuestion);
    return { success: true, questionId: newQuestionId };
  } catch (error: any) {
    return { success: false, message: `Failed to add question: ${error.message}` };
  }
}
