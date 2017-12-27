var dataStore = new DataStore();
var eventDirectory = new EventDirectory();
var userInterface = new UserInterface();

dataStore.listen();
eventDirectory.listen();
userInterface.listen();

dataStore.read();
