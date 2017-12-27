function UserInterface() {
  this.entryContainer = document.getElementById('event-handlers');
  this.newEntryButton = document.getElementById('add-event-handler');
}

UserInterface.prototype.createEntryView = function(data) {
  var self = this;
  var viewContainer = document.createElement('div');
  var deleteButton;

  viewContainer.className = 'handler';
  viewContainer.setAttribute('data-entry-id', data.id);
  viewContainer.innerHTML = `
    <label>Event Name:</label>
    <input type="text">
    <label>Enabled:</label>
    <input type="checkbox">
    <button data-delete="${data.id}">Delete</button>
    <section class="editor-container">
      <div id="code-${data.id}"></div>
    </section>
  `;

  self.entryContainer.appendChild(viewContainer);
  deleteButton = document.querySelector(`[data-delete="${data.id}"]`);
  deleteButton.addEventListener('click', function() {
    ms.publish('deleteEntryRequested', {
      id: data.id
    });
  });

  ms.publish('entryViewCreated', data);
};

UserInterface.prototype.deleteEntryView = function(data) {
  var viewToDelete = document.querySelector(`[data-entry-id="${data.id}"]`);

  viewToDelete.parentNode.removeChild(viewToDelete);
};

UserInterface.prototype.listen = function() {
  var self = this;

  self.newEntryButton.addEventListener('click', function() {
    ms.publish('newEntryRequested');
  });

  ms.subscribe({
    'entryCreated': function(data) {
      self.createEntryView(data);
    },
    'entryDeleted': function(data) {
      self.deleteEntryView(data);
    },
    'dataLoaded': function(data) {
      var entries = data.entries;

      if (entries && entries.length) {
        entries.forEach(function(entry) {
          self.createEntryView(entry);
        });
      }
    }
  });
};
