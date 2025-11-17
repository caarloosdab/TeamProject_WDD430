export default function HomePage() {
  return (
    <main className="home-page">
      {/* Hero */}
      <section className="hero">
        <div className="hero-text">
          <h1>Discover Handcrafted Treasures</h1>
          <p>
            Handcrafted Haven connects you with artisans who pour their heart into
            every unique piece. Support local creators and find something truly one-of-a-kind.
          </p>
          <div className="hero-actions">
            <a href="/products" className="btn btn-primary">
              Browse Products
            </a>
            <a href="/sellers" className="btn btn-secondary">
              Meet the Artisans
            </a>
          </div>
        </div>
        <div className="hero-image">
          {/* Placeholder: later use real images */}
          <div className="hero-placeholder-card">Handmade ceramics</div>
          <div className="hero-placeholder-card offset">Textile art</div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="section">
        <h2>Shop by Category</h2>
        <div className="category-grid">
          <article className="category-card">Jewelry</article>
          <article className="category-card">Home Decor</article>
          <article className="category-card">Art &amp; Prints</article>
          <article className="category-card">Textiles</article>
        </div>
      </section>

      {/* Featured Products (placeholder data) */}
      <section className="section">
        <h2>Featured Handcrafted Items</h2>
        <div className="product-grid">
          <article className="product-card">
            <div className="product-image" />
            <h3>Hand-thrown Ceramic Mug</h3>
            <p className="price">$32.00</p>
            <p className="rating">★★★★☆ (23)</p>
          </article>
          <article className="product-card">
            <div className="product-image" />
            <h3>Embroidered Wall Hanging</h3>
            <p className="price">$58.00</p>
            <p className="rating">★★★★★ (12)</p>
          </article>
          <article className="product-card">
            <div className="product-image" />
            <h3>Handwoven Throw Blanket</h3>
            <p className="price">$85.00</p>
            <p className="rating">★★★★☆ (9)</p>
          </article>
        </div>
      </section>

      {/* Featured Sellers */}
      <section className="section">
        <h2>Featured Artisans</h2>
        <div className="seller-grid">
          <article className="seller-card">
            <div className="seller-avatar" />
            <div>
              <h3>Clay &amp; Co.</h3>
              <p>Small-batch ceramics inspired by nature.</p>
            </div>
          </article>
          <article className="seller-card">
            <div className="seller-avatar" />
            <div>
              <h3>Threaded Stories</h3>
              <p>Textile art that tells a story in every stitch.</p>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
