// Linked List is a linear data structure that consists of a group of nodes which represent a sequence. Each node contains data and a reference (link) to the next node in the sequence.


// head -> [1] -> [2] -> [3] -> null


// Linked List Operations:
// 1. add: Add an element to the linked list
// 2. remove: Remove an element from the linked list
// 3. getSize: Get the number of elements in the linked list
// 4. isEmpty: Check if the linked list is empty
// 5. print: Print the elements of the linked list
// 6. clear: Remove all the elements from the linked list
// 7. insertAt: Add an element at a specific position in the linked list
// 8. removeAt: Remove an element from a specific position in the linked list
// 9. getAt: Get the element at a specific position in the linked list
// 10. search: Search for an element in the linked list
// 11. reverse: Reverse the linked list
// 12. prepend: Add an element at the beginning of the linked list
// 13. append: Add an element at the end of the linked list


// Implementation of Linked List using classes
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  // Add element to the linked list. 
  // Time complexity is O(1)
  add(element) {
    const node = new Node(element);
    if (this.head === null) {
      this.head = node;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }
    this.size++;
  }

  // Remove element from the linked list. 
  // Time complexity is O(n)
  remove(element) {
    let current = this.head;
    let prev = null;
    while (current) {
      if (current.data === element) {
        if (prev === null) {
          this.head = current.next;
        } else {
          prev.next = current.next;
        }
        this.size--;
        return current.data;
      }
      prev = current;
      current = current.next;
    }
    return null;
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

  // Remove all the elements from the linked list. 
  // Time complexity is O(1)
  clear() {
    this.head = null;
    this.size = 0;
  }

  // Add an element at the beginning of the linked list.
  // Time complexity is O(1)
  prepend(element) {
    const node = new Node(element);
    node.next = this.head;
    this.head = node;
    this.size++;
  }

  // Add an element at the end of the linked list.
  // Time complexity is O(n)
  append(element) {
    this.add(element);
  }

  // Add an element at a specific position in the linked list. 
  // Time complexity is O(n)
  insertAt(element, index) {
    if (index < 0 || index > this.size) {
      return false;
    }
    const node = new Node(element);
    if (index === 0) {
      node.next = this.head;
      this.head = node;
    } else {
      let current = this.head;
      let prev = null;
      let i = 0;
      while (i++ < index) {
        prev = current;
        current = current.next;
      }
      node.next = current;
      prev.next = node;
    }
    this.size++;
    return true;
  }

  // Remove an element from a specific position in the linked list.
  // Time complexity is O(n)
  removeAt(index) {
    if (index < 0 || index >= this.size) {
      return null;
    }
    let current = this.head;
    let prev = null;
    let i = 0;
    while (i++ < index) {
      prev = current;
      current = current.next;
    }
    if (prev === null) {
      this.head = current.next;
    } else {
      prev.next = current.next;
    }
    this.size--;
    return current.data;
  }

  // Get the element at a specific position in the linked list.
  // Time complexity is O(n)
  getAt(index) {
    if (index < 0 || index >= this.size) {
      return null;
    }
    let current = this.head;
    let i = 0;
    while (i++ < index) {
      current = current.next;
    }
    return current.data;
  }

  // Search for an element in the linked list.
  // Time complexity is O(n)
  search(element) {
    let current = this.head;
    while (current) {
      if (current.data === element) {
        return true;
      }
      current = current.next;
    }
    return false;
  }

  // Reverse the linked list.
  // Time complexity is O(n)
  reverse() {
    let prev = null;
    let current = this.head;
    while (current) {
      let next = current.next;
      current.next = prev;
      prev = current;
      current = next;
    }
    this.head = prev;
  }
}


// Example
console.log('Linked List');
const linkedList = new LinkedList();
linkedList.add(1);
linkedList.add(2);
linkedList.add(3);
console.log(linkedList.print()); // 1 2 3
console.log(linkedList.getSize()); // 3
console.log(linkedList.isEmpty()); // false
console.log(linkedList.remove(2)); // 2
console.log(linkedList.print()); // 1 3
console.log(linkedList.getSize()); // 2
console.log(linkedList.insertAt(2, 1)); // true
console.log(linkedList.print()); // 1 2 3
console.log(linkedList.removeAt(1)); // 2
console.log(linkedList.print()); // 1 3
console.log(linkedList.reverse());
console.log(linkedList.print()); // 3 1
console.log(linkedList.prepend(2));
console.log(linkedList.print()); // 2 3 1
console.log(linkedList.append(4));
console.log(linkedList.print()); // 2 3 1 4
console.log(linkedList.getAt(2)); // 1
console.log(linkedList.search(4)); // true
linkedList.clear();
console.log(linkedList.print()); // 
console.log(linkedList.getSize()); // 0
console.log(linkedList.isEmpty()); // true


module.exports = LinkedList;