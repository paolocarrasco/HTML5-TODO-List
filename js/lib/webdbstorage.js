namespace('com.abaris', function(ns) {
    var db; // the variable that will contain the database object
    var DB_NAME = 'tododb';
    var DB_DESCRIPTION = 'TODO List Database';
    var DB_VERSION = ''; // in order to make upgrades from now on
    var DB_SIZE = 2097152;
    var CREATE_TABLE_STATEMENT = 'CREATE TABLE IF NOT EXISTS item (text)';
    var INSERT_STATEMENT = 'INSERT INTO item (text) VALUES (?)';
    var SELECT_STATEMENT = 'SELECT text FROM item';
    var DELETE_STATEMENT = 'DELETE FROM item';
   
    ns.Storage.prototype.initialize = function(successCallback) {
        // if no openDatabase function... nothing to do with this app
        if(!window.openDatabase) return;
        // creating the database with a size of 2 * 1024 * 1024 bytes
        db = openDatabase(DB_NAME, DB_VERSION, DB_DESCRIPTION, DB_SIZE);
        // if the database wasn't created, nothing could be done from now on
        if(!db) return;
        // creating the table we'll be working on
        db.transaction(function (tx) {
            tx.executeSql(CREATE_TABLE_STATEMENT);
            // call the retrieval of items
            ns.Storage.prototype.retrieveItemsFromDataSource.call(this, successCallback);
        });
    };

    ns.Storage.prototype.retrieveItemsFromDataSource = function(successCallback) {
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

    ns.Storage.prototype.saveItemsToDataSource = function(todoItemsAsText) {
        // if the database wasn't created, nothing could be done from now on
        if(!db) return;
        // make the insertions in a single transaction
        db.transaction(function(tx) {
            tx.executeSql(DELETE_STATEMENT, []);
            // iterate over all the items received to insert them
            for(var todoItem in todoItemsAsText) {
                tx.executeSql(INSERT_STATEMENT, [todoItemsAsText[todoItem]]);
            }
        });        
    };

    ns.Storage.prototype.removeItems = function() {
        // if the database wasn't created, nothing could be done from now on
        if(!db) return;
        // the query to delete the items
        db.transaction(function (tx) {
            tx.executeSql(DELETE_STATEMENT, []);
        });
    };

});