// Factorial of a non-negative integer n is the product of all positive integers less than or equal to n.
// Note that factorial of 0 is 1

console.log('Factorial Iterative');

// Iterative
function factorialIterative(n) {
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

console.log(factorialIterative(-5)); // 1
console.log(factorialIterative(0)); // 1
console.log(factorialIterative(5)); // 120

// Time Complexity: O(n)
// Space Complexity: O(1)

module.exports = { factorialIterative };