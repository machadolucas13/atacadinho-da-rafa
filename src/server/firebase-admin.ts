import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

if (!getApps().length) {
  const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (serviceAccount) {
    try {
      const credentials = JSON.parse(serviceAccount);
      initializeApp({
        credential: cert(credentials),
      });
    } catch (error) {
      console.error("Erro ao inicializar Firebase Admin com variável de ambiente:", error);
    }
  } else {
    try {
      initializeApp();
    } catch (error) {
      console.error("Erro ao inicializar Firebase Admin com Application Default Credentials:", error);
    }
  }
}

export const adminDb = getFirestore();
export const adminAuth = getAuth();
