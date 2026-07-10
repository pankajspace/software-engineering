// Doubly Linked List is a type of linked list in which each node apart from storing its data has two links. The first link points to the previous node in the list and the second link points to the next node in the list. The first node of the list has its previous link pointing to NULL similarly the last node of the list has its next link pointing to NULL. 


// Doubly Linked List operations:
// 1. prepend(value): Adds a node to the beginning of the list.
// 2. append(value): Adds a node to the end of the list.
// 3. removeFromFront(): Removes a node from the beginning of the list.
// 4. removeFromEnd(): Removes a node from the end of the list.
// 5. print(): Prints the list from the beginning.
// 6. printReverse(): Prints the list from the end.
// 7. isEmpty(): Checks if the list is empty.
// 8. getSize(): Returns the size of the list.


// Implementation of Doubly Linked List using classes
class Node {
  constructor(value) {
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  // Check if the list is empty
  // Time complexity is O(1)
  isEmpty() {
    return this.size === 0;
  }

  // Get the number of elements in the list
  // Time complexity is O(1)
  getSize() {
    return this.size;
  }

  // Add a node to the beginning of the list
  // Time complexity is O(1)
  prepend(value) {
    const node = new Node(value);
    if (this.isEmpty()) {
      this.head = node;
      this.tail = node;
    } else {
      node.next = this.head;
      this.head.prev = node;
      this.head = node;
    }
    this.size++;
  }

  // Add a node to the end of the list
  // Time complexity is O(1)
  append(value) {
    const node = new Node(value);
    if (this.isEmpty()) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      node.prev = this.tail;
      this.tail = node;
    }
    this.size++;
  }

  // Remove a node from the beginning of the list
  // Time complexity is O(1)
  removeFromFront() {
    if (this.isEmpty()) {
      return null;
    }
    const value = this.head.value;
    this.head = this.head.next;
    this.size--;
    return value;
  }

  // Remove a node from the end of the list
  // Time complexity is O(1)
  removeFromEnd() {
    if (this.isEmpty()) {
      return null;
    }
    const value = this.tail.value;
    if (this.size === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = this.tail.prev;
      this.tail.next = null;
    }
    this.size--;
    return value;
  }

  // Print the list from the beginning
  // Time complexity is O(n)
  print() {
    if (this.isEmpty()) {
      console.log("List is empty");
    } else {
      let curr = this.head;
      let list = "";
      while (curr) {
        list += `${curr.value}<->`;
        curr = curr.next;
      }
      console.log(list);
    }
  }

  // Print the list from the end
  // Time complexity is O(n)
  printReverse() {
    if (this.isEmpty()) {
      console.log("List is empty");
    } else {
      let curr = this.tail;
      let list = "";
      while (curr) {
        list += `${curr.value}<->`;
        curr = curr.prev;
      }
      console.log(list);
    }
  }
}


// Example
console.log("Doubly Linked List");
const dll = new DoublyLinkedList();
dll.prepend(10); // 10<->
dll.prepend(20); // 20<->10<->
dll.append(30); // 20<->10<->30<->
dll.print(); // 20<->10<->30<->
dll.printReverse(); // 30<->10<->20<->
dll.removeFromFront(); // 10<->30<->
dll.removeFromEnd(); // 10<->
dll.print(); // 10<->
dll.printReverse(); // 10<->  


module.exports = DoublyLinkedList;