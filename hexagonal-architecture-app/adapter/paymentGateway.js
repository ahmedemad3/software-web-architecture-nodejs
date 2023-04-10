// payment-gateway.js
//the PaymentGateway acts as the adapter, interfacing with Stripe's API. 

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

class PaymentGateway {
  async charge(payment) {
    amount = payment.amount;
    const charge = await stripe.charges.create({
      amount,
      currency: 'usd',
    });
    return charge;
  }
}

module.exports = PaymentGateway;