import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="auth-shell">
      <div className="auth-header">
        <p className="eyebrow">Welcome back</p>
        <h1>Sign in to continue</h1>
        <p className="muted">
          Access your saved favorites, manage orders, and stay updated with the makers you follow.
          Authentication will be wired up soon — for now, explore the intended experience.
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
          <form className="form-grid" action="#" method="post">
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
            <div className="inline-links">
              <label className="checkbox">
                <input type="checkbox" name="remember" defaultChecked />
                <span>Keep me signed in on this device</span>
              </label>
              <Link className="link" href="#">
                Forgot password?
              </Link>
            </div>
            <button type="submit" className="btn btn-primary btn-full">
              Sign in
            </button>
            <p className="muted small">
              We’ll connect this form to the authentication provider once the backend is configured.
            </p>
          </form>
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