(function() {
    var websocketStatus = document.querySelector('#websocketConnectivity .connectivityStatus');
    var webSocketConnector;

    window.addEventListener('load', function() {
        var host = 'ws://abaris.com.pe:8787/jWebSocket/jWebSocket';
        webSocketConnector = new com.abaris.WebSocketConnector(host);

        webSocketConnector.onopen = toggleConnectionClass;
        webSocketConnector.onclose = toggleConnectionClass;

        webSocketConnector.initialize();
    });

    window.addEventListener('unload', function() {
        webSocketConnector.quit();
    });

    function toggleConnectionClass() {
        websocketStatus.classList.toggle('connected');
    }
})();