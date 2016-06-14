'use strict';

var pipe = function (source /* , fns... */) {
  var fns = [].slice.call(arguments, 1);

  return function (/* args... */) {
    return fns.reduce(function (acc, fn) {
      return fn(acc);
    }, source.apply(null, arguments));
  };
};

module.exports = pipe;
