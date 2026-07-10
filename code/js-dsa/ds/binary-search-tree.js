// Binary Search Tree is a node-based binary tree data structure which has the following properties:   
// The left subtree of a node contains only nodes with keys lesser than the node’s key. 
// The right subtree of a node contains only nodes with keys greater than the node’s key.
// The left and right subtree each must also be a binary search tree.


//        10
//       /  \
//      5    15
//     / \   / \
//    3   7 13  17



// Binary Search Tree operations
// 1. isEmpty(): This method checks whether the binary search tree is empty or not.
// 2. insert(value): This method inserts a new node with the given value into the binary search tree.
// 3. insertNode(root, data): This method inserts a new node with the given value into the binary search tree starting from the root node.
// 4. search(root, value): This method searches for a node with the given value in the binary search tree starting from the root node.
// 5. min(root): This method finds the node with the minimum value in the binary search tree starting from the root node.
// 6. max(root): This method finds the node with the maximum value in the binary search tree starting from the root node.
// 7. delete(value): This method deletes a node with the given value from the binary search tree.
// 8. deleteNode(root, value): This method deletes a node with the given value from the binary search tree starting from the root node.
// 9. inOrder(root): This method performs an in-order traversal of the binary search tree starting from the root node.
// 10. preOrder(root): This method performs a pre-order traversal of the binary search tree starting from the root node.
// 11. levelOrder(): This method performs a level-order traversal of the binary search tree.
// 12. height(node): This method calculates the height of the binary search tree starting from the given node.
// 13. printLevel(node, level): This method prints the nodes at the given level in the binary search tree starting from the given node.
// 14. isBST(node, min, max): This method checks whether the binary search tree starting from the given node is a valid binary search tree or not.


// Implementation of Binary Search Tree in JavaScript
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  // Method to check if the binary search tree is empty
  // Time complexity is O(1)
  isEmpty() {
    return this.root === null;
  }

  // Method to insert a new node in the binary search tree
  // Time complexity is O(h) where h is the height of the tree
  insert(value) {
    const newNode = new Node(value);
    if (this.isEmpty()) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }

  // Method to insert a new node in the binary search tree starting from the given root node
  // Time complexity is O(h) where h is the height of the tree
  insertNode(root, newNode) {
    if (newNode.value < root.value) {
      if (root.left === null) {
        root.left = newNode;
      } else {
        this.insertNode(root.left, newNode);
      }
    } else {
      if (root.right === null) {
        root.right = newNode;
      } else {
        this.insertNode(root.right, newNode);
      }
    }
  }

  // Method to search for a node with the given value in the binary search tree
  // Time complexity is O(h) where h is the height of the tree
  search(root, value) {
    if (!root) {
      return false;
    }
    if (root.value === value) {
      return true;
    } else if (value < root.value) {
      return this.search(root.left, value);
    } else {
      return this.search(root.right, value);
    }
  }

  // Method to find the node with the minimum value in the binary search tree
  // Time complexity is O(h) where h is the height of the tree
  min(root) {
    if (!root.left) {
      return root.value;
    } else {
      return this.min(root.left);
    }
  }

  // Method to find the node with the maximum value in the binary search tree
  // Time complexity is O(h) where h is the height of the tree
  max(root) {
    if (!root.right) {
      return root.value;
    } else {
      return this.max(root.right);
    }
  }

  // Method to delete a node with the given value from the binary search tree
  // Time complexity is O(h) where h is the height of the tree
  delete(value) {
    this.root = this.deleteNode(this.root, value);
  }

  // Method to delete a node with the given value from the binary search tree starting from the given root node
  // Time complexity is O(h) where h is the height of the tree
  deleteNode(root, value) {
    if (root === null) {
      return root;
    }
    if (value < root.value) {
      root.left = this.deleteNode(root.left, value);
    } else if (value > root.value) {
      root.right = this.deleteNode(root.right, value);
    } else {
      if (!root.left && !root.right) {
        return null;
      }
      if (!root.left) {
        return root.right;
      } else if (!root.right) {
        return root.left;
      }
      root.value = this.min(root.right);
      root.right = this.deleteNode(root.right, root.value);
    }
    return root;
  }

  // Method to perform an in-order traversal of the binary search tree
  // Time complexity is O(n)
  inOrder(root) {
    if (root) {
      this.inOrder(root.left);
      console.log(root.value);
      this.inOrder(root.right);
    }
  }

  // Method to perform a pre-order traversal of the binary search tree
  // Time complexity is O(n)
  preOrder(root) {
    if (root) {
      console.log(root.value);
      this.preOrder(root.left);
      this.preOrder(root.right);
    }
  }

  // Method to perform a post-order traversal of the binary search tree
  // Time complexity is O(n)
  postOrder(root) {
    if (root) {
      this.postOrder(root.left);
      this.postOrder(root.right);
      console.log(root.value);
    }
  }

  // Method to perform a level-order traversal of the binary search tree
  // Time complexity is O(n)
  levelOrder() {
    /** Use the optimised queue enqueue and dequeue from queue-object.js instead.
     * I've used an array for simplicity. */
    const queue = [];
    queue.push(this.root);
    while (queue.length) {
      let curr = queue.shift();
      console.log(curr.value);
      if (curr.left) {
        queue.push(curr.left);
      }
      if (curr.right) {
        queue.push(curr.right);
      }
    }
  }

  // Method to calculate the height of the binary search tree starting from the given node
  // Time complexity is O(n)
  height(node) {
    if (!node) {
      return 0;
    } else {
      const leftHeight = this.height(node.left);
      const rightHeight = this.height(node.right);
      return Math.max(leftHeight, rightHeight) + 1;
    }
  }

  // Method to print the nodes at the given level in the binary search tree starting from the given node
  // Time complexity is O(n)
  printLevel(node, level) {
    if (!node) {
      return;
    }
    if (level === 1) {
      console.log(`${node.element} `);
    } else if (level > 1) {
      this.printLevel(node.left, level - 1);
      this.printLevel(node.right, level - 1);
    }
  }

  // Method to check whether the binary search tree starting from the given node is a valid binary search tree or not
  // Time complexity is O(n)
  isBST(node, min, max) {
    if (!node) {
      return true;
    }
    if (node.value < min || node.value > max) {
      return false;
    }
    return (
      this.isBST(node.left, min, node.value) &&
      this.isBST(node.right, node.value, max)
    );
  }
}


// Example
console.log("Binary Search Tree");
const bst = new BinarySearchTree();
console.log(bst.isEmpty());
bst.insert(10);
bst.insert(5);
bst.insert(15);
bst.insert(3);
bst.insert(7);
bst.insert(13);
bst.insert(17);
bst.insert(2);
console.log(bst.search(bst.root, 10));
console.log(bst.search(bst.root, 7));
bst.inOrder();
bst.preOrder();
bst.postOrder();
bst.levelOrder();
bst.printLevel(bst.root, 3);
console.log(bst.min(bst.root));
console.log(bst.max(bst.root));
console.log(bst.height(bst.root));


module.exports = BinarySearchTree;