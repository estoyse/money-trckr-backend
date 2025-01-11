import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { FIREBASE_PRIVATE_KEY, FIREBASE_PRIVATE_KEY_ID } from "./config.js";

// Initialize the Firebase Admin SDK
initializeApp({
  credential: cert({
    type: "service_account",
    project_id: "getitdone-gid",
    private_key_id: FIREBASE_PRIVATE_KEY_ID,
    private_key: FIREBASE_PRIVATE_KEY,
    client_email:
      "firebase-adminsdk-kr9gn@getitdone-gid.iam.gserviceaccount.com",
    client_id: "111783687006652674335",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url:
      "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-kr9gn%40getitdone-gid.iam.gserviceaccount.com",
    universe_domain: "googleapis.com",
  }),
});

// Get Firestore instance
export const firestore = getFirestore();
