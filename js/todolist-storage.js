
(function() {
    // the list that contains the items 
    var defaultText,
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
        var storage = new Storage();
    }
})();
