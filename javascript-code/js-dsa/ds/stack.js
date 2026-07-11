// Stack is a linear data structure which follows a Last In First Out (LIFO) order.
// A good example of a stack is plates stacked over one another in the canteen. The plate which is at the top is the first one to be removed, i.e. the plate which has been placed at the bottommost position remains in the stack for the longest period of time. So, it can be simply seen to follow the Last In First Out order. 


// top -> [3] -> [2] -> [1] -> bottom


// Stack Operations:
// 1. push: Add an element to the top of a stack
// 2. pop: Remove an element from the top of a stack
// 3. size: Get the number of elements in the stack
// 4. isEmpty: Check if the stack is empty
// 5. print: Print the elements of the stack
// 6. peek: Get the top element of the stack without removing it


// Implementation of Stack using arrays
class Stack {
  constructor() {
    this.items = [];
  }

  // Add element to the stack. 
  // Time complexity is O(1)
  push(element) {
    this.items.push(element);
  }

  // Remove element from the stack. 
  // Time complexity is O(1)
  pop() {
    if (this.items.length === 0) {
      return "Underflow";
    }
    return this.items.pop();
  }

  // Print the stack. 
  // Time complexity is O(n)
  print() {
    return this.items.join(' ');
  }

  // Get the top element of the stack without removing it.
  // Time complexity is O(1)
  peek() {
    return this.items[this.items.length - 1];
  }

  // Get the number of elements in the stack.
  // Time complexity is O(1)
  size() {
    return this.items.length;
  }

  // Check if the stack is empty.
  // Time complexity is O(1)
  isEmpty() {
    return this.items.length === 0;
  }
}


// Example
console.log('Stack');
const stack = new Stack();
stack.push(1);
stack.push(2);
stack.push(3);
console.log(stack.peek()); // 3
console.log(stack.size()); // 3
console.log(stack.isEmpty()); // false
console.log(stack.print()); // 1 2 3
console.log(stack.pop()); // 3
console.log(stack.print()); // 1 2
console.log(stack.pop()); // 2
console.log(stack.pop()); // 1
console.log(stack.isEmpty()); // true
console.log(stack.pop()); // Underflow


module.exports = Stack;