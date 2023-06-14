import {
  capitalize,
  removeTags
} from '../../../src/application/utils/string-formater';

describe('capitalize', () => {
  it('should capitalize the first letter of a string', () => {
    expect(capitalize('hello world')).toEqual('Hello world');
  });

  it('should capitalize all words in a string', () => {
    expect(capitalize('hello world', true)).toEqual('Hello World');
  });
});

describe('removeTags', () => {
  it('should remove HTML tags from a string', () => {
    expect(removeTags('<p>Hello world</p>')).toEqual('Hello world');
  });

  it('should return an empty string if input is empty', () => {
    expect(removeTags('')).toEqual('');
  });

  it('should return the input if it does not contain HTML tags', () => {
    expect(removeTags('Hello world')).toEqual('Hello world');
  });
});
