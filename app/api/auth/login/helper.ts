"use server"

import {
    collection,
    doc,
    getDocs,
    query,
    setDoc,
    deleteDoc,
    getDoc,
    addDoc,
    Firestore,
} from "firebase/firestore";
import { db } from "@/firebase";

import { NextResponse } from "next/server";

import passwordCheck from "@/app/helpers/password_check";
import { login } from "@/app/helpers/auth_functions";

export default async function validate(username: string, password: string) {
    const docRef = doc(db, "users", username);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists())
        return NextResponse.json({
            success: false,
            reason: "User does not exist!",
        });

    const storedPassword = docSnap.get("password");
    if (await passwordCheck(password, storedPassword)) {
        console.log("Here??");
        return NextResponse.json({
            success: false,
            reason: "Password is Incorrect!",
        });
    }

    await login(username, password);
    return NextResponse.json({
        success: true,
    });
}