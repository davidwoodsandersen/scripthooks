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

  messageService.subscribe('newEventRequested', function() {
    var event = new Event();

    self.add(event);
    messageService.publish('eventCreated', {
      id: event.id
    });
  })
};
