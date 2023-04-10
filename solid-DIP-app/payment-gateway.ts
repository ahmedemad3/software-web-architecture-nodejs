// PaymentGateway interface
interface PaymentGateway {
    processPayment(amount, cardNumber, cvv, expiryDate);
  }
  
  
  // PayPal implementation of PaymentGateway
  class PayPalPaymentGateway implements PaymentGateway {
    async processPayment(amount, cardNumber, cvv, expiryDate) {
      // process payment using PayPal
    }
  }
  
  // PaymentService  class
  class PaymentService  {
    constructor(private paymentGateway: PaymentGateway) {
          this.paymentGateway = paymentGateway;
    }
  
    async processPayment(amount, cardNumber, cvv, expiryDate) {
        return this.paymentGateway.processPayment(amount, cardNumber, cvv, expiryDate);
      }
  }
  