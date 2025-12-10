import { ProductCatalog, type Product } from "@/components/product-catalog";

const products: Product[] = [
  {
    id: "ceramic-mug",
    name: "Hand-thrown Ceramic Mug",
    price: 32,
    rating: 4.8,
    reviews: 23,
    category: "Ceramics",
    status: "New kiln batch",
  },
  {
    id: "woven-throw",
    name: "Handwoven Throw Blanket",
    price: 85,
    rating: 4.7,
    reviews: 9,
    category: "Textiles",
    status: "Winter drop",
  },
  {
    id: "wall-hanging",
    name: "Embroidered Wall Hanging",
    price: 58,
    rating: 5,
    reviews: 12,
    category: "Art & Prints",
    status: "Limited run",
  },
  {
    id: "candle-trio",
    name: "Woodland Soy Candle Trio",
    price: 42,
    rating: 5,
    reviews: 31,
    category: "Candles",
    status: "Bestseller",
  },
  {
    id: "silver-hoops",
    name: "Sterling Silver Hoop Set",
    price: 44,
    rating: 4.9,
    reviews: 17,
    category: "Jewelry",
    status: "Editor's pick",
  },
  {
    id: "planter",
    name: "Textured Stoneware Planter",
    price: 48.00,
    rating: 4.6,
    reviews: 8,
    category: "Home Decor",
    status: "Small batch",
  },
];


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

      <ProductCatalog products={products} />
    </main>
  );
}