fray.stream
===========

Reactive helpers

[![Build Status](https://img.shields.io/travis/frayjs/stream.svg)](https://travis-ci.org/frayjs/stream)
[![Test Coverage](https://img.shields.io/codeclimate/coverage/github/frayjs/stream.svg)](https://codeclimate.com/github/frayjs/stream/coverage)

Usage
-----

We can naively define a stream as an event emitter with a limited set of
events: `next`, `error` and `end`

Having a single `next` event to notify data is needed to create abstractions
that can handle every stream _(such as a `map(transform, stream): stream`
function which acts like `Array.prototype.map` but with streams instead of
arrays)_

`error` events allows us to separate error handling from business logic
improving code readability

`end` events are used for resource cleaning

### Creating a stream with `stream.create`

The `pingStream` is a simple stream which emits `undefined` every second

```js
var pingStream = stream.create(function (next) {
  setInterval(next, 1000);
});

pingStream.onNext(function () {
  console.log('ping');
});
```

`stream.create(generator)` gets a stream generator function provided with
functions to notify the 3 possible events:

```js
stream(function (next, error, end) { ... });
```

  * `next(msg)`: emits `next` events
  * `error(msg)`: emits `error` events
  * `end()`: emits `end` events

Install
-------

    npm install fray.stream

Contributing
------------

PRs are welcome!

### Unit tests

    git clone https://github.com/frayjs/stream
    cd stream
    npm install
    npm test

License
-------

MIT
