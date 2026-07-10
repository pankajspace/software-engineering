// Selecion Sort Algorithm. It is a simple sorting algorithm that works by selecting the smallest (or largest, depending on sorting order) element from the unsorted portion of the array and moving it to the beginning of the array by swapping it with the first element of the unsorted portion.


console.log("Selection Sort");


// Short explanation of the selection sort algorithm for the array [5, 3, -2, 1, 6, 0]

// 1. Start with the first element. Find the smallest element in the entire array (`-2`), and swap it with the first element: `[-2, 3, 5, 1, 6, 0]`.

// 2. Move to the second element. Find the smallest element in the remaining array (`0`), and swap it with the second element: `[-2, 0, 5, 1, 6, 3]`.

// 3. Move to the third element. Find the smallest element in the remaining array (`1`), and swap it with the third element: `[-2, 0, 1, 5, 6, 3]`.

// 4. Move to the fourth element. Find the smallest element in the remaining array (`3`), and swap it with the fourth element: `[-2, 0, 1, 3, 6, 5]`.

// 5. Move to the fifth element. Find the smallest element in the remaining array (`5`), and swap it with the fifth element: `[-2, 0, 1, 3, 5, 6]`.

// 6. The last element is now in its correct position. The array is sorted.

// Final Sorted Array: `[-2, 0, 1, 3, 5, 6]`.

// Key Idea: At each step, find the smallest element from the unsorted portion of the array and swap it with the first element of the unsorted portion. Repeat until the array is fully sorted.


// Diagram of the selection sort algorithm:
// [5, 3, -2, 1, 6, 0]
// [-2, 3, 5, 1, 6, 0]
// [-2, 0, 5, 1, 6, 3]
// [-2, 0, 1, 5, 6, 3]
// [-2, 0, 1, 3, 6, 5]
// [-2, 0, 1, 3, 5, 6]


function selectionSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    let minIndex = i;

    // Find the smallest element in the unsorted part of the array
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }

    // You can use array destructuring to swap elements without a temporary variable
    if (minIndex !== i) { // Skip swapping if the minimum element is already at the correct position
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }

  return arr;
}


// Example Usage
console.log(selectionSort([5, 3, -2, 1, 6, 0])); // [-2, 0, 1, 3, 5, 6]


// Time complexity (average): O(n^2)
// Time complexity (best): O(n^2)
// Time complexity (worst): O(n^2)
// Space complexity: O(1)


// Use cases:
// Memory-Constrained Environments: Selection Sort works well in situations where memory usage must be minimized since it requires only constant space for sorting.
// Sorting Items with High Swap Costs: Useful in cases where swapping is expensive, such as sorting large records where moving data is costly.
// Teaching : Often used for teaching sorting concepts due to its straightforward implementation and clear step-by-step operation.


module.exports = selectionSort;
