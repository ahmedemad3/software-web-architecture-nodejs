const { Pool } = require('pg');
const redis = require('redis');
const client = redis.createClient();

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'testdb',
  password: 'postgres',
  port: 5432,
});

async function getUserFromDb(userId) {
  const query = {
    text: 'SELECT * FROM users WHERE id = $1',
    values: [userId],
  };
  const result = await pool.query(query);
  return result.rows[0];
}

async function getUser(userId) {
  const cacheKey = `user_${userId}`;
  const cachedUser = await client.get(cacheKey);

  if (cachedUser) {
    console.log('User found in cache');
    return JSON.parse(cachedUser);
  }

  console.log('User not found in cache');
  const user = await getUserFromDb(userId);
  await client.set(cacheKey, JSON.stringify(user));
  return user;
}

// Example usage:
const userId = 1;
getUser(userId).then((user) => {
  console.log('User:', user);
});
