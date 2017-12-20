import { expect } from 'chai';
import Node from '../lib/Node.js'
import Trie from '../lib/Trie.js'
import fs from 'fs';

const text = "/usr/share/dict/words"
const dictionary = fs.readFileSync(text).toString().trim().split('\n')

// add to each
// expect(mergeSort).to.be.a('function');

describe('TRIE', () => {
  let trie;
  let node;

  beforeEach(() => {
    trie = new Trie();
    node = new Node();
  });

  it('should exist', () => {
    expect(trie).to.exist;
  });

  it('should start with zero words', () => {
    expect(trie.count).to.eq(0);
  });

  it('should have a root of a null node', () => {
    expect(trie.root).to.deep.equal(node);
  });

  describe('INSERT', () => {
    let trie = new Trie();
    trie.insert('apple');


    it('should have a root node with an a letter child', () => {
      expect(trie.root.children.hasOwnProperty('a')).to.equal(true);
    })

    it('should have a p child of the a child', () => {
      expect(trie.root.children['a'].children.hasOwnProperty('p')).to.equal(true);
    })

    it('should have a p child of the p child', () => {
      expect(trie.root.children['a'].children['p'].children.hasOwnProperty('p')).to.equal(true);
    })

    it('should have a l child of the p child', () => {
      expect(trie.root.children['a'].children['p'].children['p'].children.hasOwnProperty('l')).to.equal(true);
    })

    it('should have a e child of the l child', () => {
      expect(trie.root.children['a'].children['p'].children['p'].children['l'].children.hasOwnProperty('e')).to.equal(true);
    })

    it('should set the wordEnd property of the last letter to true', () => {
      expect(trie.root.children['a'].children['p'].children['p'].children['l'].children['e'].wordEnd).to.equal(true);
    })

    it('should count the number of words in the trie', () => {
      expect(trie.count).to.equal(1);
    })

    it('should be able to insert words at nodes that already exist', () => {
      trie.insert('ape')
      expect(trie.count).to.equal(2);
      expect(trie.root.children['a'].children['p'].children.hasOwnProperty('p')).to.equal(true);
      expect(trie.root.children['a'].children['p'].children.hasOwnProperty('e')).to.equal(true);
    })

    it('should not take in a word that is already in the tree', () => {
      trie.insert('peach')
      expect(trie.count).to.equal(3)
      
      trie.insert('peach');
      expect(trie.count).to.equal(3)

      trie.insert('banana')
      expect(trie.count).to.equal(4)
      
      trie.insert('banana');
      expect(trie.count).to.equal(4)
    })
  })

describe('SUGGEST', () => {
  it('should take in a string and return an array', () => {
    let trie = new Trie();
    trie.insert('pizza');
    expect(trie.suggest('piz')).to.be.array;
  });

  it('should suggest all words matching the phrase parameter (small sample)', () => {
    let trie = new Trie();
    trie.insert('dead');
    trie.insert('dirt');
    trie.insert('done');
    trie.insert('donuts');

    expect(trie.suggest('d')).to.deep.equal(['dead', 'dirt', 'done', 'donuts']);
    expect(trie.suggest('do')).to.deep.equal(['done', 'donuts']);
  });

  it('should suggest all words matching the phrase parameter (large sample)', () => {
    let trie = new Trie();
    trie.populate(dictionary);
    expect(trie.suggest('piz')).to.deep.equal(['pize', 'pizza', 'pizzeria', 'pizzicato', 'pizzle']);
  });

  it('should return empty array if the phrase does not match any words (small sample)', () => {
    let trie = new Trie();
    trie.insert('piece');
    trie.insert('pizza');

    expect(trie.suggest('!')).to.deep.equal([]);
  });

});

  describe('POPULATE', () => {
    it('should fill the trie with an array of ten words', () => {
      let trie = new Trie();
      trie.populate(['dasher', 'dancer', 'prancer', 'vixen', 'comet', 'cupid', 'dunder', 'blixen', 'rudolf', 'santa']);
      console.log( JSON.stringify(trie, null, 4) );
      expect(trie.countWords()).to.equal(10);
    });

    it('should fill the trie with the dictionary imported in this file', () => {
      let trie = new Trie();
      trie.populate(dictionary);
      expect(trie.countWords()).to.equal(234371);
    });

    it('should return empty array if the phrase does not match any words (large sample)', () => {
      let trie = new Trie();
      trie.populate(dictionary);
      expect(trie.suggest('zzz')).to.deep.equal([]);
    });
  });
});




