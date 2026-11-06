
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import db from "@/lib/db";
import {
  COOKIE_NAME,
  verifyAdminToken,
} from "@/lib/admin-auth";

const allowedStatuses = ["New", "In Progress", "Resolved"];

async function isAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  return verifyAdminToken(token);
}

function originIsValid(request: NextRequest) {
  return request.headers.get("origin") === request.nextUrl.origin;
}

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json(
      { error: "Unauthorized." },
      { status: 401 }
    );
  }

  const enquiries = db.prepare(`
    SELECT id, name, email, organisation, category,
           message, status, created_at
    FROM enquiries
    ORDER BY id DESC
  `).all();

  const stats = db.prepare(`
    SELECT
      COUNT(*) AS total,
      SUM(CASE WHEN status = 'New' THEN 1 ELSE 0 END) AS new,
      SUM(CASE WHEN status = 'In Progress' THEN 1 ELSE 0 END) AS inProgress,
      SUM(CASE WHEN status = 'Resolved' THEN 1 ELSE 0 END) AS resolved
    FROM enquiries
  `).get();

  return NextResponse.json(
    { enquiries, stats },
    { headers: { "Cache-Control": "no-store" } }
  );
}

export async function PATCH(request: NextRequest) {
  if (!originIsValid(request)) {
    return NextResponse.json(
      { error: "Invalid request origin." },
      { status: 403 }
    );
  }

  if (!(await isAdmin())) {
    return NextResponse.json(
      { error: "Unauthorized." },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const id = Number(body.id);
    const status = String(body.status ?? "");

    if (!Number.isSafeInteger(id) || id <= 0 ||
        !allowedStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Invalid enquiry or status." },
        { status: 400 }
      );
    }

    const result = db.prepare(`
      UPDATE enquiries SET status = ? WHERE id = ?
    `).run(status, id);

    if (result.changes === 0) {
      return NextResponse.json(
        { error: "Enquiry not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Unable to update enquiry." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  if (!originIsValid(request)) {
    return NextResponse.json(
      { error: "Invalid request origin." },
      { status: 403 }
    );
  }

  if (!(await isAdmin())) {
    return NextResponse.json(
      { error: "Unauthorized." },
      { status: 401 }
    );
  }

  const id = Number(request.nextUrl.searchParams.get("id"));

  if (!Number.isSafeInteger(id) || id <= 0) {
    return NextResponse.json(
      { error: "Invalid enquiry ID." },
      { status: 400 }
    );
  }

  const result = db.prepare(
    "DELETE FROM enquiries WHERE id = ?"
  ).run(id);

  if (result.changes === 0) {
    return NextResponse.json(
      { error: "Enquiry not found." },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true });
}
