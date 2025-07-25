
import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore, initializeFirestore, persistentLocalCache, memoryLocalCache } from "firebase/firestore";
import { firebaseConfig } from "./firebaseConfig";

let app: FirebaseApp;
let db: Firestore;
let persistenceEnabled: boolean | null = null;

if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

try {
  // Use initializeFirestore to configure the cache.
  // This function can be called multiple times, but the cache setting is only applied once.
  if (typeof window !== 'undefined') {
    // We are on the client, try to initialize with persistent cache
    db = initializeFirestore(app, {
      localCache: persistentLocalCache({})
    });
    persistenceEnabled = true;
    console.log("Firestore offline persistence configured.");
  } else {
    // We are on the server, get the default instance (which uses in-memory cache)
    db = getFirestore(app);
    persistenceEnabled = false;
  }
} catch (e: any) {
  // This might happen on the client if another tab has persistence enabled.
  if (e.code === 'failed-precondition') {
    console.warn("Firestore offline persistence failed: multiple tabs open. This is normal.");
    persistenceEnabled = false;
  } else if (e.code === 'unimplemented') {
    console.warn("Firestore offline persistence failed: browser does not support IndexedDB.");
    persistenceEnabled = false;
  }
  // Fallback to the default getFirestore() if initializeFirestore failed for other reasons
  db = getFirestore(app);
}

/**
 * A utility function to check if Firestore persistence is active.
 * This is useful for displaying a status in an admin dashboard.
 * @returns A promise that resolves to true if persistence is enabled, false otherwise.
 */
export async function isPersistenceEnabled(): Promise<boolean> {
  // This function now returns the status determined during initialization.
  // It avoids trying to re-initialize or guess the state.
  return persistenceEnabled === true;
}

export { app, db };
