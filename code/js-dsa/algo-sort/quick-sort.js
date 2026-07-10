// Quick Sort is a divide-and-conquer algorithm that works by selecting a pivot element from the array and partitioning the other elements into two sub-arrays according to whether they are less than or greater than the pivot. The sub-arrays are then sorted recursively. This can be done in-place, requiring small additional amounts of memory to perform the sorting. Quick Sort is often faster in practice than other O(n log n) algorithms, such as Merge Sort or Heap Sort. 


console.log("Quick Sort");


// Concise explanation of the quick sort algorithm for the array [5, 3, -2, 1, 6, 0]

// 1. Choose Pivot: Select the last element, `0`, as the pivot.

// 2. Partition: Rearrange the array so that:
//    - Elements smaller than or equal to `0` go to the left.
//    - Elements greater than `0` go to the right.
//    - Result: `[-2, 0, 3, 1, 6, 5]`. Pivot `0` is at its correct position (index 1).

// 3. Recursively Sort Left Sub-Array: `[-2]` (already sorted, single element).

// 4. Recursively Sort Right Sub-Array: `[3, 1, 6, 5]`.
//    - Choose pivot `5`.
//    - Partition: `[3, 1, 5, 6]`. Pivot `5` is at its correct position (index 2).
//    - Recursively sort `[3, 1]`.

// 5. Sort `[3, 1]`:
//    - Choose pivot `1`.
//    - Partition: `[1, 3]`. Pivot `1` is at its correct position (index 0).

// 6. Combine:
//    - Sorted left: `[-2]`.
//    - Pivot `0`.
//    - Sorted right: `[1, 3, 5, 6]`.

// Final Sorted Array: `[-2, 0, 1, 3, 5, 6]`.


// Diagram of the quick sort algorithm:

// [5, 3, -2, 1, 6, 0]
// Pivot: 0
// Partition: [-2, 0, 3, 1, 6, 5]
// Left: [-2], Right: [3, 1, 6, 5]
// Pivot: 5
// Partition: [3, 1, 5, 6]
// Left: [3, 1], Right: [6]
// Pivot: 1
// Partition: [1, 3]
// Left: [1], Right: [3]
// All partitions: [-2], [0], [1], [3], [5], [6]
// All partitions complete - combine subarrays
// Sorted: [-2, 0, 1, 3, 5, 6]


function quickSort(arr) {
  if (arr.length <= 1) return arr;

  const pivot = arr[arr.length - 1];
  const left = [];
  const right = [];

  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  return [...quickSort(left), pivot, ...quickSort(right)];
}

// Alternative in-place quick sort implementation
function quickSortInPlace(arr, left = 0, right = arr.length - 1) {
  if (left < right) {
    const pivot = partition(arr, left, right)
    quickSort(arr, left, pivot - 1)
    quickSort(arr, pivot + 1, right)
  }
  return arr
}

function partition(arr, left, right) {
  const pivot = arr[right]
  let i = left
  for (let j = left; j < right; j++) {
    if (arr[j] < pivot) {
      // Swap using destructuring assignment
      [arr[i], arr[j]] = [arr[j], arr[i]]
      i++
    }
  }
  // Swap using destructuring assignment
  [arr[i], arr[right]] = [arr[right], arr[i]]
  return i
}

// Alternate one-liner quick sort implementation
const quickSortOneLiner = arr => arr.length <= 1 ? arr : [...quickSortOneLiner(arr.filter(x => x < arr[0])), arr[0], ...quickSortOneLiner(arr.filter(x => x > arr[0]))];


// Example Usage
console.log(quickSort([5, 3, -2, 1, 6, 0])); // [-2, 0, 1, 3, 5, 6]
console.log(quickSortInPlace([5, 3, -2, 1, 6, 0])); // [-2, 0, 1, 3, 5, 6]
console.log(quickSortOneLiner([5, 3, -2, 1, 6, 0])); // [-2, 0, 1, 3, 5, 6]


// Time complexity (average): O(n log n)
// Time complexity (best): O(n log n)
// Time complexity (worst): O(n^2)
// Space complexity: O(n)


// Use cases:

// General-Purpose In-Memory Sorting: Quick Sort is one of the fastest sorting algorithms for in-memory data due to its efficient average-case time complexity of O(n log n).
// Sorting arrays or lists in applications requiring fast in-memory operations.
// Organizing data for immediate access in systems like inventory management or user interfaces.

// Divide-and-Conquer Algorithm Basis: Quick Sort's divide-and-conquer approach can be adapted for solving other problems that benefit from recursive partitioning.
// Partitioning problems in computational geometry, such as finding the k-th smallest element.
// Efficiently dividing workloads in distributed computing systems.

// Sorting Large Datasets with Random Distribution: Quick Sort works efficiently for large datasets that are randomly distributed, as it minimizes overhead compared to other algorithms like Merge Sort.
// Sorting unsorted datasets in search engines or e-commerce platforms.
// Arranging data points for clustering or machine learning pre-processing.


module.exports = quickSort;