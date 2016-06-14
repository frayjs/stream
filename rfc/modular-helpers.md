Modular helpers
===============

Helper functions such as `map`, `filter` or `combine` should be independent
modules to be used as standalone helpers

They share a common signature: `transform(transformation, stream) -> stream`

```js
var map = function (transformation, stream) {
  return createStream(function (next, error, end) {
    stream.onError(error);
    stream.onEnd(end);

    stream.onNext(function (value) {
      next(transformation(value));
    });
  });
};
```

Issues
------

  * How to implement `combineLatest`?
  * `transform` functions must return `fn(stream) -> stream`
