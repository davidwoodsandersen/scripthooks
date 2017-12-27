function DataStore() {
  this.storageIdentifier = 'scriptHooksData';
}

DataStore.prototype.read = function() {
  var storageIdentifier = this.storageIdentifier;

  chrome.storage.sync.get(storageIdentifier, function(data) {
    if (data[storageIdentifier]) {
      ms.publish('dataLoaded', JSON.parse(data[storageIdentifier]));
    }
  });
};

DataStore.prototype.write = function(data) {
  var storageIdentifier = this.storageIdentifier;
  var storageData = {};

  storageData[storageIdentifier] = JSON.stringify(data);

  chrome.storage.sync.set(storageData, function() {
    ms.publish('dataSaved', {
      lastSaved: new Date().toTimeString()
    });
  });
};

DataStore.prototype.listen = function() {
  var self = this;

  ms.subscribe({
    'saveDataRequested': function(data) {
      self.write(data);
    }
  });
};
