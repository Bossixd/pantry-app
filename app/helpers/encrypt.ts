"use server";

import bcrypt from "bcrypt";

const saltRounds = 10;

export default async function encrypt(password: string): Promise<string> {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (error) {
        throw new Error("Error encrypting password");
    }
};
