import { expect } from 'chai';
import Node from '../scripts/Node.js'

describe('NODE', () => {
  let node;

  beforeEach(() => {
    node = new Node('pizza')
  })

  it('should be a thing', () => {
    expect(node).to.exist
    expect(node.prev).to.equal(null);
  })

  it('should default next to null', () => {
    expect(node.left).to.equal(null);
    expect(node.right).to.equal(null);
  })

  it('should take data and assign it to data prop', () => {
    expect(node.data).to.equal('pizza')
  })

})
