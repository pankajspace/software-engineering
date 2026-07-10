// Linear search algorithm

console.log("Linear Search");

// Itrative approach
function linearSearchIterative(arr, key) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === key) {
      return i;
    }
  }
  return -1;
}

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

console.log(linearSearchIterative(arr, 8)); // 7
console.log(linearSearchIterative(arr, 10)); // -1

// Time complexity: O(n)
// Space complexity: O(1)

// ------------------------------

// Recursive approach
function linearSearchRecursive(arr, key, index = 0) {
  if (index >= arr.length) {
    return -1;
  }
  if (arr[index] === key) {
    return index;
  }
  return linearSearchRecursive(arr, key, index + 1);
}

console.log(linearSearchRecursive(arr, 8)); // 7
console.log(linearSearchRecursive(arr, 10)); // -1

// Time complexity: O(n)
// Space complexity: O(n)

module.exports = { linearSearchIterative, linearSearchRecursive };

