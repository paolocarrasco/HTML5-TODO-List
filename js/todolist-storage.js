(function() {
    var _dbName = 'tododb',
        // in order to make upgrades from now on
        _dbVersion = '',
        // description of the database
        _dbDescription = 'TODO List Database',
        // creating the database with a size of 2 * 1024 * 1024 bytes
        _dbSize = 2097152,
        // default text of the item if no items were retrieved
        defaultText,
        // the list that contains the items 
        todoList = document.getElementById("todoList");

    window.addEventListener('load', function () {
        handleStorage();
        defaultText = todoList.querySelector('li').innerText;
        storage.initialize(function () {
        
            // retrieve the items from the storage
            storage.restoreItems(function(itemsLoaded) {
                // don't do anything if nothing is loaded
                if(!itemsLoaded || !itemsLoaded.length) return;
                var itemsList = [];
                // iterate and render the items as HTML list items
                for(var item in itemsLoaded) {
                    itemsList.push("<li>" + itemsLoaded[item] + "</li>");
                }
                todoList.innerHTML = itemsList.join('');
            });

        });
    });

    function handleStorage() {
        var saveButton = document.getElementById("saveButton");
        var clearButton = document.getElementById("clearButton");
        saveButton.addEventListener('click', synchronize, false);
        clearButton.addEventListener('click', clear, false);
    }

    function synchronize() {
        var todoItemsAsText = [];
        var todoItems = todoList.getElementsByTagName("li");
        var itemsLength = todoItems.length;
        for(var i = 0; i < itemsLength; i++) {
            var todoItem = todoItems[i];
            todoItemsAsText.push(todoItem.innerText || todoItem.textContent);
        }
        storage.synchronizeItems(todoItemsAsText);
    }

    function clear() {
        storage.clearItems();
        todoList.innerHTML = ['<li>', defaultText, '</li'].join('');
    }

    with(com.abaris) {
        Storage.prototype.notificator = new Notificator();
        var storage = Storage.constructor.call(this, _dbName, 
                _dbVersion, _dbDescription, _dbSize);
    }

})();
