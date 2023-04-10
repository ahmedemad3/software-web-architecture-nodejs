const express = require('express');
const redis = require('redis');

// Create a Redis client to handle data storage
const redisClient = redis.createClient({
  host: 'redis-server', // address of the Redis server (assumes it's running on a separate container or server)
  port: 6379 // default Redis port
});

// Create an instance of the Express web server
const app = express();

// Define a route to handle GET requests
app.get('/', (req, res) => {

  // Attempt to retrieve a value from Redis
  redisClient.get('myKey', (err, reply) => {

    // If there was an error or no value was found, return an error response
    if (err || reply === null) {
      res.status(500).send('Error retrieving value from Redis');
    }

    // If a value was found, return it as the response
    else {
      res.send(`Value retrieved from Redis: ${reply}`);
    }
  });
});

// Start the server and listen for incoming requests
const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
