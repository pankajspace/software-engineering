// Trie is a tree-like data structure that stores a dynamic set of strings. 
// Tries are commonly used for searching and autocomplete features.
// Tries are commonly used to store the entire English language for quick prefix lookups.


// {
//   "t": {
//     "r": {
//       "i": {
//         "e": {
//           "isEndOfWord": true
//         }
//       }
//     }
//   },
//   "a": {
//     "p": {
//       "i": {
//         "s": {
//           "isEndOfWord": true
//         }
//       }
//     }
//   }
// }


// Tries Operations
// 1. insert(word) - Inserts a word into the trie.
// 2. search(word) - Returns if the word is in the trie.
// 3. startsWith(prefix) - Returns if there is any word in the trie that starts with the given prefix.
// 4. delete(word) - Deletes a word from the trie.
// 5. print() - Prints all the words in the trie.
// 6. isEmpty() - Returns if the trie is empty.
// 7. size() - Returns the number of words in the trie.
// 8. clear() - Clears the trie.


// Trie Implementation in JavaScript 
class TrieNode {
  constructor() {
    this.children = {};
    this.isEnd = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let node = this.root;
    for (let ch of word) {
      if (!node.children[ch]) {
        node.children[ch] = new TrieNode();
      }
      node = node.children[ch];
    }
    node.isEnd = true;
  }

  search(word) {
    let node = this.root;
    for (let ch of word) {
      if (!node.children[ch]) {
        return false;
      }
      node = node.children[ch];
    }
    return node.isEnd;
  }

  startsWith(prefix) {
    let node = this.root;
    for (let ch of prefix) {
      if (!node.children[ch]) {
        return false;
      }
      node = node.children[ch];
    }
    return true;
  }

  delete(word) {
    let deleteHelper = (node, word, index) => {
      if (index === word.length) {
        if (!node.isEnd) {
          return false;
        }
        node.isEnd = false;
        return Object.keys(node.children).length === 0;
      }
      let ch = word[index];
      if (!node.children[ch]) {
        return false;
      }
      let shouldDeleteCurrentNode = deleteHelper(node.children[ch], word, index + 1);
      if (shouldDeleteCurrentNode) {
        delete node.children[ch];
        return Object.keys(node.children).length === 0;
      }
      return false;
    };
    deleteHelper(this.root, word, 0);
  }

  print() {
    let words = [];
    let dfs = (node, path) => {
      if (node.isEnd) {
        words.push(path);
      }
      for (let ch in node.children) {
        dfs(node.children[ch], path + ch);
      }
    };
    dfs(this.root, '');
    return words;
  }

  isEmpty() {
    return Object.keys(this.root.children).length === 0;
  }

  size() {
    let count = 0;
    let dfs = (node) => {
      if (node.isEnd) {
        count++;
      }
      for (let ch in node.children) {
        dfs(node.children[ch]);
      }
    };
    dfs(this.root);
    return count;
  }

  clear() {
    this.root.children = {};
  }
}


// Example
console.log('Trie');
let trie = new Trie();
trie.insert('apple');
trie.insert('trie');
console.log(trie.search('apple')); // true
console.log(trie.search('app')); // false
console.log(trie.startsWith('app')); // true
trie.insert('app');
console.log(trie.search('app')); // true
trie.delete('app');
console.log(trie.search('app')); // false
console.log(trie.print()); // [ 'apple', 'trie' ] 
console.log(trie.isEmpty()); // false
console.log(trie.size()); // 2
trie.clear();
console.log(trie.isEmpty()); // true
console.log(trie.size()); // 0


module.exports = Trie;