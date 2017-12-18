import { expect } from 'chai';
import Node from '../scripts/Node'
import LinkedList from '../scripts/LinkedList'

describe.skip('LINKED LIST', () => {
  let list;

  beforeEach(() => {
    list = new LinkedList();
  });

  it('should start with zero elements', () => {
    expect(list.length).to.eq(0);
  });

  it('should set its default head to null', () => {
    expect(list.head).to.eq(null);
  });

  describe('UNSHIFT', () => {
    it('should add items to front of list / head', () => {
      list.unshift('duck');
      expect(list.length).to.equal(1)
      expect(list.head.data).to.equal('duck')
      

      list.unshift('goose');
      expect(list.length).to.equal(2)
      expect(list.head.data).to.equal('goose')
      expect(list.head.next.data).to.equal('duck')
    })
  })
});


