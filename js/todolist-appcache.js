(function() {
    var RELOAD_PROMPT_MSG = 'There is a new version of this site.\
        \nDo you want to reload the page to see it?';
    var NEW_VERSION_MSG = 'A new version of the cache is ready';

    applicationCache.addEventListener('updateready', function() {
        console.log(NEW_VERSION_MSG);
        applicationCache.swapCache();
        var isToReload = confirm(RELOAD_PROMPT_MSG);
        if(isToReload) location.reload();
    });

    applicationCache.update();

})();
