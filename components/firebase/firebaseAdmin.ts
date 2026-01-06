"use server";
import admin from "firebase-admin";

interface firebaseAdminAppParams {
  projectId: string;
  clientEmail: string;
  privateKey: string;
}
function formatPrivateKey(privateKey: string): string {
  return privateKey.replace(/\\n/g, '\n');
}
export default async function createFirebaseAdminApp(params: firebaseAdminAppParams) {
  const formattedPrivateKey = formatPrivateKey(params.privateKey);

  if(admin.apps.length > 0) {
    return admin.app();
  }
  const cert = admin.credential.cert({
    projectId: params.projectId,
    clientEmail: params.clientEmail,
    privateKey: formattedPrivateKey,
  });
  return admin.initializeApp({
    credential: cert,
    projectId: params.projectId,
  });
}
export async function initAdmin() {
  const params = {
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID as string,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL as string,
    privateKey: process.env.FIREBASE_PRIVATE_KEY as string,
  }
  return createFirebaseAdminApp(params);
}