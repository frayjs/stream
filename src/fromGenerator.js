'use strict';

var observable = require('fray.observable');

var emitNext = function (emit, msg) {
  emit('next', msg);
};

var emitError = function (emit, msg) {
  emit('error', msg);
};

var emitEnd = function (emit) {
  emit('end');
};

var fromGenerator = function (generator) {
  if (typeof generator !== 'function') {
    throw new Error('missing mandatory generator function');
  }

  var listen = observable(function (emit) {
    var emitters = [
      emitNext.bind(null, emit),
      emitError.bind(null, emit),
      emitEnd.bind(null, emit)
    ];

    generator.apply(null, emitters);
  });

  return {
    onNext: listen.bind(null, 'next'),
    onError: listen.bind(null, 'error'),
    onEnd: listen.bind(null, 'end')
  };
};

module.exports = fromGenerator;
