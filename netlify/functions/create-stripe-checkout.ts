// /api/create-stripe-checkout.ts

import { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';

// Initialize Stripe with your secret key from Vercel environment variables
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil',
});

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { priceId, uid } = req.body;

  if (!priceId || !uid) {
    return res.status(400).json({ error: 'Price ID and User ID are required.' });
  }

  // MODIFIED: Changed localhost port from 8080 to 3000
  const appUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${appUrl}/dashboard?payment_status=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/dashboard?payment_status=cancelled`,
      client_reference_id: uid,
    });

    res.status(200).json({ sessionId: session.id });
  } catch (error: any) {
    console.error('Stripe Checkout error:', error);
    res.status(500).json({ error: `An error occurred: ${error.message}` });
  }
}