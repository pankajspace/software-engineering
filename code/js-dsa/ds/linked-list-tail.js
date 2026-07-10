// Linked List with Tail Pointer is a variation of the linked list data structure. In this variation, we maintain a reference to the last node of the linked list. This reference is called the tail pointer. The tail pointer points to the last node of the linked list, allowing us to quickly append elements to the end of the list without traversing the entire list.


// Linked List with Tail Pointer Operations:
// 1. append: Add an element at the end of the linked list
// 2. prepend: Add an element at the beginning of the linked list
// 3. removeFromFront: Remove an element from the beginning of the linked list
// 4. removeFromEnd: Remove an element from the end of the linked list
// 5. getSize: Get the number of elements in the linked list
// 6. isEmpty: Check if the linked list is empty
// 7. print: Print the elements of the linked list
// 8. clear: Remove all the elements from the linked list
// 9. reverse: Reverse the linked list


// Implementation of Linked List with Tail Pointer using classes
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedListTail {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  // Add element to the end of the linked list. 
  // Time complexity is O(1)
  append(element) {
    const node = new Node(element);
    if (this.head === null) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }
    this.size++;
  }

  // Add element to the beginning of the linked list. 
  // Time complexity is O(1)
  prepend(element) {
    const node = new Node(element);
    if (this.head === null) {
      this.head = node;
      this.tail = node;
    } else {
      node.next = this.head;
      this.head = node;
    }
    this.size++;
  }

  // Remove element from the beginning of the linked list. 
  // Time complexity is O(1)
  removeFromFront() {
    if (this.head === null) {
      return null;
    }
    const removed = this.head;
    this.head = this.head.next;
    this.size--;
    return removed.data;
  }

  // Remove element from the end of the linked list.
  // Time complexity is O(n)
  removeFromEnd() {
    if (this.head === null) {
      return null;
    }
    let current = this.head;
    let prev = null;
    while (current.next) {
      prev = current;
      current = current.next;
    }
    if (prev === null) {
      this.head = null;
      this.tail = null;
    } else {
      prev.next = null;
      this.tail = prev;
    }
    this.size--;
    return current.data;
  }

  // Get the number of elements in the linked list.
  // Time complexity is O(1)
  getSize() {
    return this.size;
  }

  // Check if the linked list is empty.
  // Time complexity is O(1)
  isEmpty() {
    return this.size === 0;
  }

  // Print the linked list.
  // Time complexity is O(n)
  print() {
    let result = '';
    let current = this.head;
    while (current) {
      result += current.data + ' ';
      current = current.next;
    }
    return result;
  }

  // Remove all the elements from the linked list.
  // Time complexity is O(1)
  clear() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  // Reverse the linked list.
  // Time complexity is O(n)
  reverse() {
    let current = this.head;
    let prev = null;
    let next = null;
    while (current) {
      next = current.next;
      current.next = prev;
      prev = current;
      current = next;
    }
    this.tail = this.head;
    this.head = prev;
  }
}


// Example:
console.log('Linked List with Tail Pointer');
const ll = new LinkedListTail();
ll.append(10);
ll.append(20);
ll.append(30);
ll.prepend(5);
console.log(ll.print()); // 5 10 20 30
console.log(ll.getSize()); // 4
ll.removeFromFront();
console.log(ll.print()); // 10 20 30
ll.removeFromEnd();
console.log(ll.print()); // 10 20
ll.reverse();
console.log(ll.print()); // 20 10
ll.clear();
console.log(ll.isEmpty()); // true


module.exports = LinkedListTail;

