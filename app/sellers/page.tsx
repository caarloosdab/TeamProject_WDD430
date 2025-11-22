import Link from "next/link";

const sellers = [
  {
    id: "clay-co",
    name: "Clay & Co.",
    specialty: "Ceramics",
    bio: "Small-batch stoneware inspired by canyon landscapes and desert light.",
    rating: "4.9",
    items: 42,
  },
  {
    id: "threaded-stories",
    name: "Threaded Stories",
    specialty: "Textiles",
    bio: "Handwoven throws and embroidered art that celebrate heirloom craftsmanship.",
    rating: "5.0",
    items: 33,
  },
  {
    id: "willow-wick",
    name: "Willow & Wick",
    specialty: "Candles",
    bio: "Clean-burning soy candles with botanically-inspired scent stories.",
    rating: "4.8",
    items: 28,
  },
  {
    id: "north-star-metals",
    name: "North Star Metals",
    specialty: "Jewelry",
    bio: "Hand-shaped sterling silver pieces with a minimalist finish.",
    rating: "4.9",
    items: 19,
  },
];

export default function SellersPage() {
  return (
    <main className="page-shell">
      <header className="page-header">
        <p className="eyebrow">Community</p>
        <h1>Meet the artisans</h1>
        <p>
          Explore seller profiles, learn their craft, and shop collections that honor sustainable
          practices and thoughtful design.
        </p>
      </header>

      <section className="card-grid">
        {sellers.map((seller) => (
          <article key={seller.id} className="card">
            <div className="seller-header">
              <div className="seller-avatar" aria-hidden />
              <div>
                <p className="eyebrow">{seller.specialty}</p>
                <h3>{seller.name}</h3>
              </div>
            </div>
            <p className="muted">{seller.bio}</p>
            <div className="detail-meta">
              <span className="pill">{seller.rating} rating</span>
              <span className="pill pill-secondary">{seller.items} listings</span>
            </div>
            <Link className="btn btn-primary" href={`/sellers/${seller.id}`}>
              View profile
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}