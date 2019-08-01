(function () {
  const applicationServerPublicKey = 'BFtxnExZ9xHwI4yNwPgpLAlXwIkZpdV1mqHde-WHd2ML8aWKvHEzYexXbVUCsirMxIvbRvVEQM68l_o37wnKEB8';
  //If serviceWorker supports, then register it.
  if ("serviceWorker" in navigator  && 'PushManager' in window) {
    console.log('Service Worker and Push is supported');
    navigator.serviceWorker.register('./sw.js', { scope: "./" }) //setting scope of sw
    .then(function(registration) {
      console.info('Service worker is registered!');
      checkForPageUpdate(registration); // To check if new content is updated or not
    })
    .catch(function(error) {
      console.error('Service worker failed ', error);
    });
  }

  // To content update on service worker state change
  function checkForPageUpdate(registration) {
    // onupdatefound will fire on first time install and when serviceWorker.js file changes      
    registration.addEventListener("updatefound", function() {
      // To check if service worker is already installed and controlling the page or not
      if (navigator.serviceWorker.controller) {
        var installingSW = registration.installing;
        installingSW.onstatechange = function() {
          console.log("Service Worker State :", installingSW.state);
          switch(installingSW.state) {
            case 'installed':
              // Now new contents will be added to cache and old contents will be remove so
              // this is perfect time to show user that page content is updated.
              //toast('Site is updated. Refresh the page.', 5000);
              console.log('Site is updated. Refresh the page.', 5000);
              break;
            case 'redundant':
              throw new Error('The installing service worker became redundant.');
          }
        }
      }
    });
  }
})();
