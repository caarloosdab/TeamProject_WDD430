"use client";

import { FormEvent, useMemo, useState } from "react";

export type Review = {
  id: string;
  author: string;
  rating: number;
  comment: string;
  createdAt: string;
};

const initialReviews: Review[] = [
  {
    id: "1",
    author: "Avery M.",
    rating: 5,
    comment: "Beautifully made and thoughtfully packaged. The texture feels amazing in hand!",
    createdAt: "2 days ago",
  },
  {
    id: "2",
    author: "Jordan P.",
    rating: 4,
    comment: "Loved the craftsmanship. Shipping was quick and the seller answered my questions fast.",
    createdAt: "1 week ago",
  },
];

export function ReviewSection({ productName }: { productName: string }) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [author, setAuthor] = useState("");
  const [status, setStatus] = useState("");

  const averageRating = useMemo(() => {
    if (!reviews.length) return 0;
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return Number((total / reviews.length).toFixed(1));
  }, [reviews]);

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

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!comment.trim()) {
      setStatus("Please add a short review before submitting.");
      return;
    }

    const newReview: Review = {
      id: crypto.randomUUID(),
      author: author.trim() || "Guest reviewer",
      rating,
      comment: comment.trim(),
      createdAt: "Just now",
    };

    setReviews([newReview, ...reviews]);
    setComment("");
    setAuthor("");
    setRating(5);
    setStatus("Thanks for sharing your feedback! Your review is now visible to the community.");
  }

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
          <span className="muted">/ 5 average from {reviews.length} reviews</span>
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
                  <p className="muted">{review.createdAt}</p>
                </div>
              </div>
              <p>{review.comment}</p>
            </article>
          ))}
        </div>
      </div>

      <form className="review-form" onSubmit={handleSubmit} aria-label={`Leave a review for ${productName}`}>
        <div className="input-group">
          <label htmlFor="reviewer">Name (optional)</label>
          <input
            id="reviewer"
            name="reviewer"
            type="text"
            placeholder="Tell us who you are"
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
          />
        </div>

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
            name="review"
            rows={4}
            placeholder={`What did you love about this ${productName.toLowerCase()}?`}
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary btn-full">
          Post review
        </button>
        {status && (
          <p className="muted" role="status" aria-live="polite">
            {status}
          </p>
        )}
      </form>
    </section>
  );
}