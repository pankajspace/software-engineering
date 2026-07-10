// Binary Search Algorithm

console.log("Binary Search");

// Iterative approach
function binarySearchIterative(arr, key) {
  let leftIndex = 0;
  let rightIndex = arr.length - 1;

  while (leftIndex <= rightIndex) {
    let middleIndex = Math.floor((rightIndex + leftIndex) / 2);

    if (key == arr[middleIndex]) {
      return middleIndex;
    }

    if (key < arr[middleIndex]) {
      rightIndex = middleIndex - 1;
    }

    if (key > arr[middleIndex]) {
      leftIndex = middleIndex + 1;
    }
  }

  return -1
}

const arr1 = [1, 2, 3, 4, 5, 6, 7, 8, 9];

console.log(binarySearchIterative(arr1, 8)); // 7
console.log(binarySearchIterative(arr1, 10)); // -1

// Time complexity: O(log n)
// Space complexity: O(1)

// ------------------------------

// Recursive approach
function binarySearchRecursive(arr, key, leftIndex = 0, rightIndex = arr.length - 1) {
  let middleIndex = Math.floor((rightIndex + leftIndex) / 2);

  if (leftIndex > rightIndex) {
    return -1;
  }

  if (key == arr[middleIndex]) {
    return middleIndex;
  }

  if (key < arr[middleIndex]) {
    rightIndex = middleIndex - 1;
  }

  if (key > arr[middleIndex]) {
    leftIndex = middleIndex + 1;
  }

  return binarySearchRecursive(arr, key, leftIndex, rightIndex);
}

const arr2 = [1, 2, 3, 4, 5, 6, 7, 8, 9];

console.log(binarySearchIterative(arr2, 8)); // 7
console.log(binarySearchIterative(arr2, 10)); // -1

// Time complexity: O(log n)
// Space complexity: O(log n)

//---------------------------

// Recursive approach with only one parameter
function binarySearchRecursiveOneParameter(arr, key) {
  function search(arr, key, leftIndex, rightIndex) {
    let middleIndex = Math.floor((rightIndex + leftIndex) / 2);

    if (leftIndex > rightIndex) {
      return -1;
    }

    if (key == arr[middleIndex]) {
      return middleIndex;
    }

    if (key < arr[middleIndex]) {
      rightIndex = middleIndex - 1;
    }

    if (key > arr[middleIndex]) {
      leftIndex = middleIndex + 1;
    }

    return search(arr, key, leftIndex, rightIndex);
  }

  return search(arr, key, 0, arr.length - 1);
}

const arr3 = [1, 2, 3, 4, 5, 6, 7, 8, 9];

console.log(binarySearchRecursiveOneParameter(arr3, 8)); // 7
console.log(binarySearchRecursiveOneParameter(arr3, 10)); // -1

// Time complexity: O(log n)
// Space complexity: O(log n)

module.exports = { binarySearchIterative, binarySearchRecursive, binarySearchRecursiveOneParameter };