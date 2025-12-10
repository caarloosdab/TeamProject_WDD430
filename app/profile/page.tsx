import Link from "next/link";

import { requireProfileOrRedirect } from "@/app/actions/products";

export default async function ProfilePage() {
  const session = await requireProfileOrRedirect();

  return (
    <main className="page-shell">
      <header className="page-header">
        <p className="eyebrow">Your profile</p>
        <h1>Welcome back, {session.firstName}</h1>
        <p className="muted">Update your account details, manage listings, and check recent activity.</p>
      </header>

      <section className="card">
        <h2>Account details</h2>
        <dl className="info-grid">
          <div>
            <dt>Email</dt>
            <dd>{session.email}</dd>
          </div>
          <div>
            <dt>Name</dt>
            <dd>
              {session.firstName} {session.lastName}
            </dd>
          </div>
          <div>
            <dt>Role</dt>
            <dd className="pill pill-secondary">{session.role}</dd>
          </div>
        </dl>
      </section>

      <section className="card">
        <h2>Quick links</h2>
        <div className="badge-row">
          <Link className="btn btn-primary" href="/products">
            View catalog
          </Link>
          <Link className="btn btn-secondary" href="/products#add">
            Add a product
          </Link>
        </div>
      </section>
    </main>
  );
}
