(function() {
    function handleStorage() {
        var saveButton = document.getElementById("saveButton");
        var clearButton = document.getElementById("clearButton");
        saveButton.addEventListener('click', storage.synchronizeItems, false);
        clearButton.addEventListener('click', storage.clearItems, false);
    }

    onload = function() {
        handleStorage();
        storage.restoreItems();
    };
})();

Storage.prototype.notificator = new Notificator();