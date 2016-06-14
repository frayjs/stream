'use strict';

var fromGenerator = require('./fromGenerator');

var flat = function (stream) {
  return fromGenerator(function (next, error, end) {
    stream.onError(error);
    stream.onEnd(end);

    stream.onNext(function (msg) {
      msg.onNext(next);
      msg.onError(error);
    });
  });
};

module.exports = flat;
