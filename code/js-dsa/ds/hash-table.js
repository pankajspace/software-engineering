// Hash Table is a data structure that stores values in key-value pairs. It uses a hash function to compute an index into an array of buckets or slots, from which the desired value can be found. The hash function takes a key and returns a hash code, which is used to find the index of the value in the table. 


// Hash Table operations
// 1. set(key, value): This method adds a new element with a key and a value to the hash table.
// 2. get(key): This method returns the value of the element with a specified key from the hash table.
// 3. remove(key): This method removes the element with a specified key from the hash table.
// 4. print(): This method displays all the key-value pairs in the hash table.
// 5. hash(key): This method takes a key and returns a hash code for the key.


// Implementation of Hash Table in JavaScript using an array
class HashTable {
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

  // Method to insert a new element in the hash table
  // Time complexity of this method is O(1)
  set(key, value) {
    let pos = this.hash(key);
    this.table[pos] = value;
  }

  // Method to get the value of an element from the hash table
  // Time complexity of this method is O(1)
  get(key) {
    return this.table[this.hash(key)];
  }

  // Method to remove an element from the hash table
  // Time complexity of this method is O(1)
  remove(key) {
    this.table[this.hash(key)] = undefined;
  }

  // Method to display all the key-value pairs in the hash table
  // Time complexity of this method is O(n)
  print() {
    for (let i = 0; i < this.table.length; ++i) {
      if (this.table[i] !== undefined) {
        console.log(i + ": " + this.table[i]);
      }
    }
  }
}


// Example
console.log("Hash Table");
const hashTable = new HashTable(10);
hashTable.set("John", 123);
hashTable.set("Doe", 456);
hashTable.set("Jane", 789);
hashTable.print(); // Output: 29: 123, 31: 456, 34: 789
console.log(hashTable.get("Doe")); // Output: 456
hashTable.remove("Doe");
hashTable.print(); // Output: 29: 123, 34: 789


module.exports = HashTable;
