
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import db from "@/lib/db";
import { COOKIE_NAME, verifyAdminToken } from "@/lib/admin-auth";

async function isAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  return verifyAdminToken(token);
}

export async function GET() {
  try {
    if (!(await isAdmin())) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const enquiries = db.prepare(`
      SELECT * FROM enquiries
      ORDER BY id DESC
    `).all();

    const stats = db.prepare(`
      SELECT
        COUNT(*) AS total,
        SUM(CASE WHEN status = 'New' THEN 1 ELSE 0 END) AS new,
        SUM(CASE WHEN status = 'In Progress' THEN 1 ELSE 0 END) AS inProgress,
        SUM(CASE WHEN status = 'Resolved' THEN 1 ELSE 0 END) AS resolved
      FROM enquiries
    `).get() as {
      total: number;
      new: number | null;
      inProgress: number | null;
      resolved: number | null;
    };

    return NextResponse.json({
      enquiries,
      stats: {
        total: stats.total,
        new: stats.new ?? 0,
        inProgress: stats.inProgress ?? 0,
        resolved: stats.resolved ?? 0,
      },
    }, {
      headers: { "Cache-Control": "no-store" }
    });
  } catch (error) {
    console.error("Admin enquiries GET error:", error);
    return NextResponse.json(
      { error: "Unable to load enquiries." },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    if (request.headers.get("origin") !== request.nextUrl.origin) {
      return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
    }

    if (!(await isAdmin())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const id = Number(body.id);
    const status = String(body.status ?? "");

    if (!Number.isSafeInteger(id) || id < 1 ||
      !["New", "In Progress", "Resolved"].includes(status)) {
      return NextResponse.json({ error: "Invalid enquiry update" }, { status: 400 });
    }

    const result = db.prepare(
      "UPDATE enquiries SET status = ? WHERE id = ?"
    ).run(status, id);

    if (result.changes === 0) {
      return NextResponse.json({ error: "Enquiry not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin enquiries PATCH error:", error);
    return NextResponse.json({ error: "Unable to update enquiry" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    if (request.headers.get("origin") !== request.nextUrl.origin) {
      return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
    }

    if (!(await isAdmin())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const id = Number(body.id);

    if (!Number.isSafeInteger(id) || id < 1) {
      return NextResponse.json({ error: "Invalid enquiry ID" }, { status: 400 });
    }

    const result = db.prepare(
      "DELETE FROM enquiries WHERE id = ?"
    ).run(id);

    if (result.changes === 0) {
      return NextResponse.json({ error: "Enquiry not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin enquiries DELETE error:", error);
    return NextResponse.json({ error: "Unable to delete enquiry" }, { status: 500 });
  }
}
