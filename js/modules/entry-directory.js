function Entry() {
  this.id = Date.now();
  this.eventName = '';
  this.code = '';
  this.enabled = false;
}

function EntryDirectory() {
  this._entries = {};
}

EntryDirectory.prototype.add = function(entry) {
  this._entries[entry.id] = entry;
};

EntryDirectory.prototype.delete = function(entryId) {
  delete this._entries[entryId];
};

EntryDirectory.prototype.getById = function(entryId) {
  return this._entries[entryId];
};

EntryDirectory.prototype.getAllEntries = function() {
  return this._entries;
};

EntryDirectory.prototype.listen = function() {
  var self = this;

  ms.subscribe({
    'dataLoaded': function(data) {
      var entries = data.entries;

      for (var entry in entries) {
        if (entries.hasOwnProperty(entry)) {
          self.add(entries[entry]);
          ms.publish('entryCreated', entries[entry]);
        }
      }

      ms.publish('saveDataRequested', {
        entries: self.getAllEntries()
      });
    },
    'newEntryRequested': function() {
      var entry = new Entry();

      self.add(entry);

      ms.publish('entryCreated', entry);

      ms.publish('saveDataRequested', {
        entries: self.getAllEntries()
      });
    },
    'deleteEntryRequested': function(data) {
      self.delete(data.id);

      ms.publish('saveDataRequested', {
        entries: self.getAllEntries()
      });

      ms.publish('entryDeleted', {
        id: data.id
      });
    },
    'codeValueUpdated': function(data) {
      var updatedEntry = self.getById(data.id);

      updatedEntry.code = data.value;

      ms.publish('saveDataRequested', {
        entries: self.getAllEntries()
      });
    }
  });
};
