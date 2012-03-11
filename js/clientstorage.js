window.storage = new function () {
    // the list that contains the items 
    var todoList = document.getElementById("todoList");
    var me = this;

    /**
    * Restore the items previously saved from the data source.
    */
    me.restoreItems = function() {
        // initialize the data source
        if(window.localStorage && localStorage.todoItems) {
            // retrieve the items from the storage
            var itemsLoaded = JSON.parse(localStorage.todoItems)
            var itemsList = [];
            // iterate and render the items as HTML list items
            for(var item in itemsLoaded) {
                itemsList.push("<li>" + itemsLoaded[item] + "</li>");
            }
            todoList.innerHTML = itemsList.join('');
        }
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
        localStorage.todoItems = JSON.stringify(todoItemsAsText);
    };

    /**
    * Remove all the saved items in the data source.
    */
    me.clearItems = function () {
        localStorage.removeItem("todoItems");
    };

};
