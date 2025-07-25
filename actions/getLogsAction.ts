
'use server';

import { getLogs, type LogEntry } from '@/services/logService';

/**
 * Server action to retrieve the in-memory server logs.
 * Restricted to the admin user "Dan".
 */
export async function getLogsAction(username: string): Promise<LogEntry[]> {
  if (username.toLowerCase() !== 'dan') {
    console.warn(`Unauthorized attempt to fetch logs by user: ${username}`);
    return [{ timestamp: new Date().toISOString(), message: 'ERROR: Unauthorized access.' }];
  }
  
  return getLogs();
}
