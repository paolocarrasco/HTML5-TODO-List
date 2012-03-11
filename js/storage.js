/**
* Base for storage of items
*/
function Storage() {
    // the list that contains the items 
    var todoList = document.getElementById("todoList");
    // TODO instead of this, we should use a function
    var hasAskedToNotify = false;
    var me = this;

    /**
    * Restore the items previously saved from the data source.
    */
    me.restoreItems = function() {
        // initialize the data source
        me.initialize(function() {
            // retrieve the items from the storage
            me.retrieveItemsFromDataSource(function(itemsLoaded) {
                var itemsList = [];
                // iterate and render the items as HTML list items
                for(var item in itemsLoaded) {
                    itemsList.push("<li>" + itemsLoaded[item] + "</li>");
                }
                todoList.innerHTML = itemsList.join('');
            });
        });
    };

    /**
    * Synchronize the current items with the data source.
    */
    me.synchronizeItems = function() {
        var todoItemsAsText = [];
        var todoItems = document.getElementsByTagName("li");
        var itemsLength = todoItems.length;
        for(var i = 0; i < itemsLength; i++) {
            var todoItem = todoItems[i];
            todoItemsAsText.push(todoItem.innerText || todoItem.textContent);
        }
        me.saveItemsToDataSource(todoItemsAsText);
    };

    /**
    * Remove all the saved items in the data source.
    */
    me.clearItems = function () {
        me.removeItems();
    };
    
    /**** Functions to implement to make this work ****/
    
    // It should initialize the data source
    // me.initialize = function(successCallback) { successCallback(); };

    // It should retrieve the TODO items from the data source.
    // me.retrieveItemsFromDataSource = function(successCallback) { successCallback(); };

    // It should save the items in the data source.
    // me.saveItemsToDataSource = function(todoItemsAsText) {};

    // It should remove the TODO items from the data source.
    // me.removeItems = function() {};
}