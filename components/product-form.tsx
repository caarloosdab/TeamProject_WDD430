"use client";

import { useFormState } from "react-dom";

import { createProductAction, type ProductActionState } from "@/app/actions/products";

const initialState: ProductActionState = {};

export function ProductForm({ canSubmit }: { canSubmit: boolean }) {
  const [state, formAction] = useFormState(createProductAction, initialState);

  return (
    <section className="card" id="add">
      <div className="section-header">
        <div>
          <p className="eyebrow">Share your craft</p>
          <h2>List a new product</h2>
          <p className="muted">Fill in the basics of your handcrafted item. Once saved, it appears instantly in the catalog.</p>
        </div>
        {!canSubmit && <span className="pill pill-secondary">Sign in required</span>}
      </div>

      <form className="form-grid" action={formAction}>
        <div className="input-group">
          <label htmlFor="name">Product name</label>
          <input id="name" name="name" type="text" placeholder="Hand-built vase" required disabled={!canSubmit} />
        </div>
        <div className="input-group">
          <label htmlFor="price">Price (USD)</label>
          <input
            id="price"
            name="price"
            type="number"
            min="1"
            step="0.01"
            placeholder="48"
            required
            disabled={!canSubmit}
          />
        </div>
        <div className="input-group">
          <label htmlFor="category">Category</label>
          <input id="category" name="category" type="text" placeholder="Ceramics" required disabled={!canSubmit} />
        </div>
        <div className="input-group">
          <label htmlFor="status">Tag</label>
          <input
            id="status"
            name="status"
            type="text"
            placeholder="New kiln batch, Limited run, etc."
            disabled={!canSubmit}
          />
        </div>
        <div className="input-group">
          <label htmlFor="seller">Maker name</label>
          <input id="seller" name="seller" type="text" placeholder="Your shop" disabled={!canSubmit} />
        </div>
        <div className="input-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            rows={3}
            placeholder="Share the materials, process, and story."
            required
            disabled={!canSubmit}
          />
        </div>
        <div className="input-group">
          <label htmlFor="highlights">Highlights (comma separated)</label>
          <input
            id="highlights"
            name="highlights"
            type="text"
            placeholder="Stoneware, Dishwasher safe, 12oz"
            disabled={!canSubmit}
          />
        </div>
        <div className="input-group">
          <label htmlFor="image">Image path</label>
          <input
            id="image"
            name="image"
            type="text"
            placeholder="/products/your-image-name.jpg"
            disabled={!canSubmit}
          />
          <p className="muted small">Place your image in <code>public/products</code> and reference it here when you’re ready.</p>
        </div>

        <button className="btn btn-primary" type="submit" disabled={!canSubmit}>
          {canSubmit ? "Add product" : "Sign in to add products"}
        </button>
        {state.error && <p className="muted" role="status">{state.error}</p>}
        {state.success && <p className="muted" role="status">{state.success}</p>}
      </form>
    </section>
  );
}
