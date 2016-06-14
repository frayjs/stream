'use strict';

var createStream = require('./fromGenerator');
var merge = require('./helpers/merge');

var bind = function (stream, helpers) {
  var boundHelpers = Object.keys(helpers).reduce(function (acc, key) {
    acc[key] = function (/* args... */) {
      var args = [].slice.call(arguments);
      var boundStream = helpers[key].apply(null, [stream].concat(args));
      return merge(boundStream, boundHelpers);
    };
  }, {});

  return merge(stream, boundHelpers);
};

var stream = function (helpers) {
  var create = function (generator) {
    return bind(createStream(generator), helpers);
  };

  return {
    create: create
  };
};

module.exports = stream({
  map: require('./map'),
  filter: require('./filter'),
  merge: require('./merge'),
  combine: require('./combine'),
  flat: require('./flat')
});
