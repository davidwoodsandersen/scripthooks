var dataStore = new DataStore();
var codeManager = new CodeManager();
var entryDirectory = new EntryDirectory();
var userInterface = new UserInterface();
var eventBinder = new EventBinder();

dataStore.listen();
codeManager.listen();
entryDirectory.listen();
userInterface.listen();
eventBinder.listen();

dataStore.read();
