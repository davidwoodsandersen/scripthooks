function Event() {
  this.id = Date.now();
  this.name = '';
  this.code = '';
  this.enabled = false;
}

function EventDirectory() {
  this._events = {};
}

EventDirectory.prototype.add = function(event) {
  this._events[event.id] = event;
};

EventDirectory.prototype.delete = function(eventId) {
  delete this._events[eventId];
};

EventDirectory.prototype.getById = function(eventId) {
  return this._events[eventId];
};

EventDirectory.prototype.listen = function() {
  var self = this;

  ms.subscribe({
    'dataLoaded': function(data) {
      for (var event in data) {
        self.add(event);
        ms.publish('eventCreated', data[event]);
      }
      ms.publish('saveDataRequested', {
        events: self._events
      });
    },
    'newEventRequested': function() {
      var event = new Event();

      self.add(event);

      ms.publish('eventCreated', {
        id: event.id
      });

      ms.publish('saveDataRequested', {
        events: self._events
      });
    },
    'deleteEventRequested': function(data) {
      self.delete(data.id);
      ms.publish('eventDeleted', {
        id: data.id
      });
    }
  });
};
