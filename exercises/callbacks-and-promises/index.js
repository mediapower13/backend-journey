const callbacks = require('./01-callbacks-basics');
const { SimpleEventEmitter, DataProcessor } = require('./02-event-emitter');
const promises = require('./03-promise-fundamentals');
const advancedPromises = require('./04-advanced-promises');

function callbackExamples() {
  console.log('=== CALLBACK EXAMPLES ===\n');

  console.log('1. Simple Async Operation:');
  callbacks.simulateAsyncOperation(5, (err, result) => {
    if (err) {
      console.error('Error:', err.message);
    } else {
      console.log('Result:', result);
    }
  });

  console.log('\n2. Error-First Callback:');
  callbacks.errorFirstCallback(16, (err, result) => {
    if (err) {
      console.error('Error:', err.message);
    } else {
      console.log('Square root:', result);
    }
  });

  console.log('\n3. Callback Hell Example:');
  callbacks.callbackHellExample(1, (err, result) => {
    if (err) {
      console.error('Error:', err.message);
    } else {
      console.log('Combined result:', result);
    }
  });
}

function eventEmitterExamples() {
  console.log('\n=== EVENT EMITTER EXAMPLES ===\n');

  const processor = new DataProcessor();

  processor.on('data:added', (item) => {
    console.log('Data added:', item);
  });

  processor.once('data:added', (item) => {
    console.log('First data add (once):', item);
  });

  processor.on('process:complete', (data) => {
    console.log('Processing complete:', data.length, 'items');
  });

  processor.addData({ name: 'Item 1' });
  processor.addData({ name: 'Item 2' });
  processor.addData({ name: 'Item 3' });

  processor.processData((err, result) => {
    if (err) console.error('Error:', err);
  });
}

async function promiseExamples() {
  console.log('\n=== PROMISE EXAMPLES ===\n');

  try {
    console.log('1. Simple Promise:');
    const result1 = await promises.createSimplePromise(10);
    console.log('Result:', result1);

    console.log('\n2. Promise Chaining:');
    const chainedResult = await promises.chainedPromiseOperations(1);
    console.log('User:', chainedResult.user.name);
    console.log('Posts:', chainedResult.posts.length);
    console.log('Comments:', chainedResult.comments.flat().length);

    console.log('\n3. Error Handling:');
    try {
      await promises.promiseErrorHandling('');
    } catch (error) {
      console.log('Caught error:', error.message);
    }

    console.log('\n4. Valid URL:');
    const validResult = await promises.promiseErrorHandling('https://example.com');
    console.log('Success:', validResult.success);

  } catch (error) {
    console.error('Promise error:', error.message);
  }
}

async function advancedPromiseExamples() {
  console.log('\n=== ADVANCED PROMISE EXAMPLES ===\n');

  try {
    console.log('1. Promise.all (Parallel):');
    const results = await advancedPromises.parallelPromises([
      promises.createSimplePromise(1),
      promises.createSimplePromise(2),
      promises.createSimplePromise(3)
    ]);
    console.log('Parallel results:', results);

    console.log('\n2. Promise.race (First to complete):');
    const raceResult = await advancedPromises.racePromises([
      promises.createSimplePromise(1),
      promises.createSimplePromise(2)
    ]);
    console.log('Race winner:', raceResult);

    console.log('\n3. Promise.allSettled:');
    const settledResults = await advancedPromises.allSettledExample([
      promises.createSimplePromise(5),
      promises.createSimplePromise(-1),
      promises.createSimplePromise(10)
    ]);
    console.log('Fulfilled:', settledResults.fulfilled.length);
    console.log('Rejected:', settledResults.rejected.length);

  } catch (error) {
    console.error('Advanced promise error:', error.message);
  }
}

async function runAllExamples() {
  callbackExamples();
  eventEmitterExamples();
  
  await new Promise(resolve => setTimeout(resolve, 3000));

  await promiseExamples();
  await advancedPromiseExamples();

  console.log('\n=== EXAMPLES COMPLETE ===');
}

runAllExamples().catch(console.error);

module.exports = {
  callbackExamples,
  eventEmitterExamples,
  promiseExamples,
  advancedPromiseExamples
};
