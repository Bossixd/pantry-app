import { NextRequest, NextResponse } from "next/server";
import { login, updateSession, getSession } from "./app/helpers/auth_functions";
import { useRouter } from "next/router";
import { auth } from "firebase-admin";

export async function middleware(request: NextRequest) {
    console.log("Middleware!");
    console.log(request.nextUrl.pathname);

    const authorized_paths = ["/auth/login", "/auth/signup"]
    if (authorized_paths.includes(request.nextUrl.pathname)) {
        return NextResponse.next();
    }

    const cookieExists = request.cookies.get("sessionInventoryManager")?.value;

    if (!cookieExists) {
        console.log("Redirect!");
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!_next|api/auth).*)(.+)"],
};
