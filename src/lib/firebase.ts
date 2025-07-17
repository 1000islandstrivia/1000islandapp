import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore, enableIndexedDbPersistence } from "firebase/firestore";
import { firebaseConfig } from "./firebaseConfig";

let app: FirebaseApp;
let db: Firestore;

if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  // Enable Firestore offline persistence
  enableIndexedDbPersistence(db).catch((err) => {
    if (err.code === 'failed-precondition') {
      console.warn("Firestore persistence failed: can only be enabled in one tab at a time.");
    } else if (err.code === 'unimplemented') {
      console.warn("Firestore persistence failed: browser does not support all of the required features.");
    }
  });
} else {
  app = getApps()[0];
  db = getFirestore(app);
}

export { app, db };
