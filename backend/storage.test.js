import assert from 'assert'

import { add, remove, get } from './storage.js'

describe('storage', () => {
  it('should add a word and a synonym to the hash', () => {
    add('foo', 'bar')

    const expectedResult = ['bar', 'foo']
    assert.deepEqual(expectedResult, get('foo'))
    assert.deepEqual(expectedResult, get('bar'))
  })

  it('should not add duplicates if the words already exists', () => {
    add('foo', 'bar')

    const expectedResult = ['bar', 'foo']
    assert.deepEqual(expectedResult, get('foo'))
    assert.deepEqual(expectedResult, get('bar'))
  })

  it('should add another word to one of the words from before', () => {
    add('baz', 'bar')

    const expectedResult = ['bar', 'baz', 'foo']
    assert.deepEqual(expectedResult, get('foo'))
    assert.deepEqual(expectedResult, get('bar'))
    assert.deepEqual(expectedResult, get('baz'))
  })

  it('should remove one of the words from the hash', () => {
    remove('bar')

    const expectedResult = ['baz', 'foo']
    assert.deepEqual(expectedResult, get('baz'))
    assert.deepEqual(expectedResult, get('foo'))
  })

  it('should return an empty array if the word doesnt exist in the hash', () => {
    assert.deepEqual([], get('bar'))
  })
})
