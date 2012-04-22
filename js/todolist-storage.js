
(function() {

    window.addEventListener('load', function () {
        handleStorage();
        storage.restoreItems();
    });

    function handleStorage() {
        var saveButton = document.getElementById("saveButton");
        var clearButton = document.getElementById("clearButton");
        saveButton.addEventListener('click', storage.synchronizeItems, false);
        clearButton.addEventListener('click', storage.clearItems, false);
    }

    with(com.abaris) {
        Storage.prototype.notificator = new Notificator();
        var storage = new Storage();
    }
})();