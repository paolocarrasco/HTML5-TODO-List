var storage = new Storage();

Storage.prototype.initialize = function(successCallback) {
    if(window.localStorage && localStorage.todoItems) {
        successCallback();
    }
};

Storage.prototype.retrieveItemsFromDataSource = function(successCallback) {
    successCallback(JSON.parse(localStorage.todoItems));
};

Storage.prototype.saveItemsToDataSource = function(todoItemsAsText) {
    if(!window.localStorage) return;
    localStorage.todoItems = JSON.stringify(todoItemsAsText);
};

Storage.prototype.removeItems = function() {
    if(!window.localStorage) return;
    localStorage.removeItem("todoItems");
};
