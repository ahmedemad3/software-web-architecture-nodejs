// Import Redis client library
const redis = require('redis');
require('dotenv').config();

// Redis event queue names
const ORDER_QUEUE = 'order_queue';
const INVENTORY_QUEUE = 'inventory_queue';
const NOTIFICATION_QUEUE = 'notification_queue';

// Create Redis clients for each event queue
const orderQueue = redis.createClient({ host: process.env.REDIS_HOST, port: process.env.REDIS_PORT });
const inventoryQueue = redis.createClient({ host: process.env.REDIS_HOST, port: process.env.REDIS_PORT });
const notificationQueue = redis.createClient({ host: process.env.REDIS_HOST, port: process.env.REDIS_PORT });

// Listen for incoming orders on the ORDER_QUEUE
orderQueue.blpop(ORDER_QUEUE, 0, async (error, data) => {
  if (error) {
    console.error(error);
    return;
  }

  // Parse incoming order data
  const order = JSON.parse(data[1]);

  console.log(`Processing order ${order.id}`);

  try {
    // Update inventory
    await updateInventory(order);

    // Send notification
    await sendNotification(order);

    console.log(`Order ${order.id} completed successfully`);

  } catch (error) {
    console.error(`Error processing order ${order.id}: ${error.message}`);
  }
});

// Update inventory for a given order
function updateInventory(order) {
  return new Promise((resolve, reject) => {
    // For each item in the order, update the inventory
    order.items.forEach((item) => {
      inventoryQueue.rpush(INVENTORY_QUEUE, JSON.stringify({
        id: item.id,
        quantity: -item.quantity,
      }));
    });

    resolve();
  });
}

// Send notification for a given order
function sendNotification(order) {
  return new Promise((resolve, reject) => {
    notificationQueue.rpush(NOTIFICATION_QUEUE, JSON.stringify({
      customerId: order.customerId,
      message: `Your order (${order.id}) has been processed.`,
    }));

    resolve();
  });
}
