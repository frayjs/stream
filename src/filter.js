'use strict';

var fromGenerator = require('./fromGenerator');

var filter = function (stream, filterFn) {
  return fromGenerator(function (next, error, end) {
    stream.onError(error);
    stream.onEnd(end);

    stream.onNext(function (msg) {
      if (filterFn(msg)) { next(msg); }
    });
  });
};

module.exports = filter;
