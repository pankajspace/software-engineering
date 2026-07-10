// Problem: Given n disks and 3 rods, find the minimum number of moves to move all the disks from the first rod to the last rod such that no disk is placed on top of a smaller disk.


// Example
// towerOfHanoi(1); // 1 
// (Move disk 1 from rod 1 to rod 3)

// towerOfHanoi(2); // 3 
// Move disk 1 from rod 1 to rod 2, 
// Move disk 2 from rod 1 to rod 3, 
// Move disk 1 from rod 2 to rod 3

// towerOfHanoi(3); // 7 
// Move disk 1 from rod 1 to rod 3,
// Move disk 2 from rod 1 to rod 2,
// Move disk 1 from rod 3 to rod 2,
// Move disk 3 from rod 1 to rod 3,
// Move disk 1 from rod 2 to rod 1,
// Move disk 2 from rod 2 to rod 3,
// Move disk 1 from rod 1 to rod 3


// Approach
// 1. If n is 1, move the disk from the source rod to the destination rod.
// 2. Move n - 1 disks from the source rod to the auxiliary rod using the destination rod.
// 3. Move the nth disk from the source rod to the destination rod.
// 4. Move n - 1 disks from the auxiliary rod to the destination rod using the source rod.


function towerOfHanoi(n, source = 1, destination = 3, auxiliary = 2) {
  if (n === 1) {
    console.log(`Move disk 1 from rod ${source} to rod ${destination}`);
    return 1;
  }
  const step1 = towerOfHanoi(n - 1, source, auxiliary, destination);
  console.log(`Move disk ${n} from rod ${source} to rod ${destination}`);
  const step2 = towerOfHanoi(n - 1, auxiliary, destination, source);
  return step1 + 1 + step2;
}


console.log("towerOfHanoi(1)", towerOfHanoi(1)); // 1
console.log("towerOfHanoi(2)", towerOfHanoi(2)); // 3
console.log("towerOfHanoi(3)", towerOfHanoi(3)); // 7


// Time Complexity
// The time complexity of this algorithm is O(2^n) where n is the number of disks.

// Space Complexity
// The space complexity of this algorithm is O(n) where n is the number of disks.


module.exports = towerOfHanoi;