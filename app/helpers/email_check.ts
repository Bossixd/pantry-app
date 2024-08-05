"use server";

export default async function checkEmail(email: string) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}
