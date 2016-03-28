import _ from 'lodash';

export default function clean(strings, ...values) {
  if (!strings.raw) {
    throw new Error('Use clean as a tag for template string, e.g. clean`123`, not clean(`123`).');
  } else {
    const joined = _.join(_.flatten(_.zip(strings, values)), '');
    const cleaned = _.replace(joined, /(([.,!?])?\s*){1,}([.,!?])/g, '$3');
    const shortened = _.replace(cleaned, /\s{2,}|\n{1,}/g, ' ');
    const trimmed = _.replace(shortened, /^[\s.,!?]*(.*?)\s*$/, '$1');

    return trimmed;
  }
}
