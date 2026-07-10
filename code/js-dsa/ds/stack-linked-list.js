// Stack using linked list


// Stack using linked list Operations
// 1. push(data): Add element to the beginning of the linked list.
// 2. pop(): Remove element from the beginning of the linked list.
// 3. peek(): Get the top element of the stack without removing it.
// 4. isEmpty(): Check if the stack is empty.
// 5. getSize(): Get the number of elements in the stack.
// 6. print(): Print the stack.


const LinkedListTail = require('./linked-list-tail');


class LinkedListStack {
  constructor() {
    this.list = new LinkedListTail();
  }

  // Add element to the beginning of the linked list.
  // Time complexity is O(1)
  push(data) {
    this.list.prepend(data);
  }

  // Remove element from the beginning of the linked list.
  // Time complexity is O(1)
  pop() {
    return this.list.removeFromFront();
  }

  // Get the top element of the stack without removing it.
  // Time complexity is O(1)
  peek() {
    return this.list.head.data;
  }

  // Check if the stack is empty.
  // Time complexity is O(1)
  isEmpty() {
    return this.list.isEmpty();
  }

  // Get the number of elements in the stack.
  // Time complexity is O(1)
  getSize() {
    return this.list.getSize();
  }

  // Print the stack.
  // Time complexity is O(n)
  print() {
    return this.list.print();
  }
}


// Example
console.log('Stack using linked list');
const stack = new LinkedListStack();
stack.push(1);
stack.push(2);
stack.push(3);
stack.push(4);
console.log('Stack:', stack.print()); // 4 3 2 1
console.log('Top element:', stack.peek()); // 4
console.log('Stack size:', stack.getSize()); // 4
console.log('Is stack empty:', stack.isEmpty()); // false
stack.pop();
stack.pop();
console.log('Stack:', stack.print()); // 2 1
console.log('Top element:', stack.peek()); // 2
console.log('Stack size:', stack.getSize()); // 2
console.log('Is stack empty:', stack.isEmpty()); // false


module.exports = LinkedListStack;