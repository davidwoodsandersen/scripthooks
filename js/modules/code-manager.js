/*
  The TextEditor Constructor acts as a
  layer of abstraction between the application
  and the ace-editor dependency.
*/

function TextEditor(options) {
  this.id = options.id;
}

TextEditor.prototype.initialize = function() {
  var editor = ace.edit(`code-${this.id}`);
  editor.setTheme("ace/theme/monokai");
  editor.getSession().setMode("ace/mode/javascript");
};

function CodeManager() {}

CodeManager.prototype.listen = function() {
  ms.subscribe({
    'entryViewCreated': function(data) {
      var textEditor = new TextEditor({
        id: data.id
      });
      textEditor.initialize();
    }
  });
};
