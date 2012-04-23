(function() {
    var websocketStatus = document.querySelector('#websocketConnectivity .connectivityStatus');
    var webSocketConnector;

    window.addEventListener('load', function() {
        var host = 'ws://abaris.com.pe:8787/jWebSocket/jWebSocket';
        webSocketConnector = new com.abaris.WebSocketConnector(host);

        webSocketConnector.onopen = function () {
            websocketStatus.classList.add('connected');
        }
        webSocketConnector.onclose = function () {
            websocketStatus.classList.remove('connected');
        }

        webSocketConnector.initialize();
    });

    window.addEventListener('unload', function() {
        webSocketConnector.quit();
    });

})();