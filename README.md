# Stripe checkout setup

This app includes a Stripe Checkout route for product purchases.

## 1) Install dependencies

npm install
npm --prefix client install

## 2) Add environment variables

Create a `.env` file in the project root:

STRIPE_SECRET_KEY=sk_test_your_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
APP_URL=http://localhost:5173

## 3) Run the app

npm run dev

## 4) Test checkout

- Add products to the cart.
- Click Checkout.
- Stripe redirects to a live Stripe Checkout session if your secret key is valid.

## 5) Webhook testing

Use Stripe CLI to forward webhook events locally:

stripe listen --forward-to localhost:4000/webhook

Then trigger a test event such as `checkout.session.completed` from the Stripe dashboard or CLI.
