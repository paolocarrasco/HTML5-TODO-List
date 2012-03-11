function Notificator () {
    var NOTIFICATION_TIME = 3000;

    var me = this;

    // verify if the user allows the app to notify
    webkitNotifications.requestPermission();
    
    /** Default message type */
    me.defaultMessageType = Notificator.INFO;

    /**
    * Notifies the user about something
    */
    me.notify = function(messageType, title, description) {
        // if the message type was not specified
        if(arguments.length == 2 
                || typeof messageType == 'undefined' 
                || messageType.length == 0) {
            messageType = me.defaultMessageType;
        }

        if(me.hasPermissionToNotify()) {
            var notification = webkitNotifications
                .createNotification(me.messageTypes[messageType], title, description);
            notification.show();
            // after a few seconds, hide it
            setTimeout(function() { notification.cancel(); }, NOTIFICATION_TIME);
        }
    }

    /**
    * Verifies if the user allows the app to notify
    */
    me.hasPermissionToNotify = function() {
        return webkitNotifications.checkPermission() == '0';
    };
    
    me.messageTypes = {
        success : 'img/success.png',
        info : 'img/information.gif',
        error : 'img/error.gif'
    };
}

Notificator.SUCCESS = 'success';
Notificator.INFO = 'info';
Notificator.ERROR = 'error';