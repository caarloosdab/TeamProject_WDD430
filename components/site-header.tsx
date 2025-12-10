import Link from "next/link";
import { logoutAction } from "@/app/actions/auth";
import { getSession } from "@/lib/auth";

export async function SiteHeader() {
  const session = await getSession();

  return (
    <header className="site-header">
      <div className="site-header__brand">
        <Link href="/">
          <span className="brand-mark" aria-hidden />
          <span className="brand-name">Handcrafted Haven</span>
        </Link>
      </div>
      <nav className="site-header__nav" aria-label="Primary">
        <Link href="/products">Products</Link>
        <Link href="/sellers">Sellers</Link>
        {session ? <Link href="/profile">Profile</Link> : <Link href="/auth/register">Join</Link>}
      </nav>
      <div className="site-header__actions">
        {session ? (
          <div className="user-chip" title={`Signed in as ${session.email}`}>
            <span className="pill">{session.role}</span>
            <span className="user-name">{session.firstName} {session.lastName}</span>
            <form action={logoutAction}>
              <button className="btn btn-tertiary" type="submit">
                Sign out
              </button>
            </form>
          </div>
        ) : (
          <div className="cta-row">
            <Link className="btn btn-secondary" href="/auth/login">
              Sign in
            </Link>
            <Link className="btn btn-primary" href="/auth/register">
              Create account
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}