import _ from 'lodash';

export default function clean(strings, ...values) {
  if (!strings.raw) {
    throw new Error('Use clean as a tag for template string, e.g. clean`123`, not clean(`123`).');
  } else {
    const joined = _.join(_.flatten(_.zip(strings, values)), '');
    const cleaned = _.replace(joined, /([.,!?])?\s*([.,!?])/g, '$2');
    const trimmed = _.replace(cleaned, /^\s*(.*)\s*$/, '$1');
    const shortened = _.replace(trimmed, /\s{2,}/g, ' ');

    return shortened;
  }
}
