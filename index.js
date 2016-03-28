'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = clean;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function clean(strings) {
  if (!strings.raw) {
    throw new Error('Use clean as a tag for template string, e.g. clean`123`, not clean(`123`).');
  } else {
    for (var _len = arguments.length, values = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      values[_key - 1] = arguments[_key];
    }

    var joined = _lodash2.default.join(_lodash2.default.flatten(_lodash2.default.zip(strings, values)), '');
    var cleaned = _lodash2.default.replace(joined, /(([.,!?])?\s*){1,}([.,!?])/g, '$3');
    var shortened = _lodash2.default.replace(cleaned, /\s{2,}|\n{1,}/g, ' ');
    var trimmed = _lodash2.default.replace(shortened, /^[\s.,!?]*(.*?)\s*$/, '$1');

    return trimmed;
  }
}
