(function() {
    var applicationStatus = document.querySelector('#internetConnectivity .connectivityStatus');
    
    window.addEventListener('load', function() {
        if(navigator.onLine) 
            applicationStatus.classList.toggle('connected');
    });

    window.addEventListener('online', toggleConnectionClass);
    window.addEventListener('offline', toggleConnectionClass);

    function toggleConnectionClass() {
        applicationStatus.classList.toggle('connected');
    }

})();