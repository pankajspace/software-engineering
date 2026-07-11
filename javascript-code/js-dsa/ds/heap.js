// Heap is a special Tree-based data structure in which the tree is a complete binary tree. 
// Generally, Heaps can be of two types:
// Max-Heap: In a Max-Heap the key present at the root node must be greatest among the keys present at all of it’s children. The same property must be recursively true for all sub-trees in that Binary Tree.
// Min-Heap: In a Min-Heap the key present at the root node must be minimum among the keys present at all of it’s children. The same property must be recursively true for all sub-trees in that Binary Tree.


// Heap Operations
// 1. insert(value): Insert a new element in the heap.
// 2. delete(): Delete the element at the root.
// 3. extract(): Extract the element at the root.
// 4. bubbleUp(index): Move the element at the specified index up the heap.
// 5. bubbleDown(index): Move the element at the specified index down the heap.
// 6. size(): Get the number of elements in the heap.
// 7. isEmpty(): Check if the heap is empty.
// 8. clear(): Remove all elements from the heap.
// 9. print(): Print the heap.
// 10. heapify(array): Convert an array into a heap.
// 11. heapSort(array): Sort an array using heap sort.


// Max Heap Implementation in JavaScript
class MaxHeap {
  constructor() {
    this.heap = [];
  }

  // Insert a new element in the heap
  // Time Complexity: O(log n)
  insert(value) {
    this.heap.push(value);
    this.bubbleUp();
  }

  // Move the element at the specified index up the heap
  // Time Complexity: O(log n)
  bubbleUp() {
    let index = this.heap.length - 1;

    while (index > 0) {
      let element = this.heap[index],
        parentIndex = Math.floor((index - 1) / 2),
        parent = this.heap[parentIndex];

      if (parent >= element) break;
      this.heap[index] = parent;
      this.heap[parentIndex] = element;
      index = parentIndex;
    }
  }

  // Delete the element at the root
  // Time Complexity: O(log n)
  extract() {
    let max = this.heap[0];
    let tmp = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = tmp;
      this.bubbleDown();
    }
    return max;
  }

  // Move the element at the specified index down the heap
  // Time Complexity: O(log n)
  bubbleDown() {
    let index = 0, length = this.heap.length;

    while (true) {
      let left = 2 * index + 1,
        right = 2 * index + 2,
        largest = index;

      if (left < length && this.heap[left] > this.heap[largest]) {
        largest = left;
      }
      if (right < length && this.heap[right] > this.heap[largest]) {
        largest = right;
      }
      if (largest === index) break;
      let tmp = this.heap[index];
      this.heap[index] = this.heap[largest];
      this.heap[largest] = tmp;
      index = largest;
    }
  }

  // Get the number of elements in the heap
  // Time Complexity: O(1)
  size() {
    return this.heap.length;
  }

  // Check if the heap is empty
  // Time Complexity: O(1)
  isEmpty() {
    return this.heap.length === 0;
  }

  // Remove all elements from the heap
  // Time Complexity: O(1)
  clear() {
    this.heap = [];
  }

  // Print the heap
  // Time Complexity: O(n)
  print() {
    console.log(this.heap);
  }

  // Convert an array into a heap
  // Time Complexity: O(n)
  heapify(array) {
    this.heap = array;
    let i = Math.floor(this.heap.length / 2 - 1);

    while (i >= 0) {
      this.bubbleDown(i);
      i--;
    }
  }

  // Sort an array using heap sort
  // Time Complexity: O(n log n)
  heapSort(array) {
    this.heapify(array);
    let result = [];

    while (this.heap.length) {
      result.push(this.extract());
    }

    return result;
  }

  // Check if the heap is a Max Heap
  // Time Complexity: O(n)
  isMaxHeap() {
    let isComplete = true;
    for (let i = 0; i < this.heap.length; i++) {
      if (2 * i + 1 < this.heap.length && this.heap[i] < this.heap[2 * i + 1]) {
        isComplete = false;
      }
      if (2 * i + 2 < this.heap.length && this.heap[i] < this.heap[2 * i + 2]) {
        isComplete = false;
      }
    }
    return isComplete;
  }
}


// Example
console.log("Max Heap");
let maxHeap = new MaxHeap();
maxHeap.insert(7);
maxHeap.insert(4);
maxHeap.insert(6);
maxHeap.insert(3);
maxHeap.insert(5);
maxHeap.insert(2);
maxHeap.insert(1);
console.log(maxHeap.extract()); // 7
console.log(maxHeap.size());
console.log(maxHeap.isEmpty());
maxHeap.clear();
console.log(maxHeap.isEmpty());
maxHeap.heapify([1, 2, 3, 4, 5, 6, 7]);
console.log(maxHeap.heapSort([1, 2, 3, 4, 5, 6, 7]));
console.log(maxHeap.isMaxHeap());


module.exports = MaxHeap;