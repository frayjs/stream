'use strict';

var fromGenerator = require('./fromGenerator');

var combine = function (stream, streamB, combineFn) {
  var a = {
    stream: stream,
    last: null,
    hasNotified: false,
    hasFinished: false
  };

  var b = {
    stream: streamB,
    last: null,
    hasNotified: false,
    hasFinished: false
  };

  return fromGenerator(function (next, error, end) {
    a.stream.onError(error);

    a.stream.onEnd(function () {
      a.hasFinished = true;
      if (b.hasFinished) { end(); }
    });

    a.stream.onNext(function (msg) {
      a.last = msg;
      a.hasNotified = true;
      if (b.hasNotified) { next(combineFn(a.last, b.last)); }
    });

    b.stream.onError(error);

    b.stream.onEnd(function () {
      b.hasFinished = true;
      if (a.hasFinished) { end(); }
    });

    b.stream.onNext(function (msg) {
      b.last = msg;
      b.hasNotified = true;
      if (a.hasNotified) { next(combineFn(a.last, b.last)); }
    });
  });
};

module.exports = combine;
