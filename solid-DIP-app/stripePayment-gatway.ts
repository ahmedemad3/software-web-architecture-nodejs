// StripePaymentGateway.js

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

class StripePaymentGateway {
  async processPayment(amount, cardNumber, cvv, expiryDate) {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount * 100,
        currency: 'usd',
        payment_method_data: {
          type: 'card',
          card: {
            number: cardNumber,
            exp_month: expiryDate.getMonth() + 1,
            exp_year: expiryDate.getFullYear(),
            cvc: cvv,
          },
        },
        confirm: true,
      });
      return paymentIntent.status;
    } catch (error) {
      throw new Error('Payment failed');
    }
  }
}

module.exports = StripePaymentGateway;
