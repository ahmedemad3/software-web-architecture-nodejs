const express = require('express');
const bodyParser = require('body-parser');
const pg = require('pg');

const app = express();
const port = 3000;

// Set up the database connection
const pool = new pg.Pool({
  user: 'your-username',
  password: 'your-password',
  host: 'your-host',
  port: 'your-port',
  database: 'your-database'
});

// Use bodyParser to parse incoming requests as JSON
app.use(bodyParser.json());

// Route for transferring funds between accounts
app.post('/transfer', (req, res) => {
    const sourceAccount = req.body.sourceAccount;
    const destinationAccount = req.body.destinationAccount;
    const amount = req.body.amount;
  
    // Verify that the source account has enough funds
    pool.query('SELECT balance FROM accounts WHERE account_number = $1', [sourceAccount], (error, result) => {
      if (error) {
        res.status(500).json({ error: 'Error checking source account balance' });
        return;
      }
  
      const balance = result.rows[0].balance;
  
      if (balance < amount) {
        res.status(400).json({ error: 'Insufficient funds in source account' });
        return;
      }
  
      // Deduct the transferred amount from the source account
      pool.query('UPDATE accounts SET balance = balance - $1 WHERE account_number = $2', [amount, sourceAccount], (error, result) => {
        if (error) {
          res.status(500).json({ error: 'Error deducting funds from source account' });
          return;
        }
  
        // Add the transferred amount to the destination account
        pool.query('UPDATE accounts SET balance = balance + $1 WHERE account_number = $2', [amount, destinationAccount], (error, result) => {
          if (error) {
            res.status(500).json({ error: 'Error adding funds to destination account' });
            return;
          }
  
          res.status(200).json({ message: 'Funds transferred successfully' });
        });
      });
    });
  });
  

// Start the server
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
