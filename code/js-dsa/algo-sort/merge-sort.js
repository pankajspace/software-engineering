// Merge Sort splits the array into halves, recursively sorts them, and merges the sorted halves.


console.log("Merge Sort");


// Short explanation of the merge sort algorithm for the array [5, 3, -2, 1, 6, 0]

// 1. Divide: Recursively split the array into halves until each subarray has one element.  
//    Split steps: `[5, 3, -2, 1, 6, 0] → [5, 3, -2]` and `[1, 6, 0]`  
//    Further split: `[5, 3, -2] → [5]`, `[3, -2] → [3]`, `[-2]`  
//    Similarly: `[1, 6, 0] → [1]`, `[6, 0] → [6]`, `[0]`.

// 2. Conquer (Merge): Merge the sorted subarrays back together:  
//    - Merge `[3]` and `[-2]` → `[-2, 3]`.  
//    - Merge `[5]` and `[-2, 3]` → `[-2, 3, 5]`.  
//    - Merge `[6]` and `[0]` → `[0, 6]`.  
//    - Merge `[1]` and `[0, 6]` → `[0, 1, 6]`.

// 3. Final Merge: Merge `[-2, 3, 5]` and `[0, 1, 6]` to get the sorted array:  
//    `[-2, 0, 1, 3, 5, 6]`.

// Final Sorted Array: `[-2, 0, 1, 3, 5, 6]`.

// Key Idea: Divide the array into smaller parts, sort them individually, and merge the sorted parts back together to get a fully sorted array.


// Diagram of the merge sort algorithm:

// [5, 3, -2, 1, 6, 0]
// Start dividing:
// [5, 3, -2] [1, 6, 0]
// [5, 3] [-2] [1, 6] [0]
// [5] [3] [-2] [1] [6] [0]
// Start merging:
// [3, 5] [-2] [1, 6] [0]
// [-2, 3, 5] [0, 1, 6]
// [-2, 0, 1, 3, 5, 6]


function mergeSort(arr) {
  if (arr.length <= 1) return arr;

  const middle = Math.floor(arr.length / 2);
  const [left, right] = [arr.slice(0, middle), arr.slice(middle)];

  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  let result = [];
  while (left.length && right.length) {
    result.push(left[0] < right[0] ? left.shift() : right.shift());
  }
  return [...result, ...left, ...right];
}


// Example Usage
console.log(mergeSort([5, 3, -2, 1, 6, 0])); // [-2, 0, 1, 3, 5, 6]


// Time complexity (average): O(n log n)
// Time complexity (best): O(n log n)
// Time complexity (worst): O(n log n)
// Space complexity: O(n)


// Use cases:

// Sorting Linked Lists: Merge Sort is particularly well-suited for linked lists because it does not require random access to elements, unlike Quick Sort or Heap Sort.
// Sorting elements in a linked list used in memory-efficient data structures.
// Rearranging nodes in a linked list-based priority queue.

// External Sorting (Large Datasets): Merge Sort divides the data into smaller chunks, processes them independently, and merges the results, making it ideal for sorting large datasets stored in external memory.
// Sorting very large log files or database records that cannot fit into main memory.
// External sorting in big data frameworks.

// Stable Sorting Requirement: Merge Sort is a stable sorting algorithm, preserving the relative order of equal elements, which is critical in multi-key sorting scenarios.
// Sorting customer records first by last name, then by first name.
// Organizing a dataset with secondary criteria, such as timestamp ordering.

// Sorting Data in Parallel Processing: Merge Sort's divide-and-conquer nature makes it inherently parallelizable, allowing parts of the data to be sorted independently.
// Sorting large datasets in parallel computing systems.
// Sorting operations in distributed systems or multi-threaded applications.

// Sorting Immutable Data: Merge Sort works well for datasets stored in immutable data structures, as it creates new sorted subarrays rather than modifying data in-place.
// Sorting immutable collections in functional programming languages like Haskell or Scala.
// Sorting read-only data structures in memory-constrained environments.


module.exports = mergeSort;