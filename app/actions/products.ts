"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { addProduct, type NewProductInput } from "@/lib/data-store";
import { getSession } from "@/lib/auth";

export type ProductActionState = {
  error?: string;
  success?: string;
};

export async function createProductAction(prevState: ProductActionState, formData: FormData): Promise<ProductActionState> {
  const session = await getSession();
  if (!session) {
    return { error: "You need to sign in before adding a product." };
  }

  const name = String(formData.get("name") || "").trim();
  const price = Number(formData.get("price") || 0);
  const category = String(formData.get("category") || "").trim();
  const status = String(formData.get("status") || "").trim();
  const seller = String(formData.get("seller") || `${session.firstName} ${session.lastName}`).trim();
  const description = String(formData.get("description") || "").trim();
  const highlights = String(formData.get("highlights") || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
  const image = String(formData.get("image") || "").trim();

  if (!name || !price || !category || !description) {
    return { error: "Please include a name, price, category, and description." };
  }

  const payload: NewProductInput = {
    name,
    price,
    category,
    status,
    seller,
    description,
    highlights,
    image,
  };

  await addProduct(payload);
  revalidatePath("/products");
  revalidatePath("/sitemap.xml");
  return { success: "Product added and visible in the catalog." };
}

export async function requireProfileOrRedirect() {
  const session = await getSession();
  if (!session) {
    redirect("/auth/login?redirect=/profile");
  }
  return session;
}
