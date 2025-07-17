
import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore, initializeFirestore, persistentLocalCache } from "firebase/firestore";
import { firebaseConfig } from "./firebaseConfig";

let app: FirebaseApp;
let db: Firestore;

if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

// Check if we're in the browser to initialize Firestore with persistence
if (typeof window !== 'undefined') {
  try {
    db = initializeFirestore(app, {
      localCache: persistentLocalCache({})
    });
    console.log("Firestore offline persistence enabled.");
  } catch (e: any) {
    if (e.code === 'failed-precondition') {
      console.warn("Firestore offline persistence failed: multiple tabs open. This is normal.");
    } else if (e.code === 'unimplemented') {
      console.warn("Firestore offline persistence failed: browser does not support IndexedDB.");
    }
    // Fallback to in-memory persistence if offline fails
    db = getFirestore(app);
  }
} else {
  // For server-side rendering, initialize without persistence
  db = getFirestore(app);
}

export { app, db };
