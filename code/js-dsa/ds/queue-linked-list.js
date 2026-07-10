// Queue using linked list


// Queue using linked list operations
// 1. enqueue() - Add an element to the end of the queue
// 2. dequeue() - Remove an element from the front of the queue
// 3. peek() - Get the element at the front of the queue
// 4. isEmpty() - Check if the queue is empty
// 5. getSize() - Get the number of elements in the queue
// 6. print() - Print the elements of the queue


const LinkedListTail = require('./linked-list-tail');


class LinkedListQueue {
  constructor() {
    this.list = new LinkedListTail();
  }

  // Add an element to the end of the queue
  // Time complexity is O(1)
  enqueue(data) {
    this.list.append(data);
  }

  // Remove an element from the front of the queue
  // Time complexity is O(1)
  dequeue() {
    return this.list.removeFromFront();
  }

  // Get the element at the front of the queue
  // Time complexity is O(1)
  peek() {
    return this.list.head.data;
  }

  // Check if the queue is empty
  // Time complexity is O(1)
  isEmpty() {
    return this.list.isEmpty();
  }

  // Get the number of elements in the queue
  // Time complexity is O(1)
  getSize() {
    return this.list.getSize();
  }

  // Print the elements of the queue
  // Time complexity is O(n)
  print() {
    return this.list.print();
  }
}


// Example
console.log('Queue using linked list');
const queue = new LinkedListQueue();
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
queue.print(); // 1 2 3
queue.dequeue();
queue.print();  // 2 3
console.log('Front element:', queue.peek()); // 2
console.log('Is queue empty:', queue.isEmpty()); // false
console.log('Queue size:', queue.getSize()); // 2


module.exports = LinkedListQueue;