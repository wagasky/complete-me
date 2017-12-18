export default class Node {
  constructor (data) {
    this.data = data || null;
    this.left = null;
    this.right = null;
  }
}

module.exports = Node;