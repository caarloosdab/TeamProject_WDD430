import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export type SessionPayload = {
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  exp: number;
};

const SESSION_COOKIE = "hc_session";

const demoUser = {
  email: process.env.DEMO_USER_EMAIL || "maker@testmail.com",
  password: process.env.DEMO_USER_PASSWORD || "craftyPass123!",
  firstName: process.env.DEMO_USER_FIRST_NAME || "Ava",
  lastName: process.env.DEMO_USER_LAST_NAME || "Stone",
  role: "member",
};

const authSecret = process.env.AUTH_SECRET || "dev-secret-key";

function signPayload(payload: SessionPayload): string {
  const payloadString = JSON.stringify(payload);
  const signature = createHmac("sha256", authSecret).update(payloadString).digest("hex");
  const token = Buffer.from(payloadString).toString("base64url");
  const signed = `${token}.${signature}`;
  return signed;
}

export function verifyToken(token?: string): SessionPayload | null {
  if (!token) return null;
  const [encodedPayload, signature] = token.split(".");
  if (!encodedPayload || !signature) return null;

  try {
    const payloadString = Buffer.from(encodedPayload, "base64url").toString("utf8");
    const expectedSignature = createHmac("sha256", authSecret).update(payloadString).digest("hex");
    const providedSignature = Buffer.from(signature, "utf8");
    const expectedBuffer = Buffer.from(expectedSignature, "utf8");

    if (providedSignature.length !== expectedBuffer.length || !timingSafeEqual(providedSignature, expectedBuffer)) {
      return null;
    }

    const payload = JSON.parse(payloadString) as SessionPayload;
    if (Date.now() > payload.exp) return null;
    return payload;
  } catch (error) {
    console.error("Failed to verify token", error);
    return null;
  }
}

export async function authenticateUser(email: string, password: string) {
  const isValid = email.trim().toLowerCase() === demoUser.email.toLowerCase() && password === demoUser.password;
  if (!isValid) return null;

  const payload: SessionPayload = {
    email: demoUser.email,
    firstName: demoUser.firstName,
    lastName: demoUser.lastName,
    role: demoUser.role,
    exp: Date.now() + 1000 * 60 * 60 * 24 * 7, // 7 days
  };

  const token = signPayload(payload);
  return { token, payload };
}

export async function createSessionCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  const payload = verifyToken(token);
  return payload;
}