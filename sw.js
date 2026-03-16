// ═══════════════════════════════════════════════════════════════
// ExtintoresPRO - Service Worker v1.0
// ═══════════════════════════════════════════════════════════════

const CACHE_VERSION = 'extintorespro-v1.0';
const CACHE_NAME = `extintorespro-cache-${CACHE_VERSION}`;

// Archivos a cachear (recursos estáticos)
const STATIC_CACHE_URLS = [
  './',
  './index.html',
  './scanner.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// URLs que NO deben cachearse (siempre online)
const NEVER_CACHE = [
  'https://script.google.com',
  'https://docs.google.com',
  'https://drive.google.com',
  'chrome-extension://'
];

// ═══════════════════════════════════════════════════════════════
// INSTALACIÓN
// ═══════════════════════════════════════════════════════════════

self.addEventListener('install', (event) => {
  console.log('[SW] Instalando Service Worker v' + CACHE_VERSION);
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Cacheando archivos estáticos');
        return cache.addAll(STATIC_CACHE_URLS);
      })
      .then(() => {
        console.log('[SW] Instalación completa');
        // Activar inmediatamente sin esperar
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[SW] Error en instalación:', error);
      })
  );
});

// ═══════════════════════════════════════════════════════════════
// ACTIVACIÓN
// ═══════════════════════════════════════════════════════════════

self.addEventListener('activate', (event) => {
  console.log('[SW] Activando Service Worker v' + CACHE_VERSION);
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        // Eliminar cachés antiguos
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('[SW] Eliminando caché antiguo:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('[SW] Activación completa');
        // Tomar control inmediatamente de todas las páginas
        return self.clients.claim();
      })
      .catch((error) => {
        console.error('[SW] Error en activación:', error);
      })
  );
});

// ═══════════════════════════════════════════════════════════════
// FETCH - ESTRATEGIA DE CACHE
// ═══════════════════════════════════════════════════════════════

self.addEventListener('fetch', (event) => {
  const url = event.request.url;
  
  // Nunca cachear estas URLs (siempre ir a la red)
  const shouldNeverCache = NEVER_CACHE.some(domain => url.includes(domain));
  
  if (shouldNeverCache) {
    // Network only para Google APIs
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          // Si falla, retornar respuesta de error
          return new Response(
            JSON.stringify({ 
              error: 'Sin conexión a internet',
              offline: true 
            }),
            { 
              headers: { 'Content-Type': 'application/json' },
              status: 503
            }
          );
        })
    );
    return;
  }
  
  // Para archivos estáticos: Network First con Cache Fallback
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Si la respuesta es válida, actualizar caché
        if (response && response.status === 200) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseClone);
            });
        }
        return response;
      })
      .catch(() => {
        // Si falla la red, usar caché
        return caches.match(event.request)
          .then((cachedResponse) => {
            if (cachedResponse) {
              console.log('[SW] Sirviendo desde caché:', url);
              return cachedResponse;
            }
            
            // Si no está en caché, retornar página offline
            if (event.request.mode === 'navigate') {
              return caches.match('./index.html');
            }
            
            return new Response('Sin conexión', {
              status: 503,
              statusText: 'Service Unavailable'
            });
          });
      })
  );
});

// ═══════════════════════════════════════════════════════════════
// ACTUALIZACIONES AUTOMÁTICAS
// ═══════════════════════════════════════════════════════════════

// Verificar actualizaciones cada 1 hora
const UPDATE_CHECK_INTERVAL = 60 * 60 * 1000; // 1 hora

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    console.log('[SW] Forzando actualización inmediata');
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CHECK_UPDATE') {
    console.log('[SW] Verificando actualizaciones manualmente');
    checkForUpdates();
  }
});

// Verificar actualizaciones periódicamente
function checkForUpdates() {
  console.log('[SW] Buscando actualizaciones...');
  
  // Forzar actualización del SW
  self.registration.update()
    .then(() => {
      console.log('[SW] Verificación de actualización completa');
    })
    .catch((error) => {
      console.error('[SW] Error al verificar actualizaciones:', error);
    });
}

// Programar verificaciones periódicas
setInterval(() => {
  checkForUpdates();
}, UPDATE_CHECK_INTERVAL);

// ═══════════════════════════════════════════════════════════════
// NOTIFICACIONES AL CLIENTE
// ═══════════════════════════════════════════════════════════════

self.addEventListener('controllerchange', () => {
  console.log('[SW] Nueva versión activada');
  
  // Notificar a todos los clientes que hay una actualización
  self.clients.matchAll().then((clients) => {
    clients.forEach((client) => {
      client.postMessage({
        type: 'SW_UPDATED',
        message: 'Nueva versión disponible. Recarga la página para actualizar.'
      });
    });
  });
});

console.log('[SW] Service Worker cargado - Versión:', CACHE_VERSION);
