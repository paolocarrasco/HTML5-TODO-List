namespace('com.abaris', function(ns) {
    /**
    * Class to communicate with a web socket entrypoint
    */
    ns.WebSocketConnector = function (url) {
        // it contains the web socket connection
        var socket;
        var me = this;
        
        /**
        * Send a message to the host
        */
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

        /**
        * It should be invoked when the app is over
        */
        me.quit = function() {
            console.log('The fun is over...');
            socket.close();
            socket = null;
        }

        /**
        * Initializing the websocket
        */
        me.initialize = function() {
            try {
                socket = new WebSocket(url);
                // Executed when the connection was established
                socket.onopen = function(e){
                    console.log('Open - status code: ' + this.readyState);
                    me.onopen(e);
                };
                // Executed when the connection is closed
                socket.onclose = function(e){
                    console.log('Disconnected - status code: ' + this.readyState);
                    me.onclose(e);
                };
                // Executed when the server sends a message to the client
                socket.onmessage = function(msg) {
                    console.log("Message received: " + msg.data);
                    me.onmessage(msg);
                };
            }
            catch(ex) {
                console.error('Problems when initializing the websocket. Details:\n' + ex);
            }
        }

        // these functions should be overriden
        me.onopen = function(e) {};
        me.onclose = function(e) {};
        me.onmessage = function(msg) {};
    }
});