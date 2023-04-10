const publisher = require('./publisher');
const subscriber = require('./subscriber');

// Send a news article
publisher.publishNews({
  title: 'New study finds that coffee is good for your health',
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...'
});

// Subscribe to news articles as "Group 1"
subscriber.subscribeToNews('Group 1', (article) => {
  console.log(`[Group 1] Reading news article "${article.title}"`);
});

// Subscribe to news articles as "Group 2"
subscriber.subscribeToNews('Group 2', (article) => {
  console.log(`[Group 2] Reading news article "${article.title}"`);
});
