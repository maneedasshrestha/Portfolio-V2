// service-worker.js

importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js');
// service-worker.js

if (workbox) {
    console.log("Workbox is loaded");
  
    // Cache .jpg and .png images in the /assets folder
    workbox.routing.registerRoute(
      ({ request }) => 
        request.destination === 'image' && 
        (request.url.endsWith('.jpg') || request.url.endsWith('.png')),
      new workbox.strategies.CacheFirst({
        cacheName: 'image-cache',
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 50, // Limit to 50 images
            maxAgeSeconds: 60 * 60 * 24 * 30, // Cache for 30 days
          }),
        ],
      })
    );
  
    // Cache .pdf files in the /assets folder
    workbox.routing.registerRoute(
      ({ request }) => request.url.includes('/assets/') && request.url.endsWith('.pdf'),
      new workbox.strategies.CacheFirst({
        cacheName: 'pdf-cache',
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 20, // Limit to 20 PDFs
            maxAgeSeconds: 60 * 60 * 24 * 30, // Cache for 30 days
          }),
        ],
      })
    );
  
    // Optionally, precache other assets
    workbox.precaching.precacheAndRoute([
      '/assets/about-pic.jpg',
      '/assets/profile-pic.jpg',
      '/assets/resume.pdf',
      '/assets/github.png',
      '/assets/linkedin.png',
      '/assets/instagram.png',
      '/index.html',
      '/style.css',
      '/script.js',
    ]);
  } else {
    console.log("Workbox didn't load");
  }
  