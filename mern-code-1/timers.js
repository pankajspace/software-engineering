// The setImmediate(), setInterval(), and setTimeout() methods each return objects that represent the scheduled timers. 
// These can be used to cancel the timer and prevent it from triggering.
const timeoutObj = setTimeout(() => {
  console.log('timeout beyond time');
}, 2000);
// clearTimeout(timeoutObj);

const immediateObj = setImmediate(() => {
  console.log('immediately executing immediate');
});
// clearImmediate(immediateObj);

const intervalObj = setInterval(() => {
  console.log('interviewing the interval');
}, 2000);
clearInterval(intervalObj);

// For the promisified variants of setImmediate() and setTimeout(), an AbortController may be used to cancel the timer. 
// When canceled, the returned Promises will be rejected with an 'AbortError'.

// setImmediate example:
const { setImmediate: setImmediatePromise } = require('node:timers/promises');
const ac1 = new AbortController();
const signal1 = ac1.signal;
setImmediatePromise('foobar', { signal1 })
  .then(console.log)
  .catch((err) => {
    if (err.name === 'AbortError')
      console.error('The immediate was aborted');
  });
ac1.abort();

// setTimeout example:
const { setTimeout: setTimeoutPromise } = require('node:timers/promises');
const ac2 = new AbortController();
const signal = ac2.signal;
setTimeoutPromise(2000, 'foobar', { signal })
  .then(console.log)
  .catch((err) => {
    if (err.name === 'AbortError')
      console.error('The timeout was aborted');
  });
ac2.abort();