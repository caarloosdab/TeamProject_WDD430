import { ProductCatalog } from "@/components/product-catalog";
import { ProductForm } from "@/components/product-form";
import { getSession } from "@/lib/auth";
import { listProducts } from "@/lib/data-store";

export default async function ProductsPage() {
  const [products, session] = await Promise.all([listProducts(), getSession()]);

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

      <ProductForm canSubmit={Boolean(session)} />
      <ProductCatalog products={products} />
    </main>
  );
}