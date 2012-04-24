/******************
* Para estos ejemplos pueden jugar con los selectores CSS que se tienen en el archivo styles.css
******************/

document.getElementsByClassName('highlight')
// trae los elementos de la página que tengan la clase CSS 'highlight' (devuelve un array)
document.querySelector('ul.odd li:nth-child(odd)')
// trae el primer elemento de la página que coincida con el selector CSS. Emplea selectores de CSS3
document.querySelectorAll('ul.every3 li:nth-child(3n)')
// trae los elementos de la página que coincidan con el selector CSS (devuelve un array)
var highlightedClassList = document.getElementsByClassName('highlight')[0].classList
// trae el listado de clases CSS del elemento y lo asigna a la variable
highlightedClassList.add('otraClase')
// agrega la clase CSS "otraClase"
highlightedClassList.remove('otraClase')
// remueve la clase CSS "otraClase"
highlightedClassList.toggle('highlighted')
// si se tenía esta clase, la remueve, sino la agrega. Devuelve un booleano (true si luego de la operación se ha agregado la clase al elemento)
for(var i = 0; i < highlightedClassList.length; i++) {  console.log('Clase ' + highlightedClassList[i]); }
// lista las clases CSS del listado
highlightedClassList.contains('highlight')
// devuelve true si el listado contiene la clase

/******************
* (Para las notificaciones tienen que tener la aplicación en un servidor HTTP) Los siguientes ejemplos aplican para un browser webkit
******************/

webkitNotifications.requestPermission() 
// solicita permiso al usuario. Si fue ejecutado antes, no vuelve a mostrar la solicitud
webkitNotifications.checkPermission()
// verifica si la aplicación tiene permiso para mostrar la notificación, útil para evitar tener errores al invocar la notificación
var notifAvantica = webkitNotifications.createNotification('', 'Titulo notificacion', 'Descripcion de la notificacion')
// crea la notificación y la asigna a una variable. Si no se tiene permisos, arroja una excepción. Para evitar esto, mejor verificar el permiso antes
notifAvantica.show()
// muestra la notificación
notifAvantica.cancel()
// desaparece la notificación, no se va automáticamente 
setTimeout(function() { notifAvantica.cancel(); }, 3000);
// (trabajarlo con un setTimeout es lo ideal)

/******************
* (Para geolocation, el dispositivo/computadora debe estar en línea
******************/

navigator.geolocation.getCurrentPosition(function(pos) { console.log(pos); }, function(err) { console.log(err); }, opciones);
// obtiene la localización del usuario. Si es la primera vez, pedirá permiso al usuario. El primer parámetro es en el caso de éxito, el segundo es cuando se tenga un error, y el tercer parámetro es un objeto de opciones. Acepta uno, dos o tres parámetros.
var idTracking = navigator.geolocation.watchPosition(function(pos) { console.log(pos); }, function(err) { console.log(err); });
// hace un seguimiento de la posición del usuario. Devuelve el identificador de este tracking
navigator.geolocation.clearWatch(idTracking)
// deja de hacer seguimiento de la posición del tracking especificado


/******************
* Jugar con la aplicación conectada y desconectada. Se tiene que tener la aplicación en un servidor HTTP
******************/
applicationCache.status
// devuelve un número que representa el estado del cache (ver las constantes que se tienen)
applicationCache.update()
// actualiza el application cache
applicationCache.swapCache()
// trae el nuevo contenido del application cache (para ver el nuevo contenido se tiene que refrescar la página... se puede refrescar usando location.reload())
navigator.onLine
// indica si la aplicación está en línea (booleano)

/******************
* Con el history pueden hacer cosas interesantes como para hacer que su aplicación sea un single page app
******************/
history.pushState('nombreEstado')
// agrega un estado no bookmarkable en la aplicación
history.pushState('nombreEstado', '', 'nombreUrl')
// agrega un estado bookmarkable en la aplicación 
history.state 
// devuelve el estado en que se encuentra la aplicación
window.onpopstate = function(event) { /* hacer algo cuando avance/retroceda en el historial creado por nosotros */ };
// maneja lo que se hace cuando se avanza/retrocede entre los estados que creados nosotros
history.replaceState('nombreEstado', 'cambio', 'url')
// reemplaza el estado actual del historial