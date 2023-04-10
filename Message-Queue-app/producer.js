const config = require('./config');
const amqp = require('amqplib');

async function publishOrder(order) {
  const connection = await amqp.connect(config.rabbitmq.url);
  const channel = await connection.createChannel();

  await channel.assertExchange(config.rabbitmq.exchange, 'direct', { durable: true });

  await channel.assertQueue(config.rabbitmq.orderQueue, { durable: true });
  await channel.bindQueue(config.rabbitmq.orderQueue, config.rabbitmq.exchange, 'order');

  await channel.publish(config.rabbitmq.exchange, 'order', Buffer.from(JSON.stringify(order)), { persistent: true });

  console.log(`Sent order ${order.id}`);

  await channel.close();
  await connection.close();
}

async function publishPayment(payment) {
  const connection = await amqp.connect(config.rabbitmq.url);
  const channel = await connection.createChannel();

  await channel.assertExchange(config.rabbitmq.exchange, 'direct', { durable: true });

  await channel.assertQueue(config.rabbitmq.paymentQueue, { durable: true });
  await channel.bindQueue(config.rabbitmq.paymentQueue, config.rabbitmq.exchange, 'payment');

  await channel.publish(config.rabbitmq.exchange, 'payment', Buffer.from(JSON.stringify(payment)), { persistent: true });

  console.log(`Sent payment ${payment.id}`);

  await channel.close();
  await connection.close();
}

module.exports = {
  publishOrder,
  publishPayment
};
