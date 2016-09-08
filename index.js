'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.default = clean;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function clean() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  if (!_lodash2.default.first(args)) {
    throw new Error('Use clean as a tag for template string, e.g. clean`Hello, ${username}`.');
  } else if (_lodash2.default.isFunction(_lodash2.default.first(args))) {
    var _ret = function () {
      var expand = _lodash2.default.first(args);

      return {
        v: function v(strings) {
          for (var _len2 = arguments.length, values = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
            values[_key2 - 1] = arguments[_key2];
          }

          return clean.apply(undefined, [strings].concat(_toConsumableArray(values.map(function (e) {
            return expand(e);
          }))));
        }
      };
    }();

    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
  } else if (_lodash2.default.first(args).raw) {
    var _expand = _lodash2.default.isFunction(args[0]) ? args[0] : function (e) {
      return e;
    };
    var strings = _lodash2.default.isFunction(args[0]) ? args[1] : args[0];
    var values = _lodash2.default.slice(args, _lodash2.default.isFunction(args[0]) ? 2 : 1);
    var joined = _lodash2.default.join(_lodash2.default.flatten(_lodash2.default.zip(strings, _lodash2.default.map(values, _expand))), '');
    var cleaned = _lodash2.default.replace(joined, /(([.,!?])?\s*){1,}([.,!?])/g, '$3');
    var shortened = _lodash2.default.replace(cleaned, /\s{2,}|\n{1,}/g, ' ');
    var trimmed = _lodash2.default.replace(shortened, /^[\s.,!?]*(.*?)\s*$/, '$1');

    return trimmed;
  } else if (_lodash2.default.size(args) === 1) {
    return _lodash2.default.first(args);
  } else {
    return args;
  }
}
module.exports = exports['default'];
