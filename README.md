# Contributing to Handcrafted Haven

Thank you for contributing to **Handcrafted Haven**!  
This project is part of the WDD 330 / WDD 430 group assignment, and maintaining a clean, well-coordinated workflow is essential.  
Please follow the guidelines below to ensure smooth collaboration and consistent quality.

---

# 📌 Project Standards

Before contributing, please review:

- **README.md** — project overview, setup, and design standards  
- **Design Guidelines** — color palette, typography, components  
- **GitHub Project Board** — current assignments and workflow  
- **Next.js + TypeScript rules** — coding expectations

---

# 🛠 Development Workflow

We use a structured Git workflow to keep the project stable and easy to maintain.

### 1. Always create a feature branch
Never commit directly to `main`.

Branch naming conventions:

## Authentication (testing)

Authentication now protects `/products` and `/sellers`. Use the member account below for local or preview testing:

- **Email:** maker@testmail.com
- **Password:** craftyPass123!

You can override these defaults with environment variables:

- `DEMO_USER_EMAIL`
- `DEMO_USER_PASSWORD`
- `DEMO_USER_FIRST_NAME`
- `DEMO_USER_LAST_NAME`
- `AUTH_SECRET` (used to sign the session cookie)

## SEO helpers

- `app/sitemap.ts` lists the primary routes and product/seller detail pages.
- Global metadata in `app/layout.tsx` sets Open Graph, Twitter card, keywords, and a canonical URL.