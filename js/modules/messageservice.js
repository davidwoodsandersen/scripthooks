var messageService = (function() {
  var _registry = {};

  function subscribe(message, callback) {
    if (!_registry[message]) _registry[message] = [];
    _registry[message].push(callback);
  }

  function publish(message, data) {
    var entry = _registry[message];

    if (entry && entry.length) {
      entry.forEach(function(callback) {
        callback(data);
      });
    }
  }

  return {
    subscribe: subscribe,
    publish: publish
  };
})();
