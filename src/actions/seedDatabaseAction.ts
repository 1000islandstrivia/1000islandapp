
'use server';

import { seedDatabase } from '../../scripts/seed-firestore';

/**
 * A server action that triggers the Firestore database seeding process.
 * @returns A promise that resolves to an object with success status and a message.
 */
export async function runDatabaseSeed() {
  console.log("Server action 'runDatabaseSeed' triggered.");
  const result = await seedDatabase();
  console.log("Server action 'runDatabaseSeed' completed with status:", result.success);
  return result;
}
