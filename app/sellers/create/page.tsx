import Link from "next/link";

const checklist = [
  "Brand story and hero imagery",
  "Policies for shipping, returns, and exchanges",
  "At least three sample listings or categories",
  "Social links and maker certifications",
];

export default function SellerCreatePage() {
  return (
    <main className="auth-shell">
      <div className="auth-header">
        <p className="eyebrow">Seller onboarding</p>
        <h1>Build your seller profile</h1>
        <p className="muted">
          Draft your storefront details so they’re ready when authentication and inventory are set up.
          We’ll save this structure to connect with the database later.
        </p>
        <div className="inline-links">
          <Link className="link" href="/auth/register">
            Create an account first
          </Link>
          <span className="muted">or</span>
          <Link className="link" href="/auth/login">
            Sign in to continue
          </Link>
        </div>
      </div>

      <div className="auth-grid">
        <section className="form-card">
          <form className="form-grid" action="#" method="post">
            <div className="input-group">
              <label htmlFor="shopName">Shop name</label>
              <input id="shopName" name="shopName" type="text" placeholder="Riverstone Studio" required />
            </div>
            <div className="input-group">
              <label htmlFor="tagline">Tagline</label>
              <input
                id="tagline"
                name="tagline"
                type="text"
                placeholder="Small-batch ceramics inspired by canyon light"
              />
            </div>
            <div className="input-group">
              <label htmlFor="location">Location</label>
              <input id="location" name="location" type="text" placeholder="Flagstaff, AZ" />
            </div>
            <div className="input-group">
              <label htmlFor="categories">Primary categories</label>
              <input
                id="categories"
                name="categories"
                type="text"
                placeholder="Ceramics, Tableware, Home Decor"
              />
            </div>
            <div className="input-group">
              <label htmlFor="story">About your craft</label>
              <textarea
                id="story"
                name="story"
                rows={4}
                placeholder="Share your process, materials, and inspiration to build trust with buyers."
              />
            </div>
            <div className="input-group">
              <label htmlFor="shipping">Shipping details</label>
              <textarea
                id="shipping"
                name="shipping"
                rows={3}
                placeholder="Turnaround time, carriers, eco-packaging, and regions you serve."
              />
            </div>
            <div className="input-group">
              <label htmlFor="returns">Returns & exchanges</label>
              <textarea
                id="returns"
                name="returns"
                rows={3}
                placeholder="Outline eligibility, timeframes, and how buyers can reach you."
              />
            </div>
            <div className="input-group">
              <label htmlFor="social">Social or portfolio links</label>
              <input id="social" name="social" type="url" placeholder="https://instagram.com/yourshop" />
            </div>
            <div className="checkbox-row">
              <label className="checkbox">
                <input type="checkbox" name="wholesale" />
                <span>I’m interested in wholesale inquiries.</span>
              </label>
              <label className="checkbox">
                <input type="checkbox" name="inPerson" />
                <span>I also sell at markets or pop-ups.</span>
              </label>
            </div>
            <button type="submit" className="btn btn-primary btn-full">Save profile draft</button>
            <p className="muted small">
              This form will connect to the database once the backend is ready. For now, it demonstrates
              the data we’ll collect to publish your storefront.
            </p>
          </form>
        </section>

        <aside className="guide-card">
          <h2>Quality checklist</h2>
          <ul className="step-list">
            {checklist.map((item) => (
              <li key={item}>
                <h3>{item}</h3>
                <p className="muted">Add details that help shoppers feel confident buying from you.</p>
              </li>
            ))}
          </ul>
          <div className="note-card">
            <p className="eyebrow">Need inspiration?</p>
            <p className="muted">
              Browse current sellers to see how they present their work and policies.
            </p>
            <Link className="btn btn-secondary btn-full" href="/sellers">
              View seller directory
            </Link>
          </div>
        </aside>
      </div>
    </main>
  );
}