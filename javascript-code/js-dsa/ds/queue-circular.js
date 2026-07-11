// Circular queue is a linear data structure in which the operations are performed based on FIFO (First In First Out) principle and the last position is connected back to the first position to make a circle. It is also called 'Ring Buffer'.


// Circular Queue Operations:
// 1. enqueue: Add an element to the end of the queue
// 2. dequeue: Remove an element from the front of the queue
// 3. size: Get the number of elements in the queue
// 4. isEmpty: Check if the queue is empty
// 5. isFull: Check if the queue is full
// 6. print: Print the elements of the queue
// 7. front: Get the front element of the queue without removing it
// 8. rear: Get the rear element of the queue without removing it
// 9. clear: Remove all the elements from the queue
// 10. search: Search for an element in the queue


// Implementation of Circular Queue using arrays
class CircularQueue {
  constructor(size) {
    this.items = [];
    this.size = size;
    this.front = 0;
    this.rear = 0;
  }

  // Add element to the queue. 
  // Time complexity is O(1)
  enqueue(element) {
    if (this.isFull()) {
      return "Overflow";
    }
    this.items[this.rear] = element;
    this.rear = (this.rear + 1) % this.size;
  }

  // Remove element from the queue. 
  // Time complexity is O(1)
  dequeue() {
    if (this.isEmpty()) {
      return "Underflow";
    }
    const element = this.items[this.front];
    this.front = (this.front + 1) % this.size;
    return element;
  }

  // Print the queue. 
  // Time complexity is O(n)
  print() {
    let result = '';
    let i = this.front;
    while (i !== this.rear) {
      result += this.items[i] + ' ';
      i = (i + 1) % this.size;
    }
    return result;
  }

  // Get the front element of the queue without removing it.
  // Time complexity is O(1)
  getFront() {
    if (this.isEmpty()) {
      return "No elements in Queue";
    }
    return this.items[this.front];
  }

  // Get the rear element of the queue without removing it.
  // Time complexity is O(1)
  getRear() {
    if (this.isEmpty()) {
      return "No elements in Queue";
    }
    return this.items[this.rear];
  }

  // Get the number of elements in the queue.
  // Time complexity is O(1)
  getSize() {
    return this.items.length;
  }

  // Check if the queue is empty.
  // Time complexity is O(1)
  isEmpty() {
    return this.items.length === 0;
  }

  // Check if the queue is full.
  // Time complexity is O(1)
  isFull() {
    return this.items.length === this.size;
  }

  // Remove all the elements from the queue.
  clear() {
    this.items = [];
    this.front = 0;
    this.rear = 0;
  }

  // Search for an element in the queue.
  // Time complexity is O(n)
  search(element) {
    for (let i = this.front; i < this.rear; i++) {
      if (this.items[i] === element) {
        return true;
      }
    }
    return false;
  }
}


// Example
console.log('Circular Queue');
const circularQueue = new CircularQueue(3);
circularQueue.enqueue(1);
circularQueue.enqueue(2);
circularQueue.enqueue(3);
console.log(circularQueue.getFront()); // 1
console.log(circularQueue.getRear()); // 3
console.log(circularQueue.getSize()); // 3
console.log(circularQueue.isEmpty()); // false
console.log(circularQueue.isFull()); // true
console.log(circularQueue.print()); // 1 2 3
console.log(circularQueue.dequeue()); // 1
console.log(circularQueue.print()); // 2 3
console.log(circularQueue.dequeue()); // 2
console.log(circularQueue.dequeue()); // 3
console.log(circularQueue.isEmpty()); // true
console.log(circularQueue.dequeue()); // Underflow
console.log(circularQueue.isFull()); // false
console.log(circularQueue.getFront()); // No elements in Queue
console.log(circularQueue.getRear()); // No elements in Queue
console.log(circularQueue.getSize()); // 0
circularQueue.enqueue(4);
circularQueue.enqueue(5);
console.log(circularQueue.getFront()); // 4
console.log(circularQueue.getRear()); // 5
console.log(circularQueue.getSize()); // 2
console.log(circularQueue.isEmpty()); // false
console.log(circularQueue.isFull()); // true
console.log(circularQueue.print()); // 4 5
circularQueue.clear();
console.log(circularQueue.isEmpty()); // true
console.log(circularQueue.isFull()); // false
console.log(circularQueue.getFront()); // No elements in Queue
console.log(circularQueue.getRear()); // No elements in Queue
console.log(circularQueue.getSize()); // 0
console.log(circularQueue.print()); // 


module.exports = CircularQueue;