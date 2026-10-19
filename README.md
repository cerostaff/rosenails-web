# Rosé Nails — landing

Landing page de Rosé Nails (https://rosenails.co). Sitio estático, sin paso de build.

## Estructura

- `index.html` — la página, tal como se diseñó en Claude Design (componente `<x-dc>` + lógica React).
- `support.js` — runtime de Claude Design que interpreta `index.html` (generado, no editar). Carga React 18 y Babel desde unpkg.
- `rose-data.js` — datos compartidos (sedes, horarios, servicios, WhatsApp) y helpers de reserva y animación (GSAP).
- `assets/` — imágenes (logo, iconos, fotos de sedes y servicios), optimizadas para web.
- `robots.txt`, `sitemap.xml` — SEO.

## Pendientes antes de publicar

- Números de WhatsApp de cada sede: hoy son placeholders (`5730000000xx` en `rose-data.js`).
- Reseñas de ejemplo (en `index.html`, arreglo `REV`) y el promedio 4.6, que ya no se muestra en móvil.
- La página no muestra tiempos ni precios de los servicios (los datos siguen en `rose-data.js`, pero no se pintan).
- Texto legal de cookies y tratamiento de datos.

## Desarrollo local

```
python -m http.server 8000
```

y abrir http://localhost:8000. Necesita conexión a internet (React, Babel, GSAP, Leaflet y tiles del mapa se cargan por CDN).
