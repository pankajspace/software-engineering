// Problem: Given n stairs, find the number of ways to reach the top if you can climb 1 or 2 stairs at a time.


// Example
// climbStairs(1); // 1 (1)
// climbStairs(2); // 2 (1+1, 2)
// climbStairs(3); // 3 (1+1+1, 1+2, 2+1)
// climbStairs(4); // 5 (1+1+1+1, 1+1+2, 1+2+1, 2+1+1, 2+2)


function climbStairsIterative(n) {
  const noOfWays = [1, 2]
  for (let i = 2; i <= n; i++) {
    noOfWays[i] = noOfWays[i - 1] + noOfWays[i - 2]
  }
  return noOfWays[n - 1]
}


console.log("climbStairsIterative(1)", climbStairsIterative(1)); // 1
console.log("climbStairsIterative(4)", climbStairsIterative(4)); // 5


// Time Complexity
// The time complexity of this algorithm is O(n) where n is the number of stairs.

// Space Complexity
// The space complexity of this algorithm is O(1).



function climbStairsRecursive(n) {
  if (n <= 2) return n;
  return climbStairsRecursive(n - 1) + climbStairsRecursive(n - 2);
}


console.log("climbStairsRecursive(1)", climbStairsRecursive(1)); // 1
console.log("climbStairsRecursive(4)", climbStairsRecursive(4)); // 5


// Time Complexity
// The time complexity of this algorithm is O(2^n) where n is the number of stairs.

// Space Complexity
// The space complexity of this algorithm is O(n) where n is the number of stairs.


module.exports = { climbStairsIterative, climbStairsRecursive };
