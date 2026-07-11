// Tim Sort: A hybrid sorting algorithm derived from merge sort and insertion sort. It divides the array into blocks, sorts them using insertion sort, and merges them using merge sort. 


// console.log("Tim Sort");


// Short explanation of the Tim Sort algorithm for the array [5, 3, -2, 1, 6, 0]

// 1. Divide into Runs: Split the array into small chunks (called "runs") of a predefined size (e.g., 32 or less). Each run is sorted individually using Insertion Sort.  
//    Example: Split `[5, 3, -2, 1, 6, 0]` into smaller sorted runs: `[-2, 3, 5]` and `[0, 1, 6]`.

// 2. Merge Runs: Merge the sorted runs using a method similar to Merge Sort, maintaining the order.  
//    Merge `[-2, 3, 5]` and `[0, 1, 6]` to get the final sorted array.

// Final Sorted Array: `[-2, 0, 1, 3, 5, 6]`.

// Key Idea: Tim Sort combines the simplicity of Insertion Sort for small arrays and the efficiency of Merge Sort for larger ones. It is designed to perform well on real-world data by leveraging already sorted subsequences.


// Diagram of the Tim Sort algorithm:

// Step 1: Split Array into Runs
// [5, 3, -2, 1, 6, 0]
// Run 1: [5, 3] Run 2: [-2, 1] Run 3: [6, 0]

// Step 2: Sort Runs using Insertion Sort
// [3, 5]   [-2, 1]   [0, 6]

// Step 3: Merge Adjacent Runs
// [3, 5] + [-2, 1] → [-2, 1, 3, 5]

// Step 4: Merge Remaining Runs
// [-2, 1, 3, 5] + [0, 6] → [-2, 0, 1, 3, 5, 6]



// Minimum size of a run
const MIN_RUN = 32;

// Insertion Sort for sorting small chunks
function insertionSort(array, left, right) {
  for (let i = left + 1; i <= right; i++) {
    let temp = array[i];
    let j = i - 1;
    while (j >= left && array[j] > temp) {
      array[j + 1] = array[j];
      j--;
    }
    array[j + 1] = temp;
  }
}

// Merge two sorted subarrays
function merge(array, left, mid, right) {
  const len1 = mid - left + 1;
  const len2 = right - mid;

  const leftPart = array.slice(left, mid + 1);
  const rightPart = array.slice(mid + 1, right + 1);

  let i = 0, j = 0, k = left;

  while (i < len1 && j < len2) {
    if (leftPart[i] <= rightPart[j]) {
      array[k++] = leftPart[i++];
    } else {
      array[k++] = rightPart[j++];
    }
  }

  // Copy remaining elements of leftPart
  while (i < len1) {
    array[k++] = leftPart[i++];
  }

  // Copy remaining elements of rightPart
  while (j < len2) {
    array[k++] = rightPart[j++];
  }
}

// Tim Sort implementation
function timSort(array) {
  const n = array.length;

  // Step 1: Sort small chunks using Insertion Sort
  for (let i = 0; i < n; i += MIN_RUN) {
    const left = i;
    const right = Math.min(i + MIN_RUN - 1, n - 1);
    insertionSort(array, left, right);
  }

  // Step 2: Merge sorted chunks using Merge Sort logic
  for (let size = MIN_RUN; size < n; size = 2 * size) {
    for (let left = 0; left < n; left += 2 * size) {
      const mid = Math.min(left + size - 1, n - 1);
      const right = Math.min(left + 2 * size - 1, n - 1);

      if (mid < right) {
        merge(array, left, mid, right);
      }
    }
  }
}


// Example Usage
console.log(timSort([5, 3, -2, 1, 6, 0])); // [-2, 0, 1, 3, 5, 6]


// Time complexity (average): O(n log n)
// Time complexity (best): O(n)
// Time complexity (worst): O(n log n)
// Space complexity: O(n)


// Use cases:

// Sorting Partially Ordered Data: Tim Sort is designed to exploit "runs" (naturally ordered sub-sequences) in the data, making it extremely efficient for real-world data that is often partially sorted. 
// Sorting transaction logs where new records are appended to an already sorted list.
// Sorting names in an address book that is frequently updated.

// Large Scale Data Processing: Tim Sort’s efficient memory usage and stable sorting make it suitable for processing large datasets entirely in memory, often encountered in analytics and machine learning workflows.
// Preprocessing large datasets for training machine learning models (e.g., sorting rows or columns).
// Sorting large CSV or JSON files in data wrangling.

// Merging Sorted Data: Tim Sort excels at merging pre-sorted data efficiently. It’s particularly effective when dealing with sorted data from multiple sources.
// Merging sorted results from distributed systems in big data frameworks.
// Combining sorted streams of log files or event data.

// Applications Requiring Stable Sorting: Tim Sort is stable, meaning it maintains the relative order of equal elements, which is critical in many applications.
// Sorting employee records first by department, then by name (multi-key sorting).
// Sorting transactions while maintaining the order of equal timestamps.


module.exports = timSort;