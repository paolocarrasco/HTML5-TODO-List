(function() {
    var webSocketConnector;

    window.addEventListener('load', function() {
        var host = 'ws://abaris.com.pe:8787/jWebSocket/jWebSocket';
        webSocketConnector = new com.abaris.WebSocketConnector(host);
    });

    window.addEventListener('unload', function() {
        webSocketConnector.quit();
    });

})();