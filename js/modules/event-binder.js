/*
  EventBinder stores an executable script
  in localStorage, compiled from entry data,
  to be used by "content-script.js".
*/

function EventBinder() {}

EventBinder.prototype.buildScript = function(entries) {
  var scriptContent = '';

  for (var x in entries) {
    var entry = entries[x];

    if (entries.hasOwnProperty(x) && entry.enabled) {
      scriptContent += `
        window.addEventListener('${entry.eventName}', function(e) {
          ${entry.code}
        });
      `;
    }
  }

  return scriptContent.replace(/[\n\r]/g, '');
};

EventBinder.prototype.save = function(entries) {
  var self = this;

  try {
    chrome.tabs.executeScript(null, {
      code: `localStorage.setItem("scriptHooks", "${self.buildScript(entries)}");`
    }, function() {
      if (chrome.runtime.lastError) {
        console.warn("Caught Error: " + chrome.runtime.lastError.message);
      }
    });
  }
  catch (e) {
    console.log(e);
  }
};

EventBinder.prototype.listen = function() {
  var self = this;

  ms.subscribe({
    'saveDataRequested': function(data) {
      self.save(data.entries);
    }
  })
};
