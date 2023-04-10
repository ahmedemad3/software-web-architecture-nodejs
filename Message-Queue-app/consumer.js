const config = require('./config');
const amqp = require('amqplib');

async function consumeOrder(callback) {
  const connection = await amqp.connect(config.rabbitmq.url);
  const channel = await connection.createChannel();

  await channel.assertExchange(config.rabbitmq.exchange, 'direct', { durable: true });

  await channel.assertQueue(config.rabbitmq.orderQueue, { durable: true });
  await channel.bindQueue(config.rabbitmq.orderQueue, config.rabbitmq.exchange, 'order');

  await channel.consume(config.rabbitmq.orderQueue, async (msg) => {
    const order = JSON.parse(msg.content.toString());
    console.log(`Received order ${order.id}`);
    await callback(order);
    channel.ack(msg);
  });

  console.log('Waiting for orders...');

  process.on('exit', () => {
    channel.close();
    connection.close();
  });
}

async function consumePayment(callback) {
  const connection = await amqp.connect(config.rabbitmq.url);
    const channel = await connection.createChannel();
    
    await channel.assertExchange(config.rabbitmq.exchange, 'direct', { durable: true });
    
    await channel.assertQueue(config.rabbitmq.paymentQueue, { durable: true });
    await channel.bindQueue(config.rabbitmq.paymentQueue, config.rabbitmq.exchange, 'payment');
    
    await channel.consume(config.rabbitmq.paymentQueue, async (msg) => {
    const payment = JSON.parse(msg.content.toString());
    console.log(`Received payment ${payment.id}`);
    await callback(payment);
    channel.ack(msg);
    });
    
    console.log('Waiting for payments...');
    
    process.on('exit', () => {
    channel.close();
    connection.close();
    });
    }
    
    module.exports = {
    consumeOrder,
    consumePayment
    };