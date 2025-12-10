"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

export type Product = {
  id: string;
  name: string;
  price: number;
  rating: number;
  reviews: number;
  category: string;
  status: string;
  image?: string;
  seller?: string;
};

const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

const priceRanges = [
  { label: "Any price", value: "all" },
  { label: "Under $50", value: "under-50" },
  { label: "$50 - $75", value: "50-75" },
  { label: "Over $75", value: "over-75" },
] as const;

type PriceRange = (typeof priceRanges)[number]["value"];

export function ProductCatalog({ products }: { products: Product[] }) {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [priceRange, setPriceRange] = useState<PriceRange>("all");

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = activeCategory === "All" || product.category === activeCategory;

      const matchesPrice =
        priceRange === "all" ||
        (priceRange === "under-50" && product.price < 50) ||
        (priceRange === "50-75" && product.price >= 50 && product.price <= 75) ||
        (priceRange === "over-75" && product.price > 75);

      return matchesCategory && matchesPrice;
    });
  }, [activeCategory, priceRange, products]);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(products.map((product) => product.category)))],
    [products],
  );

  return (
    <>
      <section className="profile-header" aria-label="Product filters">
        <div className="filter-bar" role="group" aria-label="Category filters">
          {categories.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                className={`btn btn-tertiary${isActive ? " is-active" : ""}`}
                aria-pressed={isActive}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            );
          })}
        </div>

        <div className="filter-group" aria-label="Price range">
          <label className="visually-hidden" htmlFor="priceRange">
            Filter by price range
          </label>
          <select
            id="priceRange"
            name="priceRange"
            value={priceRange}
            onChange={(event) => setPriceRange(event.target.value as PriceRange)}
          >
            {priceRanges.map((range) => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </div>
        <p className="muted" role="status" aria-live="polite">
          Showing {filteredProducts.length} of {products.length} handcrafted items
        </p>
      </section>

      <section aria-live="polite">
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <article key={product.id} className="product-card" aria-label={`${product.name} listing`}>
              <div
                className="product-image"
                style={product.image ? { backgroundImage: `url(${product.image})` } : undefined}
                aria-label={`Image of ${product.name}`}
              />
              <div className="product-meta">
                <span className="pill">{product.category}</span>
                <h3>{product.name}</h3>
                <p className="price">{currency.format(product.price)}</p>
                <p className="rating">
                  {product.rating.toFixed(1)} rating • {product.reviews} reviews
                </p>
              </div>
              <div className="product-footer">
                <Link className="btn btn-primary" href={`/products/${product.id}`}>
                  View details
                </Link>
                <button className="btn btn-secondary" type="button">
                  Save
                </button>
              </div>
              <p className="pill pill-secondary" aria-label={`Status: ${product.status}`}>
                {product.status}
              </p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}