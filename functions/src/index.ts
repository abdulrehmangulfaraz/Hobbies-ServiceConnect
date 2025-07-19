import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import Stripe from 'stripe';

// Initialize Firebase Admin SDK (required for server-side Firestore access)
admin.initializeApp();
const db = admin.firestore();

// Initialize Stripe with your secret key from Firebase config
// We'll set this 'stripe.secretkey' and 'stripe.webhook_secret' later in the Firebase Console
const stripe = new Stripe(functions.config().stripe.secretkey, {
  apiVersion: '2025-06-30.basil',
});

export const createStripeCheckoutSession = functions.https.onCall(async (data, context: functions.https.CallableContext) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'The function must be called while authenticated.');
  }

  const { priceId, userId, quantity = 1, planName } = data;

  if (!priceId || !userId || !planName) {
    throw new functions.https.HttpsError('invalid-argument', 'Missing priceId, userId, or planName.');
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: quantity }],
      mode: 'subscription',
      success_url: `${process.env.REACT_APP_BASE_URL}/dashboard?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.REACT_APP_BASE_URL}/dashboard?checkout=canceled`,
      metadata: {
        userId: userId,
        planName: planName
      },
    });
    return { sessionId: session.id };
  } catch (error: any) {
    console.error('Error creating Stripe Checkout Session:', error);
    throw new functions.https.HttpsError('internal', 'Unable to create checkout session.', error.message);
  }
});

export const stripeWebhook = functions.https.onRequest(async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    const webhookSecret = functions.config().stripe.webhook_secret;
    event = stripe.webhooks.constructEvent(req.rawBody, sig as string, webhookSecret);
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.userId;
      const planName = session.metadata?.planName as 'Basic' | 'Premium' | 'Enterprise';

      if (userId && planName) {
        try {
          await db.collection('users').doc(userId).update({
            planName: planName,
            stripeCustomerId: session.customer,
            stripeSubscriptionId: session.subscription,
            subscriptionStatus: 'active',
          });
          console.log(`User ${userId} subscribed to ${planName} plan.`);
        } catch (error) {
          console.error('Error updating user subscription:', error);
        }
      }
      break;
    // Add more webhook event handlers as needed (e.g., customer.subscription.deleted)
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
});