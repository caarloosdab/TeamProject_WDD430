import Link from "next/link";

const products = [
  {
    id: "ceramic-mug",
    name: "Hand-thrown Ceramic Mug",
    price: "$32.00",
    rating: "4.8",
    reviews: 23,
    category: "Ceramics",
    status: "New kiln batch",
  },
  {
    id: "woven-throw",
    name: "Handwoven Throw Blanket",
    price: "$85.00",
    rating: "4.7",
    reviews: 9,
    category: "Textiles",
    status: "Winter drop",
  },
  {
    id: "wall-hanging",
    name: "Embroidered Wall Hanging",
    price: "$58.00",
    rating: "5.0",
    reviews: 12,
    category: "Art & Prints",
    status: "Limited run",
  },
  {
    id: "candle-trio",
    name: "Woodland Soy Candle Trio",
    price: "$42.00",
    rating: "5.0",
    reviews: 31,
    category: "Candles",
    status: "Bestseller",
  },
  {
    id: "silver-hoops",
    name: "Sterling Silver Hoop Set",
    price: "$44.00",
    rating: "4.9",
    reviews: 17,
    category: "Jewelry",
    status: "Editor's pick",
  },
  {
    id: "planter",
    name: "Textured Stoneware Planter",
    price: "$48.00",
    rating: "4.6",
    reviews: 8,
    category: "Home Decor",
    status: "Small batch",
  },
];

const filters = ["All", "Ceramics", "Textiles", "Candles", "Jewelry", "Decor"];

export default function ProductsPage() {
  return (
    <main className="page-shell">
      <header className="page-header">
        <p className="eyebrow">Catalog</p>
        <h1>Discover artisan-made pieces</h1>
        <p>
          Browse our curated marketplace of handcrafted goods. Every item is made with intention,
          sustainable materials, and a unique story.
        </p>
      </header>

      <section className="profile-header">
        <div className="badge-row">
          {filters.map((filter) => (
            <button key={filter} className="btn btn-tertiary" aria-label={`Filter by ${filter}`}>
              {filter}
            </button>
          ))}
        </div>
        <p className="muted">Showing {products.length} handcrafted items.</p>
      </section>

      <section>
        <div className="product-grid">
          {products.map((product) => (
            <article key={product.id} className="product-card">
              <div className="product-image" />
              <div className="product-meta">
                <span className="pill">{product.category}</span>
                <h3>{product.name}</h3>
                <p className="price">{product.price}</p>
                <p className="rating">
                  {product.rating} rating • {product.reviews} reviews
                </p>
              </div>
              <div className="product-footer">
                <Link className="btn btn-primary" href={`/products/${product.id}`}>
                  View details
                </Link>
                <button className="btn btn-secondary">Save</button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}