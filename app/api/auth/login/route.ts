// "use client";

import validate from "./helper"

export async function POST(request: Request) {
    const { username, password } = await request.json();
    const out = await validate(username, password);
    return out;
}
