namespace('com.abaris', function(ns) {
    var db, // the variable that will contain the database object
        _createTableStatement = 'CREATE TABLE IF NOT EXISTS ${table} (${columns})',
        _insertStatement = 'INSERT INTO ${table} (${columns}) VALUES (${columnValues})',
        _selectStatement = 'SELECT ${columns} FROM ${table}',
        _deleteStatement = 'DELETE FROM ${table}',
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

    ns.Storage.prototype.initialize = function(successCallback, entityStructures) {
        // if no openDatabase function... nothing to do with this app
        if(!window.openDatabase) return;
        // creating the database
        db = openDatabase(_dbName, _dbVersion, _dbDescription, _dbSize);
        // if the database wasn't created, nothing could be done from now on
        if(!db) return;
        // creating the table we'll be working on
        db.transaction(function (tx) {
            for(var i = 0, entityStructure; entityStructure = entityStructures[i]; i++) {
                var creationTableStatement = _createTableStatement
                        .replace(/\${table}/, entityStructure.name)
                        .replace(/\${columns}/, entityStructure.columns.join());
                tx.executeSql(creationTableStatement);
            }
            successCallback();
        });
    };

    ns.Storage.prototype.retrieveItemsFromDataSource = function(successCallback, entityStructure) {
        // if the database wasn't created, nothing could be done from now on
        if(!db) return;
        db.transaction(function (tx) {
            var selectStatement = _selectStatement
                    .replace(/\${table}/, entityStructure.name)
                    .replace(/\${columns}/, entityStructure.columns);
            tx.executeSql(selectStatement, [], function (tx, results) {
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

    ns.Storage.prototype.saveItemsToDataSource = function(todoItemsAsText, entityStructure) {
        // if the database wasn't created, nothing could be done from now on
        if(!db) return;
        // make the insertions in a single transaction
        db.transaction(function(tx) {
            var deleteStatement = _deleteStatement.replace(/\${table}/, entityStructure.name);
            tx.executeSql(deleteStatement, []);
            // iterate over all the items received to insert them
            var columns = entityStructure.columns,
                questionMarks = columns.map(function() { return '?'; }),
                insertStatement = _insertStatement
                    .replace(/\${table}/, entityStructure.name)
                    .replace(/\${columns}/, columns.join())
                    .replace(/\${columnValues}/, questionMarks.join());
            for(var todoItem in todoItemsAsText) {
                tx.executeSql(insertStatement, [todoItemsAsText[todoItem]]);
            }
        });
    };

    ns.Storage.prototype.removeItems = function(entity) {
        // if the database wasn't created, nothing could be done from now on
        if(!db) return;
        // the query to delete the items
        db.transaction(function (tx) {
            var deleteStatement = _deleteStatement.replace(/\${table}/, entity.name);
            tx.executeSql(deleteStatement, []);
        });
    };

});