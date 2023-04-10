// Core Domain
//This is the core domain entity that represents a payment

class Payment {
  constructor(amount, method, customer) {
    this.amount = amount;
    this.method = method;
    this.customer = customer;
    this.status = "pending";
  }
}