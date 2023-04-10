const producer = require('./producer');
const consumer = require('./consumer');

// Send an order
producer.publishOrder({
  id: 1,
  items: [
    { name: 'Item 1', price: 10 },
    { name: 'Item 2', price: 20 }
  ],
  total: 30
});

// Send a payment
producer.publishPayment({
  id: 1,
  amount: 30
});

// Listen for orders and payments
consumer.consumeOrder((order) => {
  console.log(`Processing order ${order.id}`);
});

consumer.consumePayment((payment) => {
  console.log(`Processing payment ${payment.id}`);
});
