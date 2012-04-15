function WebSocketConnector(url) {
    // it contains the web socket connection
    var socket;
    var me = this;
    
    // initializing the websocket
    initialize();

    me.send = function(msg){
        if (!msg) {
            console.warn("Message to be sent can not be empty");
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
        console.log("The fun is over...");
        socket.close();
        socket = null;
    }

    function initialize() {
        try {
            socket = new WebSocket(url);
            console.log('WebSocket - status ' + socket.readyState);
            // Executed when the connection was established
            socket.onopen = function(msg){ console.log("Welcome - status " + this.readyState + '\n' + msg); };
            // Executed when the connection is closed
            socket.onclose   = function(msg){ console.log("Disconnected - status " + this.readyState + '\n' + msg); };
            // Executed when the server sends a message to the client
            socket.onmessage = receiveMessage;
        }
        catch(ex) {
            console.error('Problems when initializing the websocket. Details:\n' + ex); 
        }
    }
    
    function receiveMessage(){
        console.log("Message received: " + msg.data);
    };
}