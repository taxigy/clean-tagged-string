'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = clean;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var shouldBeIncluded = function shouldBeIncluded(value) {
  return !(typeof value === 'undefined' || typeof value === 'function' || value === null || value instanceof Array && value.length === 0 || (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && Object.keys(value).length === 0);
};

function clean(first) {
  for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    rest[_key - 1] = arguments[_key];
  }

  if (!first) {
    return '';
  } else if (typeof first === 'function' || first instanceof Function) {
    return function (strings) {
      for (var _len2 = arguments.length, values = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        values[_key2 - 1] = arguments[_key2];
      }

      return clean.apply(undefined, [strings].concat(_toConsumableArray(values.map(function (e) {
        return first(e);
      }))));
    };
  } else if ((typeof first === 'undefined' ? 'undefined' : _typeof(first)) === 'object' && first.raw && first.map) {
    return first.reduce(function (total, current, index) {
      if (index === 0) {
        return current;
      } else if (shouldBeIncluded(rest[index - 1])) {
        return '' + total + rest[index - 1] + current;
      } else {
        return '' + total + current;
      }
    }).replace(/(([.,!?])?\s*){1,}([.,!?])/g, '$3').replace(/\s{2,}|\n{1,}/g, ' ').replace(/^[\s.,!?]*(.*?)\s*$/g, '$1');
  } else if (rest.length === 0) {
    return first;
  } else {
    return [first].concat(rest);
  }
}
module.exports = exports['default'];
