
'use server';

import { getTriviaServiceStats } from "@/services/triviaService";

/**
 * A dedicated server action to get trivia service stats.
 * This isolates the server action from the core service logic.
 */
export async function getTriviaStatsAction() {
  return await getTriviaServiceStats();
}
