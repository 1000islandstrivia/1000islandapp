
/**
 * @fileOverview A simple in-memory, server-side logging service for debugging.
 * NOTE: This is NOT for production use. Logs are stored in a simple array
 * and will be cleared on server restart.
 */

export interface LogEntry {
  timestamp: string;
  message: string;
}

// In-memory log store
let serverLogs: LogEntry[] = [];
const MAX_LOG_ENTRIES = 100;

/**
 * Adds a new log entry to the in-memory store.
 * @param message The log message string.
 */
export function addLog(message: string): void {
  const newLog: LogEntry = {
    timestamp: new Date().toISOString(),
    message: message,
  };
  
  // Add the new log to the beginning of the array
  serverLogs.unshift(newLog);

  // Trim the array to prevent it from growing indefinitely
  if (serverLogs.length > MAX_LOG_ENTRIES) {
    serverLogs = serverLogs.slice(0, MAX_LOG_ENTRIES);
  }
}

/**
 * Retrieves all current log entries.
 * @returns An array of LogEntry objects.
 */
export function getLogs(): LogEntry[] {
  return [...serverLogs];
}

/**
 * Clears all log entries from the in-memory store.
 */
export function clearLogs(): void {
  addLog('Log buffer cleared by admin.');
  // Keep the clear message but remove others
  serverLogs = serverLogs.slice(0, 1);
}
