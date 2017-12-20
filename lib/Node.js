export default class Node {
  constructor (letter = null) {
    this.letter = letter;
    this.wordEnd = false;
    this.children = {} ;
  }
}

// module.exports = Node;