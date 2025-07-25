
'use server';

import { cachePirateScriptForQuestion } from '@/services/triviaService';

/**
 * A server action to cache a generated pirate script for a trivia question.
 * @param questionId The ID of the question to update.
 * @param script The script to cache.
 * @returns An object with success status and an optional message.
 */
export async function cacheHintAction(
  questionId: string,
  script: string
): Promise<{ success: boolean; message?: string }> {
  if (!questionId || !script) {
    return { success: false, message: 'Invalid question ID or script.' };
  }

  try {
    await cachePirateScriptForQuestion(questionId, script);
    return { success: true };
  } catch (error: any) {
    // The underlying service already logs the error.
    // We return a failure message but don't re-throw.
    return { success: false, message: `Failed to cache hint: ${error.message}` };
  }
}
