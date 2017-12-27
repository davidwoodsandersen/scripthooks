function UserInterface() {
  this.entryContainer = document.getElementById('event-handlers');
  this.newEntryButton = document.getElementById('add-event-handler');
}

UserInterface.prototype.createEntryView = function(data) {
  var self = this;
  var viewContainer = document.createElement('div');
  var deleteButton;
  var eventNameField;
  var enabledCheckbox;

  viewContainer.className = 'handler';
  viewContainer.setAttribute('data-entry-id', data.id);
  viewContainer.innerHTML = `
    <label>Event Name:</label>
    <input type="text" data-event-name="${data.id}">
    <label>Enabled:</label>
    <input type="checkbox" data-enabled="${data.id}">
    <button data-delete="${data.id}"></button>
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

  eventNameField = document.querySelector(`[data-event-name="${data.id}"]`);
  eventNameField.value = data.eventName;
  eventNameField.addEventListener('blur', function() {
    ms.publish('entryContentUpdated', {
      id: data.id,
      eventName: eventNameField.value
    });
  });

  enabledCheckbox = document.querySelector(`[data-enabled="${data.id}"]`);
  enabledCheckbox.checked = data.enabled;
  enabledCheckbox.addEventListener('change', function() {
    ms.publish('entryContentUpdated', {
      id: data.id,
      enabled: enabledCheckbox.checked
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
