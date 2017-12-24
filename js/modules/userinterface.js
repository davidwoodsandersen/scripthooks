function UserInterface() {
  this.eventsContainer = document.getElementById('event-handlers');
  this.newEventsButton = document.getElementById('add-event-handler');
}

UserInterface.prototype.createEventView = function(data) {
  var self = this;
  var viewContainer = document.createElement('div');
  var deleteButton;

  viewContainer.className = 'handler';
  viewContainer.setAttribute('data-event-id', data.id);
  viewContainer.innerHTML = `
    <label>Event Name:</label>
    <input type="text">
    <label>Enabled:</label>
    <input type="checkbox">
    <button data-delete="${data.id}">Delete</button>
  `;

  self.eventsContainer.appendChild(viewContainer);
  deleteButton = document.querySelector(`[data-delete="${data.id}"]`);
  deleteButton.addEventListener('click', function() {
    messageService.publish('deleteEventRequested', { id: data.id });
  });
};

UserInterface.prototype.deleteEventView = function(data) {
  var viewToDelete = document.querySelector(`[data-event-id="${data.id}"]`);

  viewToDelete.parentNode.removeChild(viewToDelete);
};

UserInterface.prototype.listen = function() {
  var self = this;

  self.newEventsButton.addEventListener('click', function() {
    messageService.publish('newEventRequested');
  });

  messageService.subscribe('eventCreated', function(data) {
    self.createEventView(data);
  });

  messageService.subscribe('eventDeleted', function(data) {
    self.deleteEventView(data);
  });
};
