// Heap Sort is a comparison-based sorting algorithm that uses a binary heap data structure to sort elements. It divides its input into a sorted and an unsorted region, and it iteratively shrinks the unsorted region by extracting the largest element and moving that to the sorted region. The heap data structure is used to find the maximum (or minimum) element and remove it from the heap, which is then placed at the end of the sorted region. The process is repeated until the unsorted region is empty. 


console.log("Heap Sort");


// Short explanation of the heap sort algorithm for the array [5, 3, -2, 1, 6, 0]

// 1. Build a Max Heap: Rearrange the array into a max heap, where the largest element is the root of the heap (top of the tree).  
//    After building the heap: `[6, 5, 0, 1, 3, -2]`.

// 2. Extract the Largest Element: Swap the root (largest element) with the last element, then reduce the heap size by 1 and heapify the remaining heap to maintain the max heap property.  
//    After the first swap and heapify: `[5, 3, 0, 1, -2, 6]`.

// 3. Repeat: Continue swapping the root with the last unsorted element and heapify until the heap size is 1.

// 4. Sorted Array: After all iterations, the array becomes sorted: `[-2, 0, 1, 3, 5, 6]`.

// Key Idea: Transform the array into a heap, repeatedly extract the largest element, and rebuild the heap until the array is sorted.


// Diagram of the heap sort algorithm:

// [5, 3, -2, 1, 6, 0]
// Build Max Heap: [6, 3, 5, 1, -2, 0]
// Swap 6 and 0: [0, 3, 5, 1, -2, 6]
// Re heapify remaining elements: [5, 3, 0, 1, -2, 6] hip size: 5 because 6 is already in place
// Swap 5 and -2: [-2, 3, 0, 1, 5, 6]
// Re heapify remaining elements: [3, 1, 0, -2, 5, 6] hip size: 4
// Swap 3 and -2: [-2, 1, 0, 3, 5, 6]
// Re heapify remaining elements: [1, 3, 0, -2, 5, 6] hip size: 3
// Swap 1 and -2: [-2, 3, 0, 1, 5, 6]
// Re heapify remaining elements: [3, 1, 0, -2, 5, 6] hip size: 2
// Swap 3 and 0: [0, 1, 3, -2, 5, 6]
// Re heapify remaining elements: [1, 0, 3, -2, 5, 6] hip size: 1
// Swap 1 and -2: [-2, 0, 1, 3, 5, 6]
// Re heapify remaining elements: [0, -2, 1, 3, 5, 6] hip size: 0
// Sorted Array: [-2, 0, 1, 3, 5, 6]


function heapSort(arr) {
  let n = arr.length;

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }

  // Heap sort
  for (let i = n - 1; i > 0; i--) {
    // Move current root to end
    let temp = arr[0];
    arr[0] = arr[i];
    arr[i] = temp;

    // Heapify the reduced heap
    heapify(arr, i, 0);
  }

  return arr;
}

function heapify(arr, n, i) {
  let largest = i;
  let left = 2 * i + 1;
  let right = 2 * i + 2;

  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }

  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }

  if (largest !== i) {
    let temp = arr[i];
    arr[i] = arr[largest];
    arr[largest] = temp;

    heapify(arr, n, largest);
  }
}


// Example Usage
console.log(heapSort([5, 3, -2, 1, 6, 0])); // [-2, 0, 1, 3, 5, 6]


// Time complexity (average): O(n log n)
// Time complexity (best): O(n log n)
// Time complexity (worst): O(n log n)
// Space complexity: O(1)


// Use cases:

// Priority queues: Heap Sort is based on the heap data structure, which efficiently supports priority queue operations like finding, inserting, and removing the largest (or smallest) element.
// Task scheduling in operating systems where the task with the highest priority must be executed first.
// Managing job queues in print servers or other resource allocation systems.

// Sorting Large Datasets with Memory Constraints: Heap Sort is an in-place sorting algorithm, meaning it requires no additional memory, making it suitable for memory-constrained environments.
// Sorting large arrays in embedded systems or resource-limited devices.
// Sorting data in low-memory applications like IoT devices or microcontrollers.

// Top K elements: The heap structure enables efficient extraction of the largest or smallest elements repeatedly, making it ideal for solving Top-K problems.
// Finding the top 10 search results in search engines.
// Determining the largest K numbers in a dataset, such as in big data analysis or machine learning feature selection.

// Real-Time Systems and Event Management: Heap Sort provides predictable O(n log n) time complexity and uses the heap structure for organizing events or tasks efficiently.
// Sorting events by timestamp in real-time systems, such as stock trading platforms or simulations.
// Managing jobs in distributed systems with deadlines or priorities.

// Graph Algorithms: Heap Sort supports operations required in graph-related problems, such as maintaining a priority queue in Dijkstra's or Prim's algorithms.
// Network routing and finding the shortest path in communication systems.
// Computing the minimum spanning tree in network design problems.

// In-place sorting: Unlike Merge Sort, Heap Sort does not require additional memory for sorting, making it an in-place sorting algorithm.

// Stability: Heap Sort is not stable, meaning it may change the relative order of equal elements in the input array.
