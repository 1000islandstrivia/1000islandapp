
import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore, initializeFirestore, persistentLocalCache, memoryLocalCache } from "firebase/firestore";
import { firebaseConfig } from "./firebaseConfig";

let app: FirebaseApp;
let db: Firestore;
let persistenceEnabled: boolean | null = null;

// Initialize Firebase App
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

// Initialize Firestore
// This single initialization handles both server and client environments.
try {
    if (typeof window !== 'undefined') {
        // We are on the client, try to initialize with persistent cache
        db = initializeFirestore(app, {
          localCache: persistentLocalCache({})
        });
        persistenceEnabled = true;
        console.log("Firestore offline persistence configured.");
    } else {
        // We are on the server, initialize with in-memory cache
        db = initializeFirestore(app, {
          localCache: memoryLocalCache({})
        });
        persistenceEnabled = false;
    }
} catch (e: any) {
    // This might happen on the client if another tab has persistence.
    // In that case, Firestore falls back to memory cache automatically.
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
  if (persistenceEnabled === null) {
    // If it's still null, it means initialization hasn't completed or something went wrong.
    // We can try a quick check here, but it's a fallback.
    try {
        await initializeFirestore(app, { localCache: persistentLocalCache({}) });
        return true;
    } catch {
        return false;
    }
  }
  return persistenceEnabled;
}


export { app, db };
