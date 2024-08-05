// "use server";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import nextConfig from "@/next.config.mjs";

const firebaseConfig = {
    apiKey: nextConfig.API_KEY,
    authDomain: nextConfig.AUTH_DOMAIN,
    projectId: nextConfig.PROJECT_ID,
    storageBucket: nextConfig.STORAGE_BUCKET,
    messagingSenderId: nextConfig.MESSEGING_SENDER_ID,
    appId: nextConfig.APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
