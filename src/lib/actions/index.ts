"use server";

import { auth } from "@clerk/nextjs/server";
import { adminDb } from "../firebase-admin";

export const createNewDoc = async () => {
  auth().protect();

  const { sessionClaims } = await auth();

  const docCollectionRef = adminDb.collection("documents");
  const docRef = await docCollectionRef.add({
    title: "New Doc Title",
  });

  await adminDb
    .collection("users")
    .doc(sessionClaims?.email!)
    .collection("rooms")
    .doc(docRef.id)
    .set({
      userId: sessionClaims?.email!,
      role: "owner",
      createdAt: new Date(),
      roomdId: docRef.id,
    });

  return { docId: docRef.id };
};
