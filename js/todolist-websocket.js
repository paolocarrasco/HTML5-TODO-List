(function() {
    var CONNECTED_CLASS_NAME = 'connected';
    var WEBSOCKET_NAMESPACE = 'org.jwebsocket.plugins.system';
    var websocketStatus = document.querySelector('#websocketConnectivity .connectivityStatus');
    var sessionStatus = document.querySelector('#sessionConnectivity .connectivityStatus');
    var messageSpan = document.querySelector('#messageOutput [data-type=message]');
    var userSpan = document.querySelector('#messageOutput [data-type=user]');
    var loginForm = document.forms['loginForm'];
    var usernameInput = document.querySelector('#loginForm input[name=username]');
    var passwordInput = document.querySelector('#loginForm input[name=password]');
    var messageForm = document.forms['messagecenter'];
    var messageInput = document.getElementById('messageTextbox');
    var overlayHelper = document.getElementById('overlayHelper');
    var webSocketConnector;
    var sourceId;

    loginForm.classList.add('hidden');

    window.addEventListener('load', function() {
        var host = 'ws://abaris.com.pe:8787/jWebSocket/jWebSocket';
        webSocketConnector = new com.abaris.WebSocketConnector(host);

        webSocketConnector.onopen = function () {
            websocketStatus.classList.add(CONNECTED_CLASS_NAME);
            sessionStatus.addEventListener('click', function () {
                if(!!sessionStorage.username) {
                    // perform a logout
                    var logoutToken = {
                        ns: WEBSOCKET_NAMESPACE,
                        type: 'logout'
                    };
                    webSocketConnector.send(JSON.stringify(logoutToken));
                }
                else {
                    overlayHelper.classList.add('overlay');
                    loginForm.classList.remove('hidden');
                }
            });
        };

        webSocketConnector.onclose = function () {
            delete sessionStorage.username;
            websocketStatus.classList.remove(CONNECTED_CLASS_NAME);
            sessionStatus.classList.remove(CONNECTED_CLASS_NAME);
        };

        webSocketConnector.onmessage = function(msg) {
            var messageContent = JSON.parse(msg.data);
            if(messageContent.type == 'welcome') {
                sourceId = messageContent.sourceId;
                return;
            }
            if(messageContent.type == 'response') {
                if(messageContent.reqType == 'login'
                        && messageContent.username) {
                    sessionStorage.username = messageContent.username;
                    sessionStatus.classList.add(CONNECTED_CLASS_NAME);
                }
                else if(messageContent.reqType == 'logout') {
                    delete sessionStorage.username;
                    sessionStatus.classList.remove(CONNECTED_CLASS_NAME);
                }
            }
            if(messageContent.type != 'broadcast') return;
            messageSpan.innerText = messageContent.data;
            userSpan.innerText = '(' + messageContent.sender + ')';
        };

        webSocketConnector.initialize();
    });

    window.addEventListener('unload', function() {
        if(sessionStorage.username) {
            // perform a logout
            var logoutToken = {
                ns: WEBSOCKET_NAMESPACE,
                type: 'logout'
            };
            delete sessionStorage.username;
            webSocketConnector.send(JSON.stringify(logoutToken));
        }
        webSocketConnector.quit();
    });

    messageForm.addEventListener('submit', function(e) {
        var message = {
            ns: WEBSOCKET_NAMESPACE,
            type: "broadcast",
            sourceId: sourceId,
            sender: sessionStorage.username || 'anonymous',
            pool: '',
            data: messageInput.value,
            senderIncluded: true,
            responseRequested: true };
        webSocketConnector.send(JSON.stringify(message));
        e.preventDefault();
    });

    loginForm.addEventListener('submit', function(e) {
        var loginToken = {
            ns: WEBSOCKET_NAMESPACE,
            type: "login",
            username: usernameInput.value,
            password: passwordInput.value,
            encoding: null,
            pool: null };
        webSocketConnector.send(JSON.stringify(loginToken));
        e.preventDefault();
        this.reset();
    });

    loginForm.addEventListener('reset', function(e) {
        overlayHelper.classList.remove('overlay');
        loginForm.classList.add('hidden');
    });

})();