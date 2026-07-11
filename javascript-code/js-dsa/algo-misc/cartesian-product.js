// Problem: Given 2 finite sets, find the cartesian product of the 2 sets.


// Cartesian product of 2 sets A and B is the set of all ordered pairs (a, b) where a belongs to A and b belongs to B. It is denoted by A x B.


// Example
// const A = [1, 2];
// const B = ['a', 'b'];
// cartesianProduct(A, B); // [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]


function cartesianProduct(A, B) {
  const result = [];
  for (let i = 0; i < A.length; i++) {
    for (let j = 0; j < B.length; j++) {
      result.push([A[i], B[j]]);
    }
  }
  return result;
}


const A = [1, 2];
const B = ['a', 'b'];
console.log("cartesianProduct(A, B)", cartesianProduct(A, B)); // [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]


// Time Complexity
// The time complexity of this algorithm is O(n * m) where n is the number of elements in set A and m is the number of elements in set B.

// Space Complexity
// The space complexity of this algorithm is O(n * m) where n is the number of elements in set A and m is the number of elements in set B.


module.exports = cartesianProduct;
