(function() {
    var SYNC_FREQUENCY = 3000;
    var titleElement = document.getElementById('todoListTitle');
    
    window.addEventListener('load', function() {
        var defaultText = titleElement.innerText;
        if(!localStorage) return;

        // if the title was stored...
        if(localStorage.todoTitle) {
            // retrieve the title (unescaped)
            var titleText = localStorage.todoTitle;
            titleElement.innerText = unescape(titleText);
        }

        // periodically sync the title with the stored value
        setTimeout(function() {
            // if the title was changed, sync it
            if(titleElement.innerText.trim().length > 0) {
                var titleText = titleElement.innerText;
                // is there a change?
                if(titleText != localStorage.todoTitle) {
                    localStorage.todoTitle = escape(titleText);
                }
            }
            // if the title was changed, use the default text
            else {
                titleElement.innerText = defaultText;
                delete localStorage.todoTitle;
            }
            // after a while, execute again the check
            setTimeout(arguments.callee, SYNC_FREQUENCY);
        }, SYNC_FREQUENCY);
    });
})();