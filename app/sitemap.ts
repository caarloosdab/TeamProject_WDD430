import type { MetadataRoute } from "next";

import { listProducts } from "@/lib/data-store";

const routes = ["/", "/products", "/sellers", "/auth/login", "/auth/register", "/profile"];
const sellerIds = ["clay-co", "threaded-stories", "willow-wick", "north-star-metals"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://handcrafted-haven.example.com";

  const staticRoutes = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    changefreq: "weekly",
    priority: route === "/" ? 1 : 0.8,
  }));

  const products = await listProducts();
  const productRoutes = products.map((product) => ({
    url: `${baseUrl}/products/${product.id}`,
    changefreq: "weekly",
    priority: 0.7,
  }));

  const sellerRoutes = sellerIds.map((id) => ({
    url: `${baseUrl}/sellers/${id}`,
    changefreq: "weekly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...productRoutes, ...sellerRoutes];
}
