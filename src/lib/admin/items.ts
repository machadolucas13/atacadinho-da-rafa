import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc, serverTimestamp, deleteDoc } from "firebase/firestore";

export async function getDocumentById(collectionName: string, id: string) {
  const ref = doc(db, collectionName, id);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() };
}


export async function updateDocument(collectionName: string, id: string, data: Record<string, any>) {
  const ref = doc(db, collectionName, id);
  await updateDoc(ref, {
    ...data,
    atualizadoEm: serverTimestamp(),
  });
}


export async function deleteDocument(collectionName: string, id: string) {
  const ref = doc(db, collectionName, id);
  await deleteDoc(ref);
}

