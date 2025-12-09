import Link from "next/link";
import { LoginForm } from "./LoginForm";

export default function LoginPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const redirectTo = typeof searchParams?.redirect === "string" ? searchParams.redirect : "/products";


  return (
    <main className="auth-shell">
      <div className="auth-header">
        <p className="eyebrow">Welcome back</p>
        <h1>Sign in to continue</h1>
        <p className="muted">
          Access your saved favorites, manage orders, and stay updated with the makers you follow.
          Authentication is now live — use the member credentials shared for testing.
        </p>
        <div className="inline-links">
          <span className="muted">New here?</span>
          <Link className="link" href="/auth/register">
            Create an account
          </Link>
        </div>
      </div>

      <div className="auth-grid">
        <section className="form-card">
          <LoginForm redirectTo={redirectTo} />
        </section>

        <aside className="guide-card">
          <h2>Quick access</h2>
          <ul className="step-list">
            <li>
              <h3>Track orders</h3>
              <p>View order history, shipping updates, and receipts in one place.</p>
            </li>
            <li>
              <h3>Manage favorites</h3>
              <p>Follow sellers, save wishlists, and get alerts when new drops go live.</p>
            </li>
            <li>
              <h3>List your work</h3>
              <p>
                Ready to sell? Create or finish your seller profile to showcase products once the
                store is connected.
              </p>
            </li>
          </ul>
          <div className="note-card">
            <p className="eyebrow">Need to set up shop?</p>
            <p className="muted">Jump into the seller flow to draft your storefront details now.</p>
            <Link className="btn btn-secondary btn-full" href="/sellers/create">
              Build seller profile
            </Link>
          </div>
        </aside>
      </div>
    </main>
  );
}