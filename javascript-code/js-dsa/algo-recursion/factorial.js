// Factorial of a non-negative integer n is the product of all positive integers less than or equal to n.
// Note that factorial of 0 is 1

console.log('Factorial Recursive');

// Recursive
function factorialRecursive(n) {
  if (n <= 0) return 1;
  return n * factorialRecursive(n - 1);
}

console.log(factorialRecursive(-5)); // 1
console.log(factorialRecursive(0)); // 1
console.log(factorialRecursive(5)); // 120

// Time Complexity: O(n)
// Space Complexity: O(n)

// ---------------------------------------------------------

// Memoization
function factorialMemoization(n, memo = {}) {
  if (n <= 0) return 1;
  if (n in memo) return memo[n];
  memo[n] = n * factorialMemoization(n - 1, memo);
  return memo[n];
}

console.log(factorialMemoization(-5)); // 1
console.log(factorialMemoization(0)); // 1
console.log(factorialMemoization(5)); // 120

// Time Complexity: O(n)
// Space Complexity: O(n)

module.exports = { factorialRecursive, factorialMemoization };