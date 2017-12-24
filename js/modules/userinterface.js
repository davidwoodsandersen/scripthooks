function UserInterface() {
  this.eventsContainer = document.getElementById('event-handlers');
  this.newEventsButton = document.getElementById('add-event-handler');
}

UserInterface.prototype.createEventView = function(data) {
  var self = this;
  var viewContainer = document.createElement('div');
  viewContainer.className = 'handler';
  viewContainer.setAttribute('data-event-id', data.id);
  viewContainer.innerHTML = `
    <label>Event Name:</label>
    <input type="text">
    <label>Enabled:</label>
    <input type="checkbox">
    <button>Delete</button>
  `;

  self.eventsContainer.appendChild(viewContainer);
};

UserInterface.prototype.listen = function() {
  var self = this;

  self.newEventsButton.addEventListener('click', function() {
    messageService.publish('newEventRequested');
  });

  messageService.subscribe('eventCreated', function(data) {
    self.createEventView(data);
  });
};
