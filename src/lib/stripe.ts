import Stripe from "stripe"
// const Stripe = require('stripe');  // old version before ES6

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
  apiVersion: '2024-04-10',
  typescript: true,
})
