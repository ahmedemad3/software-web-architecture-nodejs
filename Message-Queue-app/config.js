module.exports = {
  rabbitmq: {
    url: 'amqp://localhost',
    exchange: 'order_exchange',
    orderQueue: 'order_queue',
    paymentQueue: 'payment_queue'
  }
};
