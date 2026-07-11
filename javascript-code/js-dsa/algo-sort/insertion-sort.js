// Insersion sort is a simple sorting algorithm that works by building a sorted array one element at a time. It is much less efficient on large lists than more advanced algorithms such as quicksort, heapsort, or merge sort.


console.log("Insertion Sort");


// Short explanation of the insertion sort algorithm for the array [5, 3, -2, 1, 6, 0]

// 1. Start with the second element (`3`). Compare it to the elements in the sorted portion (initially just `[5]`), shift larger elements to the right, and insert `3` in its correct position: `[3, 5, -2, 1, 6, 0]`.

// 2. Move to the next element (`-2`), compare it with the sorted portion `[3, 5]`, shift elements, and insert `-2` at the correct position: `[-2, 3, 5, 1, 6, 0]`.

// 3. Repeat with `1`. Compare it with the sorted portion `[-2, 3, 5]`, shift elements, and insert `1`: `[-2, 1, 3, 5, 6, 0]`.

// 4. For `6`, no shifting is needed as it’s already larger than all elements in the sorted portion `[-2, 1, 3, 5]`: `[-2, 1, 3, 5, 6, 0]`.

// 5. Finally, for `0`, compare with the sorted portion `[-2, 1, 3, 5, 6]`, shift larger elements, and insert `0`: `[-2, 0, 1, 3, 5, 6]`.

// Final Sorted Array: `[-2, 0, 1, 3, 5, 6]`.

// Key Idea: At each step, take one element from the unsorted portion, find its correct position in the sorted portion, and insert it there. Repeat until the entire array is sorted.



// Diagram of the insertion sort algorithm:

// [5, 3, -2, 1, 6, 0]
// [3, 5, -2, 1, 6, 0]
// [-2, 3, 5, 1, 6, 0]
// [-2, 1, 3, 5, 6, 0]
// [-2, 1, 3, 5, 6, 0]
// [-2, 0, 1, 3, 5, 6]


function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let current = arr[i];

    // Move elements of arr[0..i-1], that are greater than current, to one position ahead of their current position 
    // It will stop when the current element is greater than the element at index j
    // This loops runs from right to left, shifting elements to the right
    let j = i - 1;
    while (j >= 0 && arr[j] > current) {
      arr[j + 1] = arr[j];
      j--;
    }

    arr[j + 1] = current;
  }

  return arr;
}


// Example Usage
console.log(insertionSort([5, 3, -2, 1, 6, 0])); // [-2, 0, 1, 3, 5, 6]


// Time complexity (average): O(n^2)
// Time complexity (best): O(n)
// Time complexity (worst): O(n^2)
// Space complexity: O(1)


// Use cases:
// Online Sorting: Useful when elements arrive sequentially (e.g., streaming data) and need to be sorted as they are received.
// Small Data Sets: Sorting small lists like scores in a game, where efficiency is not critical but ease of implementation is important.
// Nearly Sorted Data: It works efficiently on nearly sorted data, making it suitable for tasks like maintaining a sorted list of elements with occasional updates.


module.exports = insertionSort;

