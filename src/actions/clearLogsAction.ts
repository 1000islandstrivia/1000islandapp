
'use server';

import { clearLogs } from '@/services/logService';

/**
 * Server action to clear the in-memory server logs.
 * Restricted to the admin user "Dan".
 */
export async function clearLogsAction(username: string): Promise<{ success: boolean }> {
  if (username.toLowerCase() !== 'dan') {
    console.warn(`Unauthorized attempt to clear logs by user: ${username}`);
    return { success: false };
  }
  
  clearLogs();
  return { success: true };
}
