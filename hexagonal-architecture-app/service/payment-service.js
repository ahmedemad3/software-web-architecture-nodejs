// payment-service.js
//The PaymentService acts as the application logic, 
//orchestrating the payment process using the PaymentGateway
// communicate with paymentGateway [adapter]
class PaymentService {
  constructor(paymentGateway) {
    this.paymentGateway = paymentGateway;
  }

  async processPayment(payment) {
    const charge = await this.paymentGateway.charge(payment);
    return charge;
  }
}

module.exports = PaymentService;

