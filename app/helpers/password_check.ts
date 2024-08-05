"use server";

import { compare } from "bcrypt";

export default async function passwordCheck(
    userPassword: string,
    storedPassword: string
) {
    var result = false;
    compare(userPassword, storedPassword, (err, result) => {
        if (err) {
            // Handle error
            console.error("Error comparing passwords:", err);
            result = false;
            return;
        }

        if (result) {
            // Passwords match, authentication successful
            result = true;
            return;
        }
        // Passwords don't match, authentication failed
        result = false;
        return;
    });
    return result;
}
