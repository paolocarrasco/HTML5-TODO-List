namespace('com.abaris', function(ns) {

    /**
    * Base for storage of items
    */
    ns.Storage = function () {
        var me = this;

        /**
        * Restore the items previously saved from the data source.
        */
        me.restoreItems = function(successCallback) {
            // retrieve the items from the storage
            me.retrieveItemsFromDataSource(function(itemsLoaded) {
                successCallback(itemsLoaded);
                me.notificator.notify('success', 'Successful loading', 'TODO items were restored');
            });
        };

        /**
        * Synchronize the current items with the data source.
        */
        me.synchronizeItems = function(todoItemsAsText) {
            me.saveItemsToDataSource(todoItemsAsText);
            me.notificator.notify('success', 'Synchronization results', 'TODO items were synchronized');
        };

        /**
        * Remove all the saved items in the data source.
        */
        me.clearItems = function () {
            me.removeItems();
            me.notificator.notify('success', 'Synchronization results', 'TODO items were cleared');
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
});