'use strict';

var fromGenerator = require('./fromGenerator');
var pipe = require('./helpers/pipe');

var map = function (stream, mapFn) {
  return fromGenerator(function (next, error, end) {
    stream.onError(error);
    stream.onEnd(end);

    stream.onNext(pipe(mapFn, next));
  });
};

module.exports = map;
