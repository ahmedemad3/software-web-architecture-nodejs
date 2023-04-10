// Import Redis client library
const redis = require('redis');
require('dotenv').config();

// Redis event queue names
const INVENTORY_QUEUE = 'inventory_queue';

// Create Redis client for the inventory event queue
const inventoryQueue = redis.createClient({ host: process.env.REDIS_HOST, port: process.env.REDIS_PORT });

// Listen for inventory updates on the INVENTORY_QUEUE
inventoryQueue.blpop(INVENTORY_QUEUE, 0, async (error, data) => {
  if (error) {
    console.error(error);
    return;
  }

  // Parse incoming inventory update data
  const update = JSON.parse(data[1]);

  console.log(`Updating inventory for item ${update.id}`);

  try {
    // Simulate updating the inventory in a database
    const inventory = await updateInventory(update);

    console.log(`Inventory updated for item ${update.id}: ${inventory[update.id].quantity}`);

  } catch (error) {
    console.error(`Error updating inventory for item ${update.id}: ${error.message}`);
  }
});

// Simulate updating the inventory in a database
function updateInventory(update) {
  return new Promise((resolve, reject) => {
    // Simulate a delay to make the update look more realistic
    setTimeout(() => {
      // Update inventory in memory
      inventory[update.id].quantity += update.quantity;

      resolve(inventory);
    }, 1000);
  });
}

// Sample inventory data
const inventory = {
  item1: {
    id: 'item1',
    quantity: 5,
  },
  item2: {
    id: 'item2',
    quantity: 10,
  },
};
