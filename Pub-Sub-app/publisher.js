const amqp = require('amqplib');
const config = require('./config');

async function publishNews(article) {
  const connection = await amqp.connect(config.rabbitmq.url);
  const channel = await connection.createChannel();

  await channel.assertExchange(config.rabbitmq.exchange, 'fanout', { durable: false });

  const message = JSON.stringify(article);
  channel.publish(config.rabbitmq.exchange, '', Buffer.from(message));

  console.log(`Sent news article "${article.title}"`);

  channel.close();
  connection.close();
}

module.exports = {
  publishNews
};
