"use server";

import { authenticateUser, clearSessionCookie, createSessionCookie } from "@/lib/auth";
import { redirect } from "next/navigation";

export type AuthState = {
  error?: string;
};

export async function loginAction(prevState: AuthState, formData: FormData): Promise<AuthState> {
  const email = String(formData.get("email") || "");
  const password = String(formData.get("password") || "");
  const redirectTo = String(formData.get("redirectTo") || "/products");

  const result = await authenticateUser(email, password);
  if (!result) {
    return { error: "Invalid email or password. Please try again." };
  }

  await createSessionCookie(result.token);
  redirect(redirectTo || "/products");
}

export async function logoutAction() {
  await clearSessionCookie();
  redirect("/");
}