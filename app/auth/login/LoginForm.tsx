"use client";

import { loginAction } from "@/app/actions/auth";
import { useActionState } from "react";

export function LoginForm({ redirectTo }: { redirectTo?: string }) {
  const [state, formAction, isPending] = useActionState(loginAction, { error: "" });

  return (
    <form className="form-grid" action={formAction} method="post">
      <input type="hidden" name="redirectTo" value={redirectTo || "/products"} />
      <div className="input-group">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          required
        />
      </div>
      <div className="input-group">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Enter your password"
          autoComplete="current-password"
          required
        />
      </div>
      {state?.error && (
        <p className="muted" role="alert">
          {state.error}
        </p>
      )}
      <div className="inline-links">
        <label className="checkbox">
          <input type="checkbox" name="remember" defaultChecked />
          <span>Keep me signed in on this device</span>
        </label>
        <span className="muted">Forgot password? Reach us via the contact form.</span>
      </div>
      <button type="submit" className="btn btn-primary btn-full" disabled={isPending}>
        {isPending ? "Signing in…" : "Sign in"}
      </button>
      <p className="muted small">Access is limited to registered members for now.</p>
    </form>
  );
}