
import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore, enableIndexedDbPersistence, initializeFirestore, persistentLocalCache } from "firebase/firestore";
import { firebaseConfig } from "./firebaseConfig";

let app: FirebaseApp;
let db: Firestore;

if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
  // Check if we are in a browser environment before enabling persistence
  if (typeof window !== 'undefined') {
    db = initializeFirestore(app, {
      localCache: persistentLocalCache({}),
    });
    console.log("Firestore offline persistence enabled.");
  } else {
    // For server-side rendering, initialize without persistence
    db = getFirestore(app);
  }
} else {
  app = getApps()[0];
  // Re-use existing db instance
  db = getFirestore(app);
}

export { app, db };
