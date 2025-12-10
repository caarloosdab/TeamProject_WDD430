import Link from "next/link";
import { ReviewSection } from "@/components/review-section";
import { getSession } from "@/lib/auth";
import { getProductById, listReviews } from "@/lib/data-store";

const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [product, reviews, session] = await Promise.all([
    getProductById(params.id),
    listReviews(params.id),
    getSession(),
  ]);

  if (!product) {
    return (
      <main className="page-shell">
        <div className="page-header">
          <h1>Product not found</h1>
          <p className="muted">We couldn’t find that handcrafted item. Please return to the catalog.</p>
        </div>
        <Link className="btn btn-primary" href="/products">
          Back to products
        </Link>
      </main>
    );
  }

  return (
    <main className="page-shell">
      <section className="detail-hero">
        <p className="eyebrow">Product detail</p>
        <h2>{product.name}</h2>
        <div className="detail-meta">
          <span className="pill">{currency.format(product.price)}</span>
          <span className="pill pill-secondary">By {product.seller}</span>
        </div>
        <p>{product.description}</p>
      </section>

      <div className="grid-two">
        <section className="card">
          <h3>Highlights</h3>
          {product.highlights?.length ? (
            <ul className="list-inline">
              {product.highlights.map((highlight) => (
                <li key={highlight} className="pill">
                  {highlight}
                </li>
              ))}
            </ul>
          ) : (
            <p className="muted">Seller didn’t add highlights yet.</p>
          )}
        </section>
        <section className="card">
          <h3>About the maker</h3>
          <p className="muted">
            Each piece is handmade to order, so slight variations make every item one-of-a-kind. This
            seller focuses on sustainable materials and ships plastic-free.
          </p>
          <div className="badge-row">
            <span className="pill pill-secondary">Eco conscious</span>
            <span className="pill">Small batch</span>
          </div>
          <Link
            className="link"
            href={`/sellers/${product.seller.toLowerCase().replace(/\s+/g, "-")}`}
          >
            Visit seller profile
          </Link>
        </section>
      </div>

      <ReviewSection
        productId={product.id}
        productName={product.name}
        initialReviews={reviews}
        averageRating={product.rating}
        reviewCount={product.reviews}
        canReview={Boolean(session)}
      />
    </main>
  );
}