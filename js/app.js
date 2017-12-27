var dataStore = new DataStore();
var entryDirectory = new EntryDirectory();
var userInterface = new UserInterface();

dataStore.listen();
entryDirectory.listen();
userInterface.listen();

dataStore.read();
