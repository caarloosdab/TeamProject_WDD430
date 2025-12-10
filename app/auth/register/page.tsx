import Link from "next/link";
import { redirect } from "next/navigation";

import { getSession } from "@/lib/auth";

const onboardingSteps = [
  {
    title: "Create your account",
    description: "Share who you are so we can tailor recommendations and alerts.",
  },
  {
    title: "Verify and personalize",
    description: "Add your preferences, shipping details, and notification settings.",
  },
  {
    title: "Start exploring",
    description: "Save favorite items, follow sellers, and build your wishlists.",
  },
];

export default async function RegisterPage() {
  const session = await getSession();
  if (session) {
    redirect("/profile");
  }
  return (
    <main className="auth-shell">
      <div className="auth-header">
        <p className="eyebrow">Join Handcrafted Haven</p>
        <h1>Create your account</h1>
        <p className="muted">
          Set up your profile to start discovering handcrafted pieces, follow your favorite makers,
          and track orders as you grow with our community.
        </p>
        <div className="inline-links">
          <span className="muted">Already have an account?</span>
          <Link className="link" href="/auth/login">
            Sign in
          </Link>
        </div>
      </div>

      <div className="auth-grid">
        <section className="form-card">
          <form className="form-grid" action="#" method="post">
            <div className="input-group">
              <label htmlFor="fullName">Full name</label>
              <input id="fullName" name="fullName" type="text" placeholder="Alex Rivera" required />
            </div>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="alex@email.com"
                autoComplete="email"
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="role">Join as</label>
              <select id="role" name="role" defaultValue="buyer">
                <option value="buyer">Buyer</option>
                <option value="seller">Seller</option>
                <option value="both">Buyer & Seller</option>
              </select>
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Minimum 8 characters"
                autoComplete="new-password"
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="confirmPassword">Confirm password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Repeat your password"
                autoComplete="new-password"
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="preferences">What do you love?</label>
              <textarea
                id="preferences"
                name="preferences"
                rows={3}
                placeholder="Tell us what you’re looking for: ceramics, textiles, wellness gifts…"
              />
            </div>
            <div className="checkbox-row">
              <label className="checkbox">
                <input type="checkbox" name="newsletter" defaultChecked />
                <span>Keep me updated on new drops and featured makers.</span>
              </label>
              <label className="checkbox">
                <input type="checkbox" name="terms" required />
                <span>
                  I agree to the community guidelines and understand authentication will be configured
                  later.
                </span>
              </label>
            </div>
            <button type="submit" className="btn btn-primary btn-full">
              Create account
            </button>
            <p className="muted small">No charges today — we’ll handle security and payments once authentication is ready.</p>
          </form>
        </section>

        <aside className="guide-card">
          <h2>What to expect next</h2>
          <ul className="step-list">
            {onboardingSteps.map((step) => (
              <li key={step.title}>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </li>
            ))}
          </ul>
          <div className="note-card">
            <p className="eyebrow">Seller ready?</p>
            <p className="muted">
              You can set up your storefront details right after registering. We’ll remind you when
              verification steps are available.
            </p>
            <Link className="btn btn-secondary btn-full" href="/sellers/create">
              Start seller profile
            </Link>
          </div>
        </aside>
      </div>
    </main>
  );
}