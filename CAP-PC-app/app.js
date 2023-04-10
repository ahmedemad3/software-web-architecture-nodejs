const express = require('express');
const redis = require('redis');

// Create a Redis client to handle data storage
const redisClient = redis.createClient({
  host: 'redis-server', // address of the Redis server (assumes it's running on a separate container or server)
  port: 6379 // default Redis port
});

// Create an instance of the Express web server
const app = express();

// Define a route to handle POST requests for creating a new user
app.post('/users', (req, res) => {
  const newUser = req.body;

  // Store the new user in Redis with a unique ID as the key
  const userId = generateId();
  redisClient.set(userId, JSON.stringify(newUser), (err, reply) => {

    // If there was an error, return an error response
    if (err) {
      res.status(500).send('Error storing user in Redis');
    }

    // If the user was stored successfully, return the new user with its ID
    else {
      newUser.id = userId;
      res.send(newUser);
    }
  });
});

// Define a route to handle GET requests for retrieving a user by ID
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;

  // Retrieve the user from Redis
  redisClient.get(userId, (err, reply) => {

    // If there was an error or no user was found, return an error response
    if (err || reply === null) {
      res.status(404).send('User not found');
    }

    // If a user was found, return it as the response
    else {
      const user = JSON.parse(reply);
      res.send(user);
    }
  });
});

// Start the server and listen for incoming requests
const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// Helper function to generate a unique ID for a new user
function generateId() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}
