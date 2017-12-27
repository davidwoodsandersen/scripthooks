/*
  The TextEditor Constructor acts as a
  layer of abstraction between the application
  and the ace-editor dependency.
*/

function TextEditor(options) {
  this.id = options.id;
  this.code = options.code;
}

TextEditor.prototype.initialize = function() {
  var self = this;
  var changeEventTimeout;

  self.editor = ace.edit(`code-${this.id}`);
  self.editor.setTheme("ace/theme/monokai");
  self.editor.getSession().setMode("ace/mode/javascript");
  self.editor.on('change', function(e) {
    // Throttle the event listener
    // using changeEventTimeout
    if (!changeEventTimeout) {
      changeEventTimeout = setTimeout(function() {
        changeEventTimeout = null;

        ms.publish('codeValueUpdated', {
          id: self.id,
          value: self.getValue()
        });
      }, 1000);
    }
  });

  self.setValue(self.code);
};

TextEditor.prototype.setValue = function(value) {
  this.editor.setValue(value);
};

TextEditor.prototype.getValue = function() {
  return this.editor.getValue();
};

function CodeManager() {}

CodeManager.prototype.listen = function() {
  ms.subscribe({
    'entryViewCreated': function(data) {
      var textEditor = new TextEditor({
        id: data.id,
        code: data.code
      });

      textEditor.initialize();
    }
  });
};
