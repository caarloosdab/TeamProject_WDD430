import Link from "next/link";

const sellerDetails = {
  "clay-co": {
    name: "Clay & Co.",
    specialty: "Ceramics",
    location: "Flagstaff, AZ",
    story: "Clay & Co. is a duo of ceramicists creating functional ware inspired by canyon hues and tactile textures.",
    focus: ["Stoneware", "Small-batch", "Earthy glazes"],
  },
  "threaded-stories": {
    name: "Threaded Stories",
    specialty: "Textiles",
    location: "Bend, OR",
    story: "Threaded Stories blends heirloom embroidery and modern weaving techniques to create tactile art for the home.",
    focus: ["Handwoven", "Organic linen", "Natural dyes"],
  },
  "willow-wick": {
    name: "Willow & Wick",
    specialty: "Candles",
    location: "Boise, ID",
    story: "Botanically-inspired scents poured in reusable glass vessels with a focus on clean, safe ingredients.",
    focus: ["Soy wax", "Phthalate-free", "Reusable jars"],
  },
  "north-star-metals": {
    name: "North Star Metals",
    specialty: "Jewelry",
    location: "Salt Lake City, UT",
    story: "Minimal, sculptural pieces shaped by hand with responsibly sourced metals and stones.",
    focus: ["Sterling silver", "Hand-shaped", "Minimal design"],
  },
} as const;

type SellerId = keyof typeof sellerDetails;

export default function SellerProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const seller = sellerDetails[params.id as SellerId];

  if (!seller) {
    return (
      <main className="page-shell">
        <div className="page-header">
          <h1>Seller not found</h1>
          <p className="muted">We couldn’t find that artisan. Please return to the seller directory.</p>
        </div>
        <Link className="btn btn-primary" href="/sellers">
          Back to sellers
        </Link>
      </main>
    );
  }

  return (
    <main className="page-shell">
      <section className="detail-hero">
        <div className="seller-header">
          <div className="seller-avatar" aria-hidden />
          <div>
            <p className="eyebrow">{seller.specialty}</p>
            <h2>{seller.name}</h2>
            <p className="muted">{seller.location}</p>
          </div>
        </div>
        <p>{seller.story}</p>
        <div className="badge-row">
          {seller.focus.map((item) => (
            <span key={item} className="pill">
              {item}
            </span>
          ))}
        </div>
      </section>

      <div className="grid-two">
        <section className="card">
          <h3>Signature collections</h3>
          <p className="muted">
            Each collection is released in limited runs to reduce waste and keep quality high. Join the
            mailing list to hear about upcoming drops first.
          </p>
          <button className="btn btn-primary">Follow seller</button>
        </section>
        <section className="card">
          <h3>Recent listings</h3>
          <ul className="list-inline">
            <li className="pill pill-secondary">Small-batch mugs</li>
            <li className="pill pill-secondary">Limited wall hangings</li>
            <li className="pill pill-secondary">Giftable candle sets</li>
          </ul>
          <Link className="link" href="/products">
            Browse items
          </Link>
        </section>
      </div>
    </main>
  );
}