const Redis = require("ioredis");
const redis = new Redis();

const group = "sensor_data_group";
const consumer = "sensor_data_consumer";
const threshold = 80;

async function consume() {
  await redis.xgroup("CREATE", "sensor_data", group, "$", "MKSTREAM");

  while (true) {
    const result = await redis.xreadgroup(
      "GROUP",
      group,
      consumer,
      "BLOCK",
      1000,
      "STREAMS",
      "sensor_data",
      ">"
    );

    if (!result) {
      continue;
    }

    const stream = result[0][1];
    for (const message of stream) {
      const id = message[0];
      const data = JSON.parse(message[1][1]);
      console.log(`Consumed message with ID ${id}: ${JSON.stringify(data)}`);

      if (data.temperature > threshold) {
        console.log(`Temperature threshold exceeded: ${data.temperature}`);
        // Send a notification or trigger an action here
      }

      await redis.xack("sensor_data", group, id);
    }
  }
}

consume();
