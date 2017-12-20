import Node from './Node.js';

export default class Trie extends Node {

  constructor () {
    super(null);
    this.count = 0;
    this.root = new Node();
  }

  get count() {
    return this.count;
  }

  insert(word) {
    word = word.toLowerCase().split('');
    let currentNode = this.root;

    word.forEach( letter => {
      if (!currentNode.children[letter]) {
        currentNode.children[letter] = new Node(letter);
      }
      currentNode = currentNode.children[letter];
    });
    if (!currentNode.wordEnd) {
      this.count++;
    }
    currentNode.wordEnd = true;
  }

  suggest(word) {
    word = word.toLowerCase().split('');
    let currentNode = this.root;

    word.forEach(letter => {
      if (currentNode && currentNode.children) {
        currentNode = currentNode.children[letter];
      }
    });

    if (!currentNode) {
      return [];
    } 
      return this.findSuggestions(currentNode, word.join(''));
  }
  
  findSuggestions(currentNode, word) {
    let childrenLetters = Object.keys(currentNode.children);
    let suggestions = [];

    childrenLetters.forEach( childLetter => {
      let letterNode = currentNode.children[childLetter];
      let newWord = word + childLetter;

      if (letterNode.wordEnd) {
        suggestions.push(newWord);
      }
      suggestions.push(...this.findSuggestions(letterNode, newWord));
    });
    return suggestions;
  }

  populate(words) {
    words.forEach(word => {
      this.insert(word);
    });
  }
} 


module.exports = Trie;

