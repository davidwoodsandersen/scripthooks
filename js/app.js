var dataStore = new DataStore();
var codeManager = new CodeManager();
var entryDirectory = new EntryDirectory();
var userInterface = new UserInterface();

dataStore.listen();
codeManager.listen();
entryDirectory.listen();
userInterface.listen();

dataStore.read();
