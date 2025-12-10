"use client";

import { useMemo, useState } from "react";

import { addReviewAction, type ReviewActionState } from "@/app/actions/reviews";
import type { ReviewRecord } from "@/lib/data-store";

type ReviewSectionProps = {
  productId: string;
  productName: string;
  initialReviews: ReviewRecord[];
  averageRating: number;
  reviewCount: number;
  canReview: boolean;
};

const initialState: ReviewActionState = {};

export function ReviewSection({
  productId,
  productName,
  initialReviews,
  averageRating: initialAverage,
  reviewCount: initialCount,
  canReview,
}: ReviewSectionProps) {
  const [reviews, setReviews] = useState<ReviewRecord[]>(initialReviews);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [state, setState] = useState<ReviewActionState>(initialState);

  const averageRating = useMemo(() => {
    if (!reviews.length) return initialAverage;
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return Number((total / reviews.length).toFixed(1));
  }, [initialAverage, reviews]);

  const ratingBreakdown = useMemo(() => {
    return [5, 4, 3, 2, 1].map((score) => {
      const count = reviews.filter((review) => review.rating === score).length;
      return {
        score,
        count,
        percent: reviews.length ? Math.round((count / reviews.length) * 100) : 0,
      };
    });
  }, [reviews]);

  async function handleSubmit(formData: FormData) {
    const result = await addReviewAction(initialState, formData);
    setState(result);
    if (result.review) {
      setReviews((prev) => [result.review!, ...prev]);
      setComment("");
      setRating(5);
    }
  }

  const totalReviews = reviews.length || initialCount;

  return (
    <section className="review-section" aria-labelledby="reviews-heading">
      <div className="review-summary">
        <div>
          <p className="eyebrow">Community feedback</p>
          <h3 id="reviews-heading">Reviews & ratings</h3>
          <p className="muted">Any shopper can rate and review this listing. Transparent feedback keeps the marketplace trustworthy.</p>
        </div>
        <div className="review-score" aria-label={`Average rating ${averageRating} out of 5`}>
          <strong>{averageRating.toFixed(1)}</strong>
          <span className="muted">/ 5 average from {totalReviews} reviews</span>
        </div>
      </div>

      <div className="review-content">
        <div className="rating-breakdown" aria-label="Rating distribution">
          {ratingBreakdown.map((item) => (
            <div key={item.score} className="rating-row">
              <span className="rating-label">{item.score} star</span>
              <div className="rating-bar" aria-hidden>
                <span style={{ width: `${item.percent}%` }} />
              </div>
              <span className="rating-count">{item.percent}%</span>
            </div>
          ))}
        </div>

        <div className="review-list" aria-live="polite">
          {reviews.map((review) => (
            <article key={review.id} className="card">
              <div className="review-header">
                <div className="pill pill-secondary">{review.rating} / 5</div>
                <div>
                  <h4>{review.author}</h4>
                  <p className="muted">{formatDate(review.createdAt)}</p>
                </div>
              </div>
              <p>{review.comment}</p>
            </article>
          ))}
        </div>
      </div>

      <form className="review-form" action={handleSubmit} aria-label={`Leave a review for ${productName}`}>
        <input type="hidden" name="productId" value={productId} />

        <div className="input-group">
          <span className="label">Rating</span>
          <div className="rating-choice" role="group" aria-label="Select a star rating">
            {[5, 4, 3, 2, 1].map((score) => (
              <label key={score} className="radio-pill">
                <input
                  type="radio"
                  name="rating"
                  value={score}
                  checked={rating === score}
                  onChange={() => setRating(score)}
                  disabled={!canReview}
                />
                <span>{score} star{score > 1 ? "s" : ""}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="review">Share your experience</label>
          <textarea
            id="review"
            name="comment"
            rows={4}
            placeholder={`What did you love about this ${productName.toLowerCase()}?`}
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            disabled={!canReview}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary btn-full" disabled={!canReview}>
          {canReview ? "Post review" : "Sign in to review"}
        </button>
        {state.error && (
          <p className="muted" role="status" aria-live="polite">
            {state.error}
          </p>
        )}
        {state.success && (
          <p className="muted" role="status" aria-live="polite">
            {state.success}
          </p>
        )}
      </form>
    </section>
  );
}

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(date);
}