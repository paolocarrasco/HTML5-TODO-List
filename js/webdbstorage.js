var storage = new function() {
    // the list that contains the items 
    var todoList = document.getElementById("todoList");
    // the variable that will contain the database object
    var db;
    var me = this;

    var DB_NAME = 'tododb';
    var DB_DESCRIPTION = 'TODO List Database';
    var DB_VERSION = '1.0.0';
    // db size of 2 * 1024 * 1024 bytes
    var DB_SIZE = 2097152;
    var CREATE_TABLE_STATEMENT = 'CREATE TABLE IF NOT EXISTS item (text)';
    var INSERT_STATEMENT = 'INSERT INTO item (text) VALUES (?)';
    var SELECT_STATEMENT = 'SELECT text FROM item';
    var DELETE_STATEMENT = 'DELETE FROM item';

    /**
    * Restore the items previously saved from the data source.
    */
    me.restoreItems = function() {
        // initialize the data source
        initialize(function() {
            // retrieve the items from the storage
            retrieveItemsFromDataSource(function(itemsLoaded) {
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
        saveItemsToDataSource(todoItemsAsText);
    };

    /**
    * Remove all the saved items in the data source.
    */
    me.clearItems = function () {
        // if the database wasn't created, nothing could be done from now on
        if(!db) return;
        // the query to delete the items
        db.transaction(function (tx) {
            tx.executeSql(DELETE_STATEMENT, []);
        });
    };
   
    var initialize = function(successCallback) {
        // if no openDatabase function... nothing to do with this app
        if(!window.openDatabase) return;
        // creating the database with the given size
        db = openDatabase(DB_NAME, DB_VERSION, DB_DESCRIPTION, DB_SIZE);
        // if the database wasn't created, nothing could be done from now on
        if(!db) return;
        // creating the table we'll be working on
        db.transaction(function (tx) {
            tx.executeSql(CREATE_TABLE_STATEMENT);
            // call the retrieval of items
            retrieveItemsFromDataSource(successCallback);
        });
    };

    var retrieveItemsFromDataSource = function(successCallback) {
        // if the database wasn't created, nothing could be done from now on
        if(!db) return;
        db.transaction(function (tx) {
            tx.executeSql(SELECT_STATEMENT, [], function (tx, results) {
                var itemsLoaded = [];
                var len = results.rows.length;
                // passing the stored items to the resulting variable
                for(var i = 0; i < len; i++) {
                    itemsLoaded.push(results.rows.item(i).text);
                }
                // calling the callback with the items loaded
                successCallback(itemsLoaded);
            });
        });
    };

    var saveItemsToDataSource = function(todoItemsAsText) {
        // if the database wasn't created, nothing could be done from now on
        if(!db) return;
        // make the insertions in a single transaction
        db.transaction(function(tx) {
            // iterate over all the items received to insert them
            for(var todoItem in todoItemsAsText) {
                tx.executeSql(INSERT_STATEMENT, [todoItemsAsText[todoItem]]);
            }
        });        
    };

}
