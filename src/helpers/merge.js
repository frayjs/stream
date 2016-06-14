'use strict';

var mixin = function (a, b) {
  return Object.keys(b).reduce(function (acc, key) {
    acc[key] = b[key];
    return acc;
  }, a);
};

var merge = function (/* objs... */) {
  var objs = [].slice.call(arguments);
  return objs.reduce(mixin, {});
};

module.exports =  merge;
