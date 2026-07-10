// Prime number is a number that is greater than 1 and divided by 1 or itself only. In other words, prime numbers can't be divided by other numbers than itself or 1. For example 2, 3, 5, 7, 11, 13, 17.... are the prime numbers.

console.log('Prime');

// Iterative
function isPrimeIterative(n) {
  if (n <= 1) return false;
  for (let i = 2; i < n; i++) {
    if (n % i === 0) return false;
  }
  return true;
}

console.log(isPrimeIterative(0)); // false
console.log(isPrimeIterative(1)); // false
console.log(isPrimeIterative(2)); // true
console.log(isPrimeIterative(3)); // true

// Time Complexity: O(n)
// Space Complexity: O(1)

// ---------------------------------------------------------

// Recursive
function isPrimeRecursive(n, i = 2) {
  if (n <= 1) return false;
  if (n === i) return true;
  if (n % i === 0) return false;
  return isPrimeRecursive(n, i + 1);
}

console.log(isPrimeRecursive(0)); // false
console.log(isPrimeRecursive(1)); // false
console.log(isPrimeRecursive(2)); // true
console.log(isPrimeRecursive(3)); // true

// Time Complexity: O(n)
// Space Complexity: O(n)

module.exports = { isPrimeIterative, isPrimeRecursive };