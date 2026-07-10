// Hash Set is a set data structure that uses hash table to store elements. It is similar to Hash Table, but it stores only keys and no values. The keys are unique and the time complexity of basic operations such as add, delete, contains is O(1). 


// Hash Set operations
// 1. add(key): This method adds a new element to the hash set.
// 2. remove(key): This method removes an element from the hash set.
// 3. contains(key): This method checks whether an element is present in the hash set.
// 4. print(): This method displays all the elements in the hash set.
// 5. hash(key): This method takes a key and returns a hash code for the key.


// Implementation of Hash Set in JavaScript using an array
class HashSet {
  constructor(size) {
    this.table = new Array(size);
  }

  // Method to generate hash code
  hash(key) {
    let total = 0;
    for (let i = 0; i < key.length; i++) {
      total += key.charCodeAt(i);
    }
    return total % this.table.length;
  }

  // Method to add a new element in the hash set
  // Time complexity of this method is O(1)
  add(key) {
    let pos = this.hash(key);
    this.table[pos] = key;
  }

  // Method to remove an element from the hash set
  // Time complexity of this method is O(1)
  remove(key) {
    this.table[this.hash(key)] = undefined;
  }

  // Method to check whether an element is present in the hash set
  // Time complexity of this method is O(1)
  contains(key) {
    return this.table[this.hash(key)] !== undefined;
  }

  // Method to display all the elements in the hash set
  // Time complexity of this method is O(n)
  print() {
    for (let i = 0; i < this.table.length; ++i) {
      if (this.table[i] !== undefined) {
        console.log(i + ": " + this.table[i]);
      }
    }
  }
}