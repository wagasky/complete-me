const Node = require('./Node.js');

class Trie extends Node {

  constructor () {
    super(null);
    this.count = 0;
    this.root = new Node();
  }

  get countWords() {
    return this.count;
  }


  insert(word) {
    word = word.toLowerCase().split('');
    let currentNode = this.root;

    word.forEach( letter => {
      if (!currentNode.children[letter]) {
        currentNode.children[letter] = new Node(letter)
      }
      currentNode = currentNode.children[letter]
    })
    if (!currentNode.wordEnd) {
      this.count++;
    }
    currentNode.wordEnd = true;
  }


  suggest(word) {
    word = word.toLowerCase().split('');
    let currentNode = this.root;

    word.forEach( letter => {
        if (currentNode && currentNode.children) {
          currentNode = currentNode.children[letter];
        }
      });
      if (!currentNode) {
        return [];
      }
    return this.findSuggestions(currentNode, word.join(''), []);
  }


  findSuggestions(currentNode, word, suggestions) {
    let childrenLetters = Object.keys(currentNode.children);

    childrenLetters.forEach( childLetter => {
      let letterNode = currentNode.children[childLetter];
      let newWord = word + childLetter;
     

      if (letterNode.wordEnd) {
        let newWordObj = {
          string: newWord,
          popularity: this.findNode(newWord).popularity
        };

        suggestions.push(newWordObj);
      }

      this.findSuggestions(letterNode, newWord, suggestions);
      return suggestions;
    });
    return this.sortSuggestions(suggestions);
  }

  populate(words) {
    words.forEach(word => {
      this.insert(word);
    });
  }

  select(data) {
    let currentNode = this.findNode(data);

    currentNode.popularity++;
  }

  sortSuggestions(array) {
    let sortedArray = array.sort((a, b) => {
      return b.popularity - a.popularity;
    });

    return sortedArray.map(suggestion => {
      return suggestion.string;
    });
  }

  findNode(word) {
    word = word.toLowerCase().split('');
    let position = this.root;

    word.forEach(letter => {
      if (position === null) {
        return;
      } else if (position.children[letter] === undefined) {
        position = null;
        return;
      } else {
        position = position.children[letter];
      }
    });
    return position;
  }

  delete(word) {
    let wordToDelete = this.findNode(word);

    wordToDelete.wordEnd = false;
  }
} 

module.exports = Trie;