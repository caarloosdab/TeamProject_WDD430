"use server";

import { revalidatePath } from "next/cache";
import { addReview } from "@/lib/data-store";
import { getSession } from "@/lib/auth";

export type ReviewActionState = {
  error?: string;
  success?: string;
  review?: Awaited<ReturnType<typeof addReview>>;
};

export async function addReviewAction(prevState: ReviewActionState, formData: FormData): Promise<ReviewActionState> {
  const session = await getSession();
  const productId = String(formData.get("productId") || "").trim();
  const rating = Number(formData.get("rating") || 0);
  const comment = String(formData.get("comment") || "").trim();
  const author = session ? `${session.firstName} ${session.lastName}` : String(formData.get("author") || "Guest reviewer");

  if (!productId) {
    return { error: "Missing product id." };
  }
  if (!session) {
    return { error: "Please sign in to leave a review." };
  }
  if (!rating || rating < 1 || rating > 5) {
    return { error: "Choose a rating between 1 and 5 stars." };
  }
  if (!comment) {
    return { error: "Add a short comment before submitting." };
  }

  const review = await addReview({ productId, rating, comment, author });
  revalidatePath(`/products/${productId}`);
  return { success: "Thanks! Your review was posted.", review };
}
