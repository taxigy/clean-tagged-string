import _ from 'lodash';

export default function clean(...args) {
  if (!_.first(args)) {
    throw new Error('Use clean as a tag for template string, e.g. clean`Hello, ${username}`.');
  } else if (_.isFunction(_.first(args))) {
    const expand = _.first(args);

    return (strings, ...values) => clean(strings, ...values.map(e => expand(e)));
  } else if (_.first(args).raw) {
    const expand = _.isFunction(args[0]) ? args[0] : e => e;
    const strings = _.isFunction(args[0]) ? args[1] : args[0];
    const values = _.slice(args, _.isFunction(args[0]) ? 2 : 1);
    const joined = _.join(_.flatten(_.zip(strings, _.map(values, expand))), '');
    const cleaned = _.replace(joined, /(([.,!?])?\s*){1,}([.,!?])/g, '$3');
    const shortened = _.replace(cleaned, /\s{2,}|\n{1,}/g, ' ');
    const trimmed = _.replace(shortened, /^[\s.,!?]*(.*?)\s*$/, '$1');

    return trimmed;
  } else if (_.size(args) === 1) {
    return _.first(args);
  } else {
    return args;
  }
}
