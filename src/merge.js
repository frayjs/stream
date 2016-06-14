'use strict';

var fromGenerator = require('./fromGenerator');

var merge = function (stream, streamB) {
  var hasFinished = false;
  var hasFinishedB = false;

  return fromGenerator(function (next, error, end) {
    stream.onError(error);
    stream.onNext(next);

    stream.onEnd(function () {
      hasFinished = true;
      if (hasFinishedB) { end(); }
    });

    streamB.onError(error);
    streamB.onNext(next);

    streamB.onEnd(function () {
      hasFinishedB = true;
      if (hasFinished) { end(); }
    });
  });
};

module.exports = merge;
