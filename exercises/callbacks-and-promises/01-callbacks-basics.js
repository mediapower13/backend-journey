function simulateAsyncOperation(data, callback) {
  setTimeout(() => {
    if (data < 0) {
      callback(new Error('Data cannot be negative'), null);
    } else {
      callback(null, data * 2);
    }
  }, 1000);
}

function fetchUserData(userId, callback) {
  setTimeout(() => {
    if (userId > 0) {
      callback(null, { id: userId, name: `User ${userId}`, email: `user${userId}@example.com` });
    } else {
      callback(new Error('Invalid user ID'), null);
    }
  }, 800);
}

function fetchUserPosts(userId, callback) {
  setTimeout(() => {
    callback(null, [
      { id: 1, title: 'Post 1', content: 'Content 1' },
      { id: 2, title: 'Post 2', content: 'Content 2' }
    ]);
  }, 600);
}

function callbackHellExample(userId, callback) {
  fetchUserData(userId, (err, user) => {
    if (err) {
      callback(err, null);
    } else {
      fetchUserPosts(user.id, (err, posts) => {
        if (err) {
          callback(err, null);
        } else {
          simulateAsyncOperation(posts.length, (err, result) => {
            if (err) {
              callback(err, null);
            } else {
              callback(null, {
                user: user,
                posts: posts,
                postCount: result
              });
            }
          });
        }
      });
    }
  });
}

function errorFirstCallback(value, callback) {
  setTimeout(() => {
    if (typeof value !== 'number') {
      callback(new Error('Value must be a number'), null);
    } else if (value < 0) {
      callback(new Error('Value cannot be negative'), null);
    } else {
      callback(null, Math.sqrt(value));
    }
  }, 500);
}

module.exports = {
  simulateAsyncOperation,
  fetchUserData,
  fetchUserPosts,
  callbackHellExample,
  errorFirstCallback
};
