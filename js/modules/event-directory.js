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

EventDirectory.prototype.getAllEvents = function() {
  return this._events;
};

EventDirectory.prototype.listen = function() {
  var self = this;

  ms.subscribe({
    'dataLoaded': function(data) {
      var events = data.events;

      for (var event in events) {
        if (events.hasOwnProperty(event)) {
          self.add(events[event]);
          ms.publish('eventCreated', {
            id: events[event].id
          });
        }
      }

      ms.publish('saveDataRequested', {
        events: self.getAllEvents()
      });
    },
    'newEventRequested': function() {
      var event = new Event();

      self.add(event);

      ms.publish('eventCreated', {
        id: event.id
      });

      ms.publish('saveDataRequested', {
        events: self.getAllEvents()
      });
    },
    'deleteEventRequested': function(data) {
      self.delete(data.id);

      ms.publish('saveDataRequested', {
        events: self.getAllEvents()
      });

      ms.publish('eventDeleted', {
        id: data.id
      });
    }
  });
};
