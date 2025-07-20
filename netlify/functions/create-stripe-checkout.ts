import { Handler } from '@netlify/functions';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil',
});

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
      headers: { 'Content-Type': 'application/json' },
    };
  }

  try {
    const { priceId, uid } = JSON.parse(event.body || '{}');

    if (!priceId || !uid) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Price ID and User ID are required.' }),
        headers: { 'Content-Type': 'application/json' },
      };
    }

    // Netlify provides the deploy URL in an environment variable
    const appUrl = process.env.URL || 'http://localhost:8080';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${appUrl}/dashboard?payment_status=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/dashboard?payment_status=cancelled`,
      client_reference_id: uid,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ sessionId: session.id }),
      headers: { 'Content-Type': 'application/json' },
    };
  } catch (error: any) {
    console.error('Stripe Checkout error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: `An error occurred: ${error.message}` }),
      headers: { 'Content-Type': 'application/json' },
    };
  }
};