import type { MetadataRoute } from "next";

const routes = [
  "/",
  "/products",
  "/sellers",
  "/auth/login",
  "/auth/register",
];

const productIds = ["ceramic-mug", "woven-throw", "wall-hanging", "candle-trio", "silver-hoops", "planter"];
const sellerIds = ["clay-co", "threaded-stories", "willow-wick", "north-star-metals"];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://handcrafted-haven.example.com";

  const staticRoutes = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    changefreq: "weekly",
    priority: route === "/" ? 1 : 0.8,
  }));

  const productRoutes = productIds.map((id) => ({
    url: `${baseUrl}/products/${id}`,
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