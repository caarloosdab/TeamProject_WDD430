import Link from "next/link";

const heroHighlights = [
  "Curated collections from independent makers",
  "Sustainably sourced and thoughtfully packaged",
  "Secure checkout and community-driven reviews",
];

const categories = [
  { title: "Jewelry", description: "Hand-forged pieces with heart." },
  { title: "Home Decor", description: "Warm, earthy accents for every room." },
  { title: "Art & Prints", description: "Gallery-worthy originals and prints." },
  { title: "Textiles", description: "Soft throws, quilts, and woven goods." },
  { title: "Ceramics", description: "Small-batch pottery for daily rituals." },
  { title: "Candles", description: "Aromatic blends poured by artisans." },
];

const featuredProducts = [
  {
    name: "Hand-thrown Ceramic Mug",
    price: "$32.00",
    rating: "★★★★☆",
    reviews: 23,
    tag: "New kiln batch",
  },
  {
    name: "Embroidered Wall Hanging",
    price: "$58.00",
    rating: "★★★★★",
    reviews: 12,
    tag: "Limited run",
  },
  {
    name: "Handwoven Throw Blanket",
    price: "$85.00",
    rating: "★★★★☆",
    reviews: 9,
    tag: "Winter drop",
  },
  {
    name: "Woodland Soy Candle Trio",
    price: "$42.00",
    rating: "★★★★★",
    reviews: 31,
    tag: "Best seller",
  },
];

const featuredSellers = [
  {
    name: "Clay & Co.",
    blurb: "Small-batch ceramics inspired by canyon landscapes.",
    specialty: "Ceramics",
  },
  {
    name: "Threaded Stories",
    blurb: "Textile art that tells a story in every stitch.",
    specialty: "Textiles",
  },
  {
    name: "Willow & Wick",
    blurb: "Clean-burning soy candles with botanical scents.",
    specialty: "Candles",
  },
];

const guarantees = [
  {
    title: "Verified makers",
    copy: "Every featured seller is vetted for quality, responsible sourcing, and consistent craftsmanship.",
  },
  {
    title: "Planet-friendly shipping",
    copy: "Recyclable packaging, carbon-aware routes, and batch fulfillment keep deliveries sustainable.",
  },
  {
    title: "Community-first policies",
    copy: "Fair pay to artisans, transparent reviews, and responsive support keep our marketplace trustworthy.",
  },
];

const seoHighlights = [
  "Handcrafted marketplace connecting buyers with independent artisans.",
  "Sustainable, small-batch goods with transparent sourcing details.",
  "Easy discovery of trending categories, sellers, and curated drops.",
];

export default function HomePage() {
  return (
    <main className="home-page">
      {/* Hero */}
      <section className="hero">
        <div className="hero-text">
          <div className="eyebrow">Handcrafted Haven</div>
          <h1>Discover pieces that feel personal and one-of-a-kind</h1>
          <p>
            Handcrafted Haven connects you with artisans who pour their heart into
            every piece. Shop intentionally, support local creators, and bring
            warmth into your home.
          </p>
          <div className="hero-actions">
            <Link href="/products" className="btn btn-primary">
              Browse Products
            </Link>
            <Link href="/sellers" className="btn btn-secondary">
              Meet the Artisans
            </Link>
          </div>
          <ul className="hero-highlights">
            {heroHighlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
         <div className="hero-visual">
          <div className="hero-image-card">
            <div className="hero-image-tag">Fresh from the studio</div>
            <div className="hero-image-stack">
              <div className="hero-swatch" aria-hidden />
              <div className="hero-swatch offset" aria-hidden />
            </div>
            <p className="hero-caption">Hand-painted stoneware in sand + terracotta.</p>
          </div>
          <div className="hero-stats">
            <div>
              <strong>1,200+</strong>
              <span>artisan-made products</span>
            </div>
            <div>
              <strong>320</strong>
              <span>independent sellers</span>
            </div>
            <div>
              <strong>4.9/5</strong>
              <span>community rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="section">
         <div className="section-header">
          <div>
            <p className="eyebrow">Shop</p>
            <h2>Shop by Category</h2>
            <p className="section-subtext">
              Explore curated collections crafted with intention and sustainable materials.
            </p>
          </div>
          <Link className="link" href="/products">
            View all products →
          </Link>
        </div>
        <div className="category-grid">
          {categories.map((category) => (
            <article key={category.title} className="category-card">
              <div>
                <h3>{category.title}</h3>
                <p>{category.description}</p>
              </div>
              <span className="pill">Trending</span>
            </article>
          ))}
        </div>
      </section>

      {/* Featured Products (placeholder data) */}
      <section className="section">
        <div className="section-header">
          <div>
            <p className="eyebrow">Just in</p>
            <h2>Featured Handcrafted Items</h2>
            <p className="section-subtext">
              New arrivals from makers we admire. Limited runs and small-batch drops.
            </p>
          </div>
          <Link className="link" href="/products">
            See the catalog →
          </Link>
        </div>
        <div className="product-grid">
          {featuredProducts.map((product) => (
            <article key={product.name} className="product-card">
              <div className="product-image" />
              <div className="product-meta">
                <span className="pill pill-secondary">{product.tag}</span>
                <h3>{product.name}</h3>
                <p className="price">{product.price}</p>
                <p className="rating">
                  {product.rating} ({product.reviews})
                </p>
              </div>
              <div className="product-footer">
                <button className="btn btn-tertiary">Quick view</button>
                <Link className="link" href="/products">
                  Details
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Featured Sellers */}
      <section className="section">
        <div className="section-header">
          <div>
            <p className="eyebrow">Makers</p>
            <h2>Featured Artisans</h2>
            <p className="section-subtext">
              Meet the creators behind our most-loved collections and learn their craft stories.
            </p>
          </div>
          <Link className="link" href="/sellers">
            All sellers →
          </Link>
        </div>
        <div className="seller-grid">
           {featuredSellers.map((seller) => (
            <article key={seller.name} className="seller-card">
              <div className="seller-avatar" aria-hidden />
              <div>
                <div className="seller-header">
                  <h3>{seller.name}</h3>
                  <span className="pill pill-secondary">{seller.specialty}</span>
                </div>
                <p>{seller.blurb}</p>
                <Link className="link" href="/sellers">
                  View profile
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <div>
            <p className="eyebrow">Assurance</p>
            <h2>What you can count on</h2>
            <p className="section-subtext">
              Policies crafted to protect artisans, delight shoppers, and keep every delivery planet-friendly.
            </p>
          </div>
          <Link className="link" href="/sellers">
            Explore trusted sellers →
          </Link>
        </div>
        <div className="card-grid">
          {guarantees.map((item) => (
            <article key={item.title} className="card">
              <h3>{item.title}</h3>
              <p className="muted">{item.copy}</p>
              <div className="badge-row">
                <span className="pill pill-secondary">Verified</span>
                <span className="pill">Sustainable</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <div>
            <p className="eyebrow">Search-friendly</p>
            <h2>Shareable story in every visit</h2>
            <p className="section-subtext">
              Crafted copy, descriptive alt text, and clear navigation help search engines — and people — find what they love.
            </p>
          </div>
        </div>
        <div className="card-grid">
          {seoHighlights.map((highlight) => (
            <article key={highlight} className="card">
              <p className="muted">{highlight}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
