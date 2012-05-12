namespace('com.abaris', function(ns) {
    var db, // the variable that will contain the database object
        _createTableStatement = 'CREATE TABLE IF NOT EXISTS item (text)',
        _insertStatement = 'INSERT INTO item (text) VALUES (?)',
        _selectStatement = 'SELECT text FROM item',
        _deleteStatement = 'DELETE FROM item',
        _dbName,
        _dbVersion,
        _dbDescription,
        _dbSize;

    ns.Storage.constructor = function(dbName, 
            dbVersion, dbDescription, dbSize) {
        _dbName = dbName;
        _dbVersion = dbVersion;
        _dbDescription = dbDescription;
        _dbSize = dbSize;
        return new ns.Storage();
    };

    ns.Storage.prototype.initialize = function(successCallback) {
        // if no openDatabase function... nothing to do with this app
        if(!window.openDatabase) return;
        // creating the database
        db = openDatabase(_dbName, _dbVersion, _dbDescription, _dbSize);
        // if the database wasn't created, nothing could be done from now on
        if(!db) return;
        // creating the table we'll be working on
        db.transaction(function (tx) {
            tx.executeSql(_createTableStatement);
            successCallback();
        });
    };

    ns.Storage.prototype.retrieveItemsFromDataSource = function(successCallback) {
        // if the database wasn't created, nothing could be done from now on
        if(!db) return;
        db.transaction(function (tx) {
            tx.executeSql(_selectStatement, [], function (tx, results) {
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
            tx.executeSql(_deleteStatement, []);
            // iterate over all the items received to insert them
            for(var todoItem in todoItemsAsText) {
                tx.executeSql(_insertStatement, [todoItemsAsText[todoItem]]);
            }
        });
    };

    ns.Storage.prototype.removeItems = function() {
        // if the database wasn't created, nothing could be done from now on
        if(!db) return;
        // the query to delete the items
        db.transaction(function (tx) {
            tx.executeSql(_deleteStatement, []);
        });
    };

});