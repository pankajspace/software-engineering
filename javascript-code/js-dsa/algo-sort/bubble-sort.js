// Bubble Sort Algorithm. It is a simple sorting algorithm that works by repeatedly stepping through the list to be sorted, comparing each pair of adjacent items and swapping them if they are in the wrong order. The pass through the list is repeated until no swaps are needed, which indicates that the list is sorted. The algorithm gets its name from the way smaller elements "bubble" to the top of the list. 


console.log("Bubble Sort");


// Short explanation of the bubble sort algorithm for the array [5, 3, -2, 1, 6, 0]

// 1. Start at the beginning of the array and compare adjacent elements. Swap them if they are in the wrong order. Repeat this process for the entire array, pushing the largest element to the end:  
//    After 1st pass: `[3, -2, 1, 5, 0, 6]`.

// 2. Repeat the process for the rest of the array, excluding the last sorted element. Push the next largest element to its correct position:  
//    After 2nd pass: `[-2, 1, 3, 0, 5, 6]`.

// 3. Continue this process, reducing the unsorted portion each time:  
//    After 3rd pass: `[-2, 1, 0, 3, 5, 6]`.  
//    After 4th pass: `[-2, 0, 1, 3, 5, 6]`.

// Final Sorted Array: `[-2, 0, 1, 3, 5, 6]`.

// Key Idea: In each pass, repeatedly compare and swap adjacent elements if they are out of order, "bubbling" the largest unsorted element to its correct position. Repeat until the array is fully sorted.


// Diagram of the bubble sort algorithm:

// Pass 1:
// Compare 5 and 3 → Swap → [3, 5, -2, 1, 6, 0]
// Compare 5 and -2 → Swap → [3, -2, 5, 1, 6, 0]
// Compare 5 and 1 → Swap → [3, -2, 1, 5, 6, 0]
// Compare 5 and 6 → No Swap → [3, -2, 1, 5, 6, 0]
// Compare 6 and 0 → Swap → [3, -2, 1, 5, 0, 6]
// (Largest element 6 is now in its correct position.)

// Pass 2:
// Compare 3 and -2 → Swap → [-2, 3, 1, 5, 0, 6]
// Compare 3 and 1 → Swap → [-2, 1, 3, 5, 0, 6]
// Compare 3 and 5 → No Swap → [-2, 1, 3, 5, 0, 6]
// Compare 5 and 0 → Swap → [-2, 1, 3, 0, 5, 6]
// (Second largest element 5 is now in its correct position.)

// Pass 3:
// Compare -2 and 1 → No Swap → [-2, 1, 3, 0, 5, 6]
// Compare 1 and 3 → No Swap → [-2, 1, 3, 0, 5, 6]
// Compare 3 and 0 → Swap → [-2, 1, 0, 3, 5, 6]
// (Third largest element 3 is now in its correct position.)

// Pass 4:
// Compare -2 and 1 → No Swap → [-2, 1, 0, 3, 5, 6]
// Compare 1 and 0 → Swap → [-2, 0, 1, 3, 5, 6]
// (Fourth largest element 1 is now in its correct position.)

// Pass 5:
// Compare -2 and 0 → Swap → [-2, 0, 1, 3, 5, 6]
// (Fifth largest element 0 is now in its correct position.)


function bubbleSort(arr) {
  const end = arr.length - 1;
  for (let i = 0; i < end; i++) {
    // Loop through the unsorted part of the array
    for (let j = 0; j < end - i; j++) {
      // Swap if the current element is greater than the next element
      if (arr[j] > arr[j + 1]) {
        // You can use array destructuring to swap elements without a temporary variable
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}

// Example usage
console.log(bubbleSort([5, 3, -2, 1, 6, 0])); // [-2, 0, 1, 3, 5, 6]


// Time complexity (average): O(n^2)
// Time complexity (best): O(n)
// Time complexity (worst): O(n^2)
// Space complexity: O(1)


// Use cases:
// Small data sets: When the data set is small and simplicity is more important than efficiency, such as sorting 10–20 numbers in a classroom demonstration.
// Nearly sorted data: If the input data is almost sorted, Bubble Sort can perform efficiently due to its ability to detect early termination.
// Teaching: Bubble Sort can be used to teach sorting algorithms due to its simplicity and ease of understanding.


module.exports = bubbleSort;

