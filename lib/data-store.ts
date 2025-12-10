import { promises as fs } from "fs";
import path from "path";
import { slugify } from "./string-utils";

export type ProductRecord = {
  id: string;
  name: string;
  price: number;
  rating: number;
  reviews: number;
  category: string;
  status: string;
  seller: string;
  description: string;
  highlights: string[];
  image?: string;
};

export type ReviewRecord = {
  id: string;
  productId: string;
  author: string;
  rating: number;
  comment: string;
  createdAt: string;
};

export type StoreSnapshot = {
  products: ProductRecord[];
  reviews: ReviewRecord[];
};

const dataPath = path.join(process.cwd(), "data", "store.json");

async function readStore(): Promise<StoreSnapshot> {
  try {
    const raw = await fs.readFile(dataPath, "utf8");
    return JSON.parse(raw) as StoreSnapshot;
  } catch (error) {
    throw new Error("Failed to read data store: " + (error as Error).message);
  }
}

async function writeStore(store: StoreSnapshot) {
  await fs.mkdir(path.dirname(dataPath), { recursive: true });
  await fs.writeFile(dataPath, JSON.stringify(store, null, 2), "utf8");
}

export async function listProducts(): Promise<ProductRecord[]> {
  const store = await readStore();
  return store.products;
}

export async function getProductById(id: string): Promise<ProductRecord | undefined> {
  const store = await readStore();
  return store.products.find((product) => product.id === id);
}

export type NewProductInput = {
  name: string;
  price: number;
  category: string;
  status?: string;
  seller: string;
  description: string;
  highlights?: string[];
  image?: string;
};

export async function addProduct(input: NewProductInput) {
  const store = await readStore();
  const baseId = slugify(input.name);
  const uniqueId = ensureUniqueId(baseId, store);

  const product: ProductRecord = {
    id: uniqueId,
    name: input.name.trim(),
    price: input.price,
    category: input.category.trim(),
    status: input.status?.trim() || "New arrival",
    seller: input.seller.trim(),
    description: input.description.trim(),
    highlights: input.highlights?.map((item) => item.trim()).filter(Boolean) || [],
    image: input.image?.trim() || `/products/${uniqueId}.jpg`,
    rating: 0,
    reviews: 0,
  };

  store.products.unshift(product);
  await writeStore(store);
  return product;
}

function ensureUniqueId(baseId: string, store: StoreSnapshot) {
  let id = baseId || `product-${Date.now()}`;
  const existing = new Set(store.products.map((product) => product.id));
  let suffix = 1;
  while (existing.has(id)) {
    id = `${baseId}-${suffix}`;
    suffix += 1;
  }
  return id;
}

export async function listReviews(productId: string): Promise<ReviewRecord[]> {
  const store = await readStore();
  return store.reviews
    .filter((review) => review.productId === productId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export type NewReviewInput = {
  productId: string;
  author: string;
  rating: number;
  comment: string;
};

export async function addReview(input: NewReviewInput) {
  const store = await readStore();
  const product = store.products.find((item) => item.id === input.productId);
  if (!product) {
    throw new Error("Product not found");
  }

  const review: ReviewRecord = {
    id: crypto.randomUUID(),
    productId: input.productId,
    author: input.author.trim() || "Guest reviewer",
    rating: input.rating,
    comment: input.comment.trim(),
    createdAt: new Date().toISOString(),
  };

  store.reviews.unshift(review);

  const productReviews = store.reviews.filter((r) => r.productId === input.productId);
  const total = productReviews.reduce((sum, r) => sum + r.rating, 0);
  product.reviews = productReviews.length;
  product.rating = Number((total / productReviews.length).toFixed(1));

  await writeStore(store);
  return review;
}
