import test from 'ava';
import clean from './index.js';

test('Just remove excess spaces.', t => {
  const source = clean`
    Lorem ipsum dolor sit amet,
    consectetur adipisicing elit,
    sed do eiusmod tempor incididunt
    ut labore et dolore magna aliqua.
    Ut enim ad minim veniam,
    quis nostrud exercitation ullamco
    laboris nisi ut aliquip ex ea commodo consequat.
    Duis aute irure dolor in reprehenderit
    in voluptate velit esse cillum dolore
    eu fugiat nulla pariatur.
    Excepteur sint occaecat cupidatat non proident,
    sunt in culpa qui officia deserunt
    mollit anim id est laborum.
  `;
  const target = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

  t.is(source, target);
});

test('Removes undefined and joins punctuation marks.', t => {
  const source = clean`
    Hello, ${null}.
    I am here ${undefined} to fix ${undefined} punctuation.
    There are ${0} problems.
  `;
  const target = 'Hello. I am here to fix punctuation. There are 0 problems.';

  t.is(source, target);
});

test('Turns booleans into strings.', t => {
  const source = clean`
    The Universe is huge. It's ${true}. This is not ${false} news.
  `;
  const target = 'The Universe is huge. It\'s true. This is not false news.';

  t.is(source, target);
});

test('Turns numbers, even zeroes, into strings.', t => {
  const source = clean`
    Ketogenic diet does not imply ${0} daily carbohydrate intake.
  `;
  const target = 'Ketogenic diet does not imply 0 daily carbohydrate intake.';

  t.is(source, target);
});

test('Is okay with as many values at any location of the template string.', t => {
  const source = clean`
    123123
    ${3 - 2}${3 - 1}${3}${1}${1 + 1}${1 + 1 + 1}
  `;
  const target = '123123 123123';

  t.is(source, target);
});

//
// Weird stuff
//
test('Does not allow a function as one of the template values.', t => {
  const source = clean`
    Hello, ${() => 123}!
  `;
  const target = 'Hello!';

  t.is(source, target);
});

test('Does not allow a constructor function as one of the template values.', t => {
  const source = clean`
    Hello, ${Object}!
  `;
  const target = 'Hello!';

  t.is(source, target);
});

test('Does not allow an empty array or an empty object as one of the template values.', t => {
  const source = clean`
    Hello, ${[]} ${{}}!
  `;
  const target = 'Hello!';

  t.is(source, target);
});

test('Does not allow a prototype as one of the template values.', t => {
  const source = clean`
    Hello, ${Object.prototype}!
  `;
  const target = 'Hello!';

  t.is(source, target);
});
