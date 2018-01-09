const shouldBeIncluded = value => !(typeof value === 'undefined' || typeof value === 'function' || value === null || (value instanceof Array && value.length === 0) || (typeof value === 'object' && (Object.keys(value).length === 0)));

function clean(first, ...rest) {
  if (!first) {
    return '';
  } else if (typeof first === 'function' || first instanceof Function) {
    return (strings, ...values) => clean(strings, ...values.map(e => first(e)));
  } else if (typeof first === 'object' && first.raw && first.map) {
    return first.reduce((total, current, index) => {
      if (index === 0) {
        return current;
      } else if (shouldBeIncluded(rest[index - 1])) {
        return `${total}${rest[index - 1]}${current}`;
      } else {
        return `${total}${current}`;
      }
    }).replace(/(([.,!?])?\s*){1,}([.,!?])/g, '$3').replace(/\s{2,}|\n{1,}/g, ' ').replace(/^[\s.,!?]*(.*?)\s*$/g, '$1');
  } else if (rest.length === 0) {
    return first;
  } else {
    return [first, ...rest];
  }
}

module.exports = clean;
