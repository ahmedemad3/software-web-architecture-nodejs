const amqp = require('amqplib');
const config = require('./config');

async function subscribeToNews(group, callback) {
  const connection = await amqp.connect(config.rabbitmq.url);
  const channel = await connection.createChannel();

  await channel.assertExchange(config.rabbitmq.exchange, 'fanout', { durable: false });

  const { queue } = await channel.assertQueue('', { exclusive: true });
  await channel.bindQueue(queue, config.rabbitmq.exchange, '');

  await channel.consume(queue, async (msg) => {
    const article = JSON.parse(msg.content.toString());
    console.log(`[${group}] Received news article "${article.title}"`);
    await callback(article);
  });

  console.log(`[${group}] Listening for news articles...`);

  process.on('exit', () => {
    channel.close();
    connection.close();
  });
}

module.exports = {
  subscribeToNews
};
