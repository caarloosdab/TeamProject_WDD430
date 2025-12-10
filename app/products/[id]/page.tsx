import Link from "next/link";
import { ReviewSection } from "@/components/review-section";

const productDetails = {
  "ceramic-mug": {
    name: "Hand-thrown Ceramic Mug",
    price: "$32.00",
    seller: "Clay & Co.",
    description:
      "Wheel-thrown mug finished in a matte sand glaze with a comfortable thumb-rest handle.",
    highlights: ["Stoneware clay", "Dishwasher safe", "12oz capacity", "Made in small batches"],
  },
  "woven-throw": {
    name: "Handwoven Throw Blanket",
    price: "$85.00",
    seller: "Threaded Stories",
    description:
      "Cozy cotton-wool blend throw with a chevron weave and hand-knotted fringe.",
    highlights: ["Ethically sourced fibers", "50 x 60 inches", "Machine washable", "Naturally dyed"],
  },
  "wall-hanging": {
    name: "Embroidered Wall Hanging",
    price: "$58.00",
    seller: "Threaded Stories",
    description:
      "Botanical-inspired embroidery on organic linen, finished with a walnut dowel for easy hanging.",
    highlights: ["Organic linen", "Hand-stitched", "Ready to hang", "Limited run of 25"],
  },
  "candle-trio": {
    name: "Woodland Soy Candle Trio",
    price: "$42.00",
    seller: "Willow & Wick",
    description:
      "Set of three clean-burning soy candles in cedar, pine, and amber scents inspired by the woods.",
    highlights: ["100% soy wax", "Reusable glass vessels", "Phthalate-free oils", "45+ hour burn"],
  },
  "silver-hoops": {
    name: "Sterling Silver Hoop Set",
    price: "$44.00",
    seller: "North Star Metals",
    description:
      "Three-pair set of hand-shaped sterling hoops in petite, classic, and bold sizes.",
    highlights: ["925 sterling silver", "Hypoallergenic", "Gift-ready packaging", "Lifetime polish"],
  },
  planter: {
    name: "Textured Stoneware Planter",
    price: "$48.00",
    seller: "Clay & Co.",
    description: "Footed planter with carved texture and drainage dish for happy houseplants.",
    highlights: ["Fits 6in pots", "Includes drainage", "Matte eggshell glaze", "Small batch"],
  },
} as const;

type ProductId = keyof typeof productDetails;

export default function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const product = productDetails[params.id as ProductId];

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
          <span className="pill">{product.price}</span>
          <span className="pill pill-secondary">By {product.seller}</span>
        </div>
        <p>{product.description}</p>
      </section>

      <div className="grid-two">
        <section className="card">
          <h3>Highlights</h3>
          <ul className="list-inline">
            {product.highlights.map((highlight) => (
              <li key={highlight} className="pill">
                {highlight}
              </li>
            ))}
          </ul>
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

      <ReviewSection productName={product.name} />
    </main>
  );
}