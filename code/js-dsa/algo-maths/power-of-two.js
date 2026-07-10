// Power of Two means a number which can be represented as 2^N where N is an integer. 
// For example, 1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048... are power of two numbers.

console.log('Power of Two Iterative');

// Iterative
function isPowerOfTwoIterative(n) {
  if (n <= 0) return false;
  while (n % 2 === 0) {
    n /= 2;
  }
  return n === 1;
}

console.log(isPowerOfTwoIterative(1)); // true (2^0)
console.log(isPowerOfTwoIterative(2)); // true (2^1)
console.log(isPowerOfTwoIterative(3)); // false
console.log(isPowerOfTwoIterative(4)); // true (2^2)

// Time Complexity: O(log n)
// Space Complexity: O(1)

// ---------------------------------------------------------

// Bitwise
function isPowerOfTwoBitwise(n) {
  if (n <= 0) return false;
  return (n & (n - 1)) === 0;
}

console.log(isPowerOfTwoBitwise(1)); // true (2^0)
console.log(isPowerOfTwoBitwise(2)); // true (2^1)
console.log(isPowerOfTwoBitwise(3)); // false
console.log(isPowerOfTwoBitwise(4)); // true (2^2)

// Time Complexity: O(1)
// Space Complexity: O(1)

module.exports = { isPowerOfTwoIterative, isPowerOfTwoBitwise };