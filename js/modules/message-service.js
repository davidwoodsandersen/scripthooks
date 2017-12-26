var ms = (function() {
  var _registry = {};

  function subscribe(subscriptions) {
    for (var message in subscriptions) {
      if (!_registry[message]) _registry[message] = [];
      _registry[message].push(subscriptions[message]);
    }
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
