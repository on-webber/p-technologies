
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  COOKIE_NAME,
  SESSION_DURATION,
  createAdminToken,
  verifyPassword,
} from "@/lib/admin-auth";

export async function POST(request: NextRequest) {
  try {
    if (request.headers.get("origin") !== request.nextUrl.origin) {
      return NextResponse.json(
        { error: "Invalid request origin." },
        { status: 403 }
      );
    }

    const body = await request.json();
    const password = String(body.password ?? "");

    if (!verifyPassword(password)) {
      return NextResponse.json(
        { error: "Incorrect admin password." },
        { status: 401 }
      );
    }

    const token = createAdminToken();
    const cookieStore = await cookies();

    cookieStore.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: SESSION_DURATION / 1000,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Unable to log in." },
      { status: 500 }
    );
  }
}
