// PaymentGateway interface
// if we need to add payment methods like paypal we will to modify the payment gateway
class PaymentGateway {
    processStripePayment(amount) {}
    processPayPalPayment(amount) {}
  }
  
  // Stripe payment gateway implementation
  class StripeGateway extends PaymentGateway {
    processStripePayment(amount) {
      // implementation code here
    }
  }
  
  // PayPal payment gateway implementation
  class PayPalGateway extends PaymentGateway {
    processPayPalPayment(amount) {
      // implementation code here
    }
  }
  
  // Payment controller
  class PaymentController {
    constructor(paymentGateway) {
      this.paymentGateway = paymentGateway;
    }
  
    payment(amount, method) {
      if (method === 'stripe') {
        this.paymentGateway.processStripePayment(amount);
      } else if (method === 'paypal') {
        this.paymentGateway.processPayPalPayment(amount);
      } else {
        throw new Error('Invalid payment method');
      }
    }
  }
  
  // Example usage
  const paymentGateway = new PayPalGateway(); // or new StripeGateway()
  const paymentController = new PaymentController(paymentGateway);
  paymentController.payment(100, 'paypal'); // process PayPal payment
  