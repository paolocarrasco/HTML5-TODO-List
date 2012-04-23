(function() {
    var userLocationMap = document.getElementById('userLocationMap');
    var userLocationAvailability = document.querySelector('#userLocation .connectivityStatus');
    
    window.addEventListener('load', function() {
        var geoloc = navigator.geolocation;
        // there is nothing to do with geolocation
        if(!geoloc) return;
        geoloc.getCurrentPosition(function(pos) { 
            var latitude = pos.coords.latitude;
            var longitude = pos.coords.longitude;
            console.log('User position [Lat:' + latitude + ',Long:' + longitude);
            userLocationAvailability.classList.add('connected');
            generateMap(latitude, longitude);
        }, 
        function(error) {
            console.warn('Error when requesting the current position: ' + error.message + ' (' + error.code + ')');
        });
    });

    function generateMap(latitude, longitude) {
        var mapUrl = 'http://maps.google.com/?ie=UTF8&amp;ll=' + latitude + ',' + longitude;
        var locationMapFrameContent = '<iframe frameborder="0" src="' + mapUrl + '&amp;output=embed">\
            </iframe>\
            <br />\
            <a href="' + mapUrl + '&amp;source=embed" target="_blank">View Larger Map</a>';
        userLocationMap.innerHTML = locationMapFrameContent;
    }
})();