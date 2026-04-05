function executeWithRetry(fn, maxRetries = 3) {
  return fn()
    .catch(error => {
      if (maxRetries > 0) {
        return executeWithRetry(fn, maxRetries - 1);
      }
      throw error;
    });
}

function parallelPromises(promises) {
  return Promise.all(promises);
}

function racePromises(promises) {
  return Promise.race(promises);
}

function promiseTimeout(promise, ms) {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error(`Operation timeout after ${ms}ms`)), ms)
    )
  ]);
}

function fetchWithFallback(primaryUrl, fallbackUrl) {
  return fetch(primaryUrl)
    .catch(() => fetch(fallbackUrl))
    .then(response => {
      if (!response.ok) throw new Error('Fetch failed');
      return response.json();
    })
    .catch(error => {
      throw new Error(`All attempts failed: ${error.message}`);
    });
}

function sequentialPromises(tasks) {
  return tasks.reduce((promise, task) => {
    return promise.then(results => {
      return task().then(result => {
        results.push(result);
        return results;
      });
    });
  }, Promise.resolve([]));
}

function finallyExample(operation) {
  return operation()
    .then(result => {
      return result;
    })
    .catch(error => {
      throw error;
    })
    .finally(() => {
      console.log('Cleanup: Operation finished');
    });
}

function allSettledExample(promises) {
  return Promise.allSettled(promises)
    .then(results => {
      return {
        fulfilled: results
          .filter(r => r.status === 'fulfilled')
          .map(r => r.value),
        rejected: results
          .filter(r => r.status === 'rejected')
          .map(r => r.reason)
      };
    });
}

module.exports = {
  executeWithRetry,
  parallelPromises,
  racePromises,
  promiseTimeout,
  fetchWithFallback,
  sequentialPromises,
  finallyExample,
  allSettledExample
};
