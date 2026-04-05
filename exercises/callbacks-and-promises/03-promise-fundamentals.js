function createSimplePromise(value) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (value < 0) {
        reject(new Error('Value cannot be negative'));
      } else {
        resolve(value * 2);
      }
    }, 500);
  });
}

function convertCallbackToPromise(simulateAsyncOp) {
  return new Promise((resolve, reject) => {
    simulateAsyncOp((error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

function fetchUserDataPromise(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId > 0) {
        resolve({
          id: userId,
          name: `User ${userId}`,
          email: `user${userId}@example.com`
        });
      } else {
        reject(new Error('Invalid user ID'));
      }
    }, 800);
  });
}

function fetchUserPostsPromise(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([
        { id: 1, title: 'Post 1', content: 'Content 1', userId: userId },
        { id: 2, title: 'Post 2', content: 'Content 2', userId: userId }
      ]);
    }, 600);
  });
}

function fetchPostCommentsPromise(postId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([
        { id: 1, text: 'Great post!', postId: postId },
        { id: 2, text: 'Thanks for sharing', postId: postId }
      ]);
    }, 400);
  });
}

function chainedPromiseOperations(userId) {
  return fetchUserDataPromise(userId)
    .then(user => {
      return fetchUserPostsPromise(user.id)
        .then(posts => ({
          user: user,
          posts: posts
        }));
    })
    .then(data => {
      const postIds = data.posts.map(p => p.id);
      return Promise.all(postIds.map(id => fetchPostCommentsPromise(id)))
        .then(commentsArray => ({
          ...data,
          comments: commentsArray
        }));
    })
    .catch(error => {
      console.error('Error in promise chain:', error.message);
      throw error;
    });
}

function promiseErrorHandling(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!url || url === '') {
        reject(new Error('URL is required'));
      } else if (!url.startsWith('http')) {
        reject(new Error('Invalid URL format'));
      } else {
        resolve({ success: true, data: `Fetched from ${url}` });
      }
    }, 500);
  });
}

module.exports = {
  createSimplePromise,
  convertCallbackToPromise,
  fetchUserDataPromise,
  fetchUserPostsPromise,
  fetchPostCommentsPromise,
  chainedPromiseOperations,
  promiseErrorHandling
};
