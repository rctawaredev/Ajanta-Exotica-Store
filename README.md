## Ajanta Exotica Store

Modern React storefront for Ajanta Exotica with authentication, product listing, filtering, and a cart/checkout experience, built on top of Vite.

### Tech stack

- **Frontend**: React 19 + Vite
- **Routing**: React Router DOM 7
- **Auth & storage**: JWT via `js-cookie`, cart persisted in `localStorage`
- **Styling**: Custom CSS (Poppins typography, responsive layouts)

### Features

- **Authentication**
  - Login screen with username/password, JWT token stored as `jwt_token` cookie.
  - Redirects to home when already authenticated.

- **Navigation**
  - Top navbar with logo, links to **Home**, **Products**, **Cart**, and a styled **Logout** button.
  - Logout clears the token and redirects to `/login`.

- **Home**
  - Hero section with brand messaging and a **Shop Now** button that routes to `/products`.

- **Products**
  - Fetches products from `https://apis.ccbp.in/products` using the JWT.
  - Filters by rating and price range, and sorts by price/rating.
  - Responsive product cards with image, brand, price, rating, and **Add to Cart** button.
  - Cart badge in navbar updates live via a custom `cartUpdated` event.

- **Cart & Checkout**
  - Cart items persisted in `localStorage` with quantity controls and per-item totals.
  - Empty-cart state with CTA back to products.
  - **Checkout** button clears the cart and shows an **Order Placed** confirmation with a **Continue Shopping** button.

### Routes

- `/login` – Login page
- `/` – Home
- `/products` – Products listing and filters
- `/cart` – Cart and checkout

### Getting started

```bash
npm install
npm run dev
```

Then open the printed `http://localhost:xxxx` URL in your browser.
