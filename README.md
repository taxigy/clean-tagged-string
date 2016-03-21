# clean-tagged-string
A simple utility function to clean ES6 tagged template strings, a super simple
one.

Without `clean`:

```javascript
const username = null;

console.log(`
  Hello, ${username}, glad you asked!
  This tiny little tagged string function cleans extra spaces,
  so you don't have to worry about spaces and line breaks and also
  undefined values that don't render properly. The "clean" function
  takes care of that.
`);
```

Output:

```

  Hello, null, glad you asked!
  This tiny little tagged string function cleans extra spaces,
  so you don't have to worry about spaces and line breaks and also
  undefined values that don't render properly. The "clean" function
  takes care of that.

```

With `clean`:

```javascript
import clean from 'clean-tagged-string';

const username = null;

console.log(clean`
  Hello, ${username}, glad you asked!
  This tiny little tagged string function cleans extra spaces,
  so you don't have to worry about spaces and line breaks and also
  undefined values that don't render properly. The "clean" function
  takes care of that.
`);
```

Output:

```
Hello, glad you asked! This tiny little tagged string function cleans extra spaces, so you don't have to worry about spaces and line breaks and also undefined values that don't render properly. The "clean" function takes care of that.
```
