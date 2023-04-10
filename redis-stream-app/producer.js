const Redis = require("ioredis");
const redis = new Redis();

function getRandomSensorData() {
  const timestamp = Date.now();
  const temperature = Math.floor(Math.random() * 100) + 1;
  const humidity = Math.floor(Math.random() * 100) + 1;
  return { timestamp, temperature, humidity };
}

async function produce() {
  while (true) {
    const message = JSON.stringify(getRandomSensorData());
    await redis.xadd("sensor_data", "*", "message", message);
    console.log(`Produced message: ${message}`);
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
}

produce();