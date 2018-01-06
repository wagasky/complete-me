export default class Node {
  constructor (letter = null) {
    this.letter = letter;
    this.wordEnd = false;
    this.children = {};
    this.popularity = 0;
  }
}
