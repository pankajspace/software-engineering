// Power of Two means a number which can be represented as 2^N where N is an integer. 
// For example, 1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048... are power of two numbers.

console.log('Power of Two Recursive');

// Recursive
function isPowerOfTwoRecursive(n) {
  if (n <= 0) return false;
  if (n === 1) return true;
  if (n % 2 !== 0) return false;
  return isPowerOfTwoRecursive(n / 2);
}

console.log(isPowerOfTwoRecursive(1)); // true (2^0)
console.log(isPowerOfTwoRecursive(2)); // true (2^1)
console.log(isPowerOfTwoRecursive(3)); // false
console.log(isPowerOfTwoRecursive(4)); // true (2^2)

// Time Complexity: O(log n)
// Space Complexity: O(log n)

// ---------------------------------------------------------

// memoization
function isPowerOfTwoMemoization(n, memo = {}) {
  if (n <= 0) return false;
  if (n in memo) return memo[n];
  memo[n] = n === 1 || (n % 2 === 0 && isPowerOfTwoMemoization(n / 2, memo));
  return memo[n];
}

console.log(isPowerOfTwoMemoization(1)); // true (2^0)
console.log(isPowerOfTwoMemoization(2)); // true (2^1)
console.log(isPowerOfTwoMemoization(3)); // false
console.log(isPowerOfTwoMemoization(4)); // true (2^2)

// Time Complexity: O(log n)
// Space Complexity: O(log n)

module.exports = { isPowerOfTwoRecursive, isPowerOfTwoMemoization };