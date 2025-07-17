
'use server';

import { clearTriviaServerCache } from "@/services/triviaService";

/**
 * A dedicated server action to clear the trivia service cache.
 * This isolates the server action from the core service logic.
 */
export async function clearTriviaCacheAction() {
  return await clearTriviaServerCache();
}
