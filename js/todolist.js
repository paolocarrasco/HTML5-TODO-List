(function() {
    var webSocketConnector;

    function handleStorage() {
        var saveButton = document.getElementById("saveButton");
        var clearButton = document.getElementById("clearButton");
        saveButton.addEventListener('click', storage.synchronizeItems, false);
        clearButton.addEventListener('click', storage.clearItems, false);
    }

    function initWebSocket() {
        var host = 'ws://abaris.com.pe:8787/jWebSocket/jWebSocket';
        webSocketConnector = new WebSocketConnector(host);
    }

    onload = function() {
        handleStorage();
        storage.restoreItems();
        initWebSocket();
    };
    
    onunload = function() {
        webSocketConnector.quit();
    }

})();

Storage.prototype.notificator = new Notificator();
