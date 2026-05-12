const posts = require('./data/posts');

posts.reset();
posts.create({ title: 'Welcome', content: 'This is the first post' });
posts.create({ title: 'Second', content: 'Another post' });

console.log('Seeded posts');
