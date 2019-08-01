//Caché de polyfil para soportar cacheAPI en todos los navegadores
importScripts('./cache-polyfill.js');

var cacheName = 'cache-v0.03';
//Archivos para guardar en caché
var files = [
  './',
  './index.html?utm=homescreen', //[SW trata la cadena de consulta como nueva solicitud] SW treats query string as new request
  './css/animate.css',
  './css/sistema.css',
  './css/style.css',
  './css/toastr.min.css',
  './img/ypfb.jpg',
  './img/baner.png',
  './img/boleta.jpg',
  './img/tile150.png',
  './img/baner.png',
  './img/favicon.ico',
  './img/gas.png',
  './img/logo.svg',
  './img/logo-symbol.svg',
  './img/user.png',
  './node_modules/jquery/dist/jquery.min.js',
  './node_modules/popper.js/dist/umd/popper.min.js',
  './node_modules/bootstrap/dist/js/bootstrap.min.js',
  './node_modules/moment/moment.js',
  'node_modules/moment/locale/es.js',
  '/node_modules/bootstrap4-datetimepicker/build/js/bootstrap-datetimepicker.min.js',
  'js/app.js',
  'js/main.js',
  'js/sammy.min.js',
  'js/toastr.min.js',
  'js/router.js',
  'https://cdnjs.cloudflare.com/ajax/libs/axios/0.15.3/axios.min.js',
  './node_modules/socket.io-client/dist/socket.io.js',
  'https://api.mapbox.com/mapbox-gl-js/v0.51.0/mapbox-gl.js',
  'js/push.min.js',
  'js/js.js',
  'manifest.json'
];

/*
  './https://api.mapbox.com/mapbox-gl-js/v0.51.0/mapbox-gl.js',
  './https://api.mapbox.com/mapbox-gl-js/v0.51.0/mapbox-gl.css',
  './https://api.tiles.mapbox.com/mapbox-gl-js/v0.39.1/mapbox-gl.css',
  './https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v3.1.3/mapbox-gl-directions.js',
  './https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v3.1.3/mapbox-gl-directions.css',
*/

//Añadiendo el detector de eventos `install`
self.addEventListener('install', (event) => {
  console.info('Evento: Instalado');

  event.waitUntil(
    caches.open(cacheName)
    .then((cache) => {
      //[] e archivos a caché y si alguno del archivo no presente `addAll` fallará
      return cache.addAll(files)
      .then(() => {
        //console.info('Todos los archivos están en caché');
        return self.skipWaiting(); //(Para obligar al trabajador de servicio en espera a convertirse en el trabajador de servicio activo) To forces the waiting service worker to become the active service worker
      })
      .catch((error) =>  {
        console.log('Error: Fallo el cache', error);
      })
    })
  );
});

/*
  FETCH EVENT: triggered for every request made by index page, after install.
  FETCH EVENT: se activa para cada solicitud realizada por la página de índice, después de la instalación.
*/

//Adding `fetch` event listener
//Añadiendo el detector de eventos `fetch`
self.addEventListener('fetch', (event) => {
  //console.info('Evento: Recuperado');

  var request = event.request;

  //Tell the browser to wait for newtwork request and respond with below
  //Dígale al navegador que espere la solicitud de nuevo trabajo y responda con lo siguiente
  event.respondWith(
    //If request is already in cache, return it
    //Si la solicitud ya está en caché, devuélvala.
    caches.match(request).then((response) => {
      if (response) {
        return response;
      }

      // // Checking for navigation preload response
      // // Comprobando la respuesta de precarga de navegación
      // if (event.preloadResponse) {
      //   console.info('Using navigation preload');
      //   return response;
      // }
      
      //if request is not cached or navigation preload response, add it to cache
      //Si la solicitud no está almacenada en la caché o la respuesta de precarga de navegación, agréguela a la caché
      return fetch(request).then((response) => {
        var responseToCache = response.clone();
        caches.open(cacheName).then((cache) => {
            cache.put(request, responseToCache).catch((err) => {
              //console.warn(request.url + ': ' + err.message);
              console.log(err.message);
            });
          });

        return response;
      });
    })
  );
});

/*
  ACTIVATE EVENT: triggered once after registering, also used to clean up caches.
  ACTIVAR EVENTO: se activa una vez después de registrarse, también se utiliza para limpiar cachés.
*/

//Adding `activate` event listener
//Añadiendo el detector de eventos `enable`
self.addEventListener('activate', (event) => {
  ////console.info('Evento: Activo');

  //Navigation preload is help us make parallel request while service worker is booting up.
  //La precarga de navegación nos ayuda a realizar una solicitud paralela mientras el trabajador de servicio se está iniciando.
  //Enable - chrome://flags/#enable-service-worker-navigation-preload
  //Support - Chrome 57 beta (behing the flag)
  //More info - https://developers.google.com/web/updates/2017/02/navigation-preload#the-problem

  // Check if navigationPreload is supported or not
  // if (self.registration.navigationPreload) { 
  //   self.registration.navigationPreload.enable();
  // }
  // else if (!self.registration.navigationPreload) { 
  //   console.info('Your browser does not support navigation preload.');
  // }

  //Remove old and unwanted caches
  //Eliminar cachés antiguos y no deseados
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== cacheName) {
            return caches.delete(cache); //[Eliminar el caché antiguo (caché v1)] Deleting the old cache (cache v1)
          }
        })
      );
    })
    .then(function () {
      //console.info("Old caches are cleared!");
      // To tell the service worker to activate current one 
      // instead of waiting for the old one to finish.
      // Para decirle al trabajador de servicio que active el actual.
      // En lugar de esperar a que termine el viejo.
      return self.clients.claim(); 
    }) 
  );
});

/*
  PUSH EVENT: triggered everytime, when a push notification is received.
  PUSH EVENT: se activa cada vez que se recibe una notificación de inserción.
*/

//Adding `push` event listener
//Añadiendo el detector de eventos `push`
self.addEventListener('push', (event) => {
  //console.info('Evento: Empuje (Push)');

  var title = 'YPFB';
  var body = {
    body: 'Las estaciones de servisio estan con ',
    tag: 'vibration-sample',
    icon: '/img/gas.png',
    badge: '/img/gas.png',
    url : '',
    //Custom actions buttons
    //Botones de acciones personalizadas
    vibrate: [500,110,500,110,450,110,200,110,170,40,450,110,200,110,170,40,500],
    actions: [
      { 'action': 'yes', 'title': 'I ♥ this app!'},
      { 'action': 'no', 'title': 'I don\'t like this app'}
    ]
  };
  //self.registration.showNotification(title, body);
  event.waitUntil(self.registration.showNotification(title, body));
});

/*
  BACKGROUND SYNC EVENT: triggers after `bg sync` registration and page has network connection.
  It will try and fetch github username, if its fulfills then sync is complete. If it fails,
  another sync is scheduled to retry (will will also waits for network connection)
  
  EVENTO DE SINCRONIZACIÓN DE FONDO: se activa después del registro `bg sync` y la página tiene conexión de red.
  Intentará obtener el nombre de usuario de Github, si se cumple, la sincronización está completa. Si falla,
  otra sincronización está programada para volver a intentarlo (también esperará la conexión de red)
*/

self.addEventListener('sync', (event) => {
  ///console.info('Evento: Sincronizar (Sync)');

  //Check registered sync name or emulated sync from devTools
  //Compruebe el nombre de sincronización registrado o la sincronización emulada desde devTools
  if (event.tag === 'github' || event.tag === 'test-tag-from-devtools') {
    event.waitUntil(
      //To check all opened tabs and send postMessage to those tabs
      //Para revisar todas las pestañas abiertas y enviar mensajes de correo a esas pestañas
      self.clients.matchAll().then((all) => {
        return all.map((client) => {
          return client.postMessage('online'); //[Para realizar una solicitud de recuperación, verifique app.js - línea no: 122] **To make fetch request, check app.js - line no: 122
        })
      })
      .catch((error) => {
        console.log("Error", error);
      })
    );
  }
});

/*
  NOTIFICATION EVENT: triggered when user click the notification.
  EVENTO DE NOTIFICACIÓN: se activa cuando el usuario hace clic en la notificación.
*/

//Adding `notification` click event listener
//Añadiendo `notification` click listener evento
self.addEventListener('notificationclick', (event) => {
  var url = 'https://demopwa.in/';

  //Listen to custom action buttons in push notification
  //Escuchar botones de acción personalizados en notificación push
  /*if (event.action === 'yes') {
    console.log('I ♥ this app!');
  }
  else if (event.action === 'no') {
    console.warn('app No me gusta esta aplicación');
  }*/

  event.notification.close(); //[Cerrar la notificación] Close the notification

  //To open the app after clicking notification
  //Para abrir la aplicación después de hacer clic en la notificación
  event.waitUntil(
    clients.matchAll({
      type: 'window'
    })
    .then((clients) => {
      for (var i = 0; i < clients.length; i++) {
        var client = clients[i];
        //If site is opened, focus to the site
        //Si el sitio está abierto, enfóquese en el sitio
        if (client.url === url && 'focus' in client) {
          return client.focus();
        }
      }

      //If site is cannot be opened, open in new window
      //Si el sitio no se puede abrir, abre en ventana nueva
      if (clients.openWindow) {
        return clients.openWindow('/');
      }
    })
    .catch((error) => {
      console.log("Error..",error);
    })
  );
});
