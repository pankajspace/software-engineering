// Queue is a linear data structure that follows the First In First Out (FIFO) principle. 
// A good example of a queue is any queue of consumers for a resource where the consumer that came first is served first.


// front -> [1] -> [2] -> [3] -> rear


// Queue Operations:
// 1. enqueue: Add an element to the end of the queue
// 2. dequeue: Remove an element from the front of the queue
// 3. size: Get the number of elements in the queue
// 4. isEmpty: Check if the queue is empty
// 5. print: Print the elements of the queue
// 6. front: Get the front element of the queue without removing it
// 7. rear: Get the rear element of the queue without removing it
// 8. clear: Remove all the elements from the queue
// 9. search: Search for an element in the queue
// 10. isFull: Check if the queue is full


// Implementation of Queue using arrays
class Queue {
  constructor() {
    this.items = [];
  }

  // Add element to the queue. 
  // Time complexity is O(1)
  enqueue(element) {
    this.items.push(element);
  }

  // Remove element from the queue. 
  // Time complexity is O(n)
  dequeue() {
    if (this.items.length === 0) {
      return "Underflow";
    }
    return this.items.shift();
  }

  // Print the queue. 
  // Time complexity is O(n)
  print() {
    return this.items.join(' ');
  }
}


// Example
console.log('Queue');
const queue = new Queue();
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
console.log(queue.print()); // 1 2 3
console.log(queue.dequeue()); // 1
console.log(queue.print()); // 2 3
console.log(queue.dequeue()); // 2
console.log(queue.dequeue()); // 3
console.log(queue.dequeue()); // Underflow


// Implementing Queue using objects
class QueueObject {
  constructor() {
    this.count = 0;
    this.lowestCount = 0;
    this.items = {};
  }

  // Add element to the queue. 
  // Time complexity is O(1)
  enqueue(element) {
    this.items[this.count] = element;
    this.count++;
  }

  // Remove element from the queue. 
  // Time complexity is O(1)
  dequeue() {
    if (this.isEmpty()) {
      return "Underflow";
    }

    const result = this.items[this.lowestCount];
    delete this.items[this.lowestCount];
    this.lowestCount++;
    return result;
  }

  // Print the queue. 
  // Time complexity is O(n)
  print() {
    let result = '';
    for (let i = this.lowestCount; i < this.count; i++) {
      result += this.items[i] + ' ';
    }
    return result;
  }

  // Get the front element of the queue without removing it.
  // Time complexity is O(1)
  front() {
    if (this.isEmpty()) {
      return "No elements in Queue";
    }
    return this.items[this.lowestCount];
  }

  // Get the rear element of the queue without removing it.
  // Time complexity is O(1)
  rear() {
    if (this.isEmpty()) {
      return "No elements in Queue";
    }
    return this.items[this.count - 1];
  }

  // Get the number of elements in the queue.
  // Time complexity is O(1)
  size() {
    return this.count - this.lowestCount;
  }

  // Check if the queue is empty.
  // Time complexity is O(1)
  isEmpty() {
    return this.size() === 0;
  }

  // Remove all the elements from the queue.
  // Time complexity is O(1)
  clear() {
    this.items = {};
    this.count = 0;
    this.lowestCount = 0;
  }

  // Search for an element in the queue.
  // Time complexity is O(n)
  search(element) {
    for (let i = this.lowestCount; i < this.count; i++) {
      if (this.items[i] === element) {
        return true;
      }
    }
    return false;
  }

  // Check if the queue is full.
  // Time complexity is O(1)
  isFull() {
    return this.size() === this.count;
  }
}


// Example
console.log('Queue Object');
const queueObject = new QueueObject();
queueObject.enqueue(1);
queueObject.enqueue(2);
queueObject.enqueue(3);
console.log(queueObject.print()); // 1 2 3
console.log(queueObject.dequeue()); // 1
console.log(queueObject.front()); // 2
console.log(queueObject.rear()); // 3
console.log(queueObject.size()); // 2
console.log(queueObject.isEmpty()); // false
console.log(queueObject.print()); // 2 3
console.log(queueObject.dequeue()); // 2
console.log(queueObject.dequeue()); // 3
console.log(queueObject.dequeue()); // Underflow
console.log(queueObject.isEmpty()); // true
console.log(queueObject.front()); // No elements in Queue
console.log(queueObject.rear()); // No elements in Queue
console.log(queueObject.size()); // 0


module.exports = {
  Queue,
  QueueObject
}