namespace('com.abaris', function(ns) {
    ns.WebSocketConnector = function (url) {
        // it contains the web socket connection
        var socket;
        var me = this;
        
        // initializing the websocket
        initialize();

        me.send = function(msg){
            if (!msg) {
                console.warn('Message to be sent can not be empty');
                return;
            }
            try{ 
                socket.send(msg);
                console.log('Sent: ' + msg); 
            }
            catch(ex){ 
                console.error('Error when sending the message. Details:\n' + ex);
            }
        }

        me.quit = function() {
            console.log('The fun is over...');
            socket.close();
            socket = null;
        }

        function initialize() {
            try {
                socket = new WebSocket(url);
                // Executed when the connection was established
                socket.onopen = function(e){
                    console.log('Status : Open ' + '\n' + e)
                };
                // Executed when the connection is closed
                socket.onclose = function(e){
                    console.log('Disconnected - status code: ' + this.readyState + '\n' + e);
                };
                // Executed when the server sends a message to the client
                socket.onmessage = receiveMessage;
            }
            catch(ex) {
                console.error('Problems when initializing the websocket. Details:\n' + ex);
            }
        }

        function receiveMessage(msg){
            console.log("Message received: " + msg.data);
        };
    }
});