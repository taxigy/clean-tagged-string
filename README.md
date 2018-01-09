# clean-tagged-string

```bash
yarn add clean-tagged-string
```

A simple utility function to clean ES6 tagged template strings.

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

## Applying expansion function against values

You can use `clean` with your own function that will be applied
to every value you pass into the template literal:

```javascript
console.log(clean(e => e * 2)`It's only ${100}!`);
```

Output:

```
It's only 200!
```

---

Attention! Beginning with version 0.0.6, the module uses ES2017
syntax. It's fine if you intend to run it as is in any modern
browser, but if you intend to support older browsers, too, please
make sure to transpile it into ES5 in your build pipeline.
Thanks!
