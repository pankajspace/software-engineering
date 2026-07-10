// Fibonacci Series: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, ...

console.log("Fibonacci Recursive");

// Print nth Fibonacci Number using recursive approach
function fibonacciRecursive(n) {
  if (n <= 1) return n;

  return fibonacciRecursive(n - 1) + fibonacciRecursive(n - 2);
}

console.log("0 : ", fibonacciRecursive(0)); // 0
console.log("1 : ", fibonacciRecursive(1)); // 1
console.log("9 : ", fibonacciRecursive(9)); // 34

// Time Complexity: O(2^n)
// Space Complexity: O(n)

// ----------------------------------------------------------------

// Print nth Fibonacci Number using memoization
function fibonacciMemoization(n, memo = {}) {
  if (n in memo) return memo[n];

  if (n <= 1) return n;

  memo[n] = fibonacciMemoization(n - 1, memo) + fibonacciMemoization(n - 2, memo);

  return memo[n];
}

console.log("0 : ", fibonacciMemoization(0)); // 0
console.log("1 : ", fibonacciMemoization(1)); // 1
console.log("9 : ", fibonacciMemoization(9)); // 34

// Time Complexity: O(n)
// Space Complexity: O(n)


module.exports = {
  fibonacciRecursive,
  fibonacciMemoization
};