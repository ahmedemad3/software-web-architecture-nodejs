const redis = require('redis');
require('dotenv').config();
const client = redis.createClient({ host: process.env.REDIS_HOST, port: process.env.REDIS_PORT });

client.on('error', (err) => {
  console.log('Redis error:', err);
});

client.on('message', (channel, message) => {
  console.log(`Notification Service received message: ${message}`);
  const order = JSON.parse(message);
  sendNotification(order);
});

client.subscribe('order:created');

function sendNotification(order) {
  // Send notification logic goes here
  console.log(`Sending notification for order ${order.id}`);
}
