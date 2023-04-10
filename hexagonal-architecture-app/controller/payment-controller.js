// payment-controller.js
//the PaymentController acts as the interface / port, 
//handling incoming HTTP requests and calling the PaymentService.

const PaymentService = require('./payment-service');

class PaymentController {
  constructor(paymentService) {
    this.paymentService = paymentService;
  }

  async processPayment(req, res) {
    try {
      const { amount, method, customer } = req.body;
      const payment = new Payment(amount, method, customer);
      const charge = await this.paymentService.processPayment(payment);
      return res.status(200).json(charge);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = PaymentController;
