namespace('com.abaris', function(ns) {
    ns.Storage.prototype.initialize = function(successCallback) {
        if(window.localStorage) {
            successCallback();
        }
    };
    
    ns.Storage.constructor = function() {
        return new ns.Storage();
    };

    ns.Storage.prototype.retrieveItemsFromDataSource = function(successCallback) {
        var items = localStorage.todoItems;
        successCallback(items ? JSON.parse(items) : {});
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
