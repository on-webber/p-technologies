
import { createHmac, timingSafeEqual } from "node:crypto";

const COOKIE_NAME = "ptech_admin_session";
const SESSION_DURATION = 8 * 60 * 60 * 1000;

export { COOKIE_NAME, SESSION_DURATION };

function sign(value: string) {
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET is not configured.");
  }

  return createHmac("sha256", secret)
    .update(value)
    .digest("base64url");
}

export function verifyPassword(password: string) {
  const expected = process.env.ADMIN_PASSWORD;

  if (!expected) {
    throw new Error("ADMIN_PASSWORD is not configured.");
  }

  const actualBuffer = Buffer.from(password);
  const expectedBuffer = Buffer.from(expected);

  return (
    actualBuffer.length === expectedBuffer.length &&
    timingSafeEqual(actualBuffer, expectedBuffer)
  );
}

export function createAdminToken() {
  const expires = Date.now() + SESSION_DURATION;
  const payload = String(expires);

  return `${payload}.${sign(payload)}`;
}

export function verifyAdminToken(token: string | undefined) {
  if (!token) return false;

  const parts = token.split(".");
  if (parts.length !== 2) return false;

  const [payload, signature] = parts;
  const expires = Number(payload);

  if (!Number.isFinite(expires) || expires <= Date.now()) {
    return false;
  }

  const expectedSignature = sign(payload);
  const actual = Buffer.from(signature);
  const expected = Buffer.from(expectedSignature);

  return (
    actual.length === expected.length &&
    timingSafeEqual(actual, expected)
  );
}
