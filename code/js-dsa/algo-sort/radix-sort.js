// Radix Sort: A sorting algorithm that sorts the elements by first grouping the individual digits of the same place value. Then, the elements are sorted according to their increasing/decreasing order. The process is repeated for each place value of the elements. 


console.log("Radix Sort");


// Short explanation of the radix sort algorithm for the array [170, 90, 802, 4, 2, 66]

// 1. Sort by Least Significant Digit (LSD): Group the numbers based on their least significant digit (units place) and sort:  
//    After sorting by the units place: `[170, 90, 802, 2, 4, 66]`.

// 2. Sort by Next Significant Digit (Tens Place): Group and sort based on the tens place:  
//    After sorting by tens place: `[802, 2, 4, 66, 75, 170, 90]`.

// 3. Sort by Most Significant Digit (Hundreds Place): Group and sort based on the hundreds place:  
//    After sorting by hundreds place: `[2, 4, 66, 90, 170, 802]`.

// 4. Final Sorted Array: `[2, 4, 66, 90, 170, 802]`.

// Key Idea: Sort the array by processing one digit at a time, starting from the least significant digit (LSD) to the most significant digit (MSD), using a stable sorting method like counting sort at each step.


// Diagram of the radix sort algorithm:

// [170, 90, 802, 4, 2, 66]
// Sorted by the ones place: [170, 90, 802, 2, 4, 66]
// Sorted by the tens place: [802, 2, 4, 66, 75, 170, 90]
// Sorted by the hundreds place: [2, 4, 66, 90, 170, 802]


function radixSort(arr) {
  const max = Math.max(...arr);
  const maxDigits = max.toString().length;

  for (let i = 0; i < maxDigits; i++) {
    const buckets = Array.from({ length: 10 }, () => []);

    for (let j = 0; j < arr.length; j++) {
      const digit = getDigit(arr[j], i);
      buckets[digit].push(arr[j]);
    }

    arr = [].concat(...buckets);
    console.log(`Pass ${i + 1} : `, arr);
  }

  return arr;
}

function getDigit(num, i) {
  return Math.floor(Math.abs(num) / Math.pow(10, i)) % 10;
}


// Example Usage
console.log(radixSort([170, 90, 802, 4, 2, 66])); // [2, 4, 66, 90, 170, 802]


// Time complexity (average): O(nk)
// Time complexity (best): O(nk)
// Time complexity (worst): O(nk)
// Space complexity: O(n + k)
// where n is the number of elements in the array and k is the number of digits in the largest number.


// Use cases:

// Sorting Large Integers: Radix Sort excels in sorting large integers due to its digit-by-digit processing, avoiding costly comparisons.
// Sorting telephone numbers, account numbers, or unique IDs in databases.
// Organizing large datasets of integers for analytics or computation.

// Sorting Strings in Lexicographical Order: Radix Sort can treat characters as "digits" and sort strings efficiently in alphabetical or lexicographical order.
// Sorting words in a dictionary or search engine.
// Alphabetically arranging file names, email addresses, or web URLs.

// Sorting Binary or Fixed-Length Data: Radix Sort handles binary numbers or fixed-length numeric data very effectively without comparisons.
// Sorting binary representations in computer systems or digital circuits.
// Organizing fixed-length codes like barcodes or registration numbers.

// Large-Scale Data Sorting in External Memory: Radix Sort performs well with large datasets when the value range is smaller than the dataset size, especially in external memory scenarios.
// Sorting massive transaction logs or sensor data streams.
// External sorting in big data frameworks for datasets too large to fit in memory.

// Floating-Point Number Sorting: Radix Sort handles floating-point numbers by treating their integral and fractional parts separately for efficient sorting.
// Organizing scientific measurements with high precision.
// Sorting numerical data in computational simulations or analysis software.


module.exports = radixSort;
