function DataStore() {
  this.storageIdentifier = 'scriptHooksData';
}

DataStore.prototype.read = function() {
  var self = this;
  var data = {};

  try {
    data = JSON.parse(localStorage.getItem(self.storageIdentifier)).events;
  }
  catch (e) {}

  return data;
};

DataStore.prototype.write = function(data) {
  var self = this;

  localStorage.setItem(self.storageIdentifier, JSON.stringify(data));
};

DataStore.prototype.load = function() {
  var data = this.read();

  ms.publish('dataLoaded', data);
};

DataStore.prototype.listen = function() {
  var self = this;

  ms.subscribe({
    'saveDataRequested': function(data) {
      self.write(data);
      ms.publish('dataSaved', {
        lastSaved: new Date().toTimeString()
      });
    }
  });
};
