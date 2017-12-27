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
          ms.publish('entryCreated', {
            id: entries[entry].id
          });
        }
      }

      ms.publish('saveDataRequested', {
        entries: self.getAllEntries()
      });
    },
    'newEntryRequested': function() {
      var entry = new Entry();

      self.add(entry);

      ms.publish('entryCreated', {
        id: entry.id
      });

      ms.publish('saveDataRequested', {
        entries: self.getAllEntries()
      });
    },
    'deleteEventRequested': function(data) {
      self.delete(data.id);

      ms.publish('saveDataRequested', {
        entries: self.getAllEntries()
      });

      ms.publish('entryDeleted', {
        id: data.id
      });
    }
  });
};
