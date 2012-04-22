namespace('com.abaris', function(ns) {
    ns.Storage.prototype.initialize = function(successCallback) {
        if(window.localStorage && localStorage.todoItems) {
            successCallback();
        }
    };

    ns.Storage.prototype.retrieveItemsFromDataSource = function(successCallback) {
        successCallback(JSON.parse(localStorage.todoItems));
    };

    ns.Storage.prototype.saveItemsToDataSource = function(todoItemsAsText) {
        if(!window.localStorage) return;
        localStorage.todoItems = JSON.stringify(todoItemsAsText);
    };

    ns.Storage.prototype.removeItems = function() {
        if(!window.localStorage) return;
        localStorage.removeItem("todoItems");
    };

});