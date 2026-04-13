# Óptica del Rey

Sitio estático en HTML, CSS y JavaScript con panel de administración simple.

## Archivos clave

- index.html: sitio público
- admin.html: panel admin
- site-data.json: datos publicables del sitio
- data.js: carga el JSON publicado y aplica cambios locales

## Admin

- Contraseña inicial: Optica_del_Rey
- El admin guarda cambios en este navegador.
- Para publicar cambios, exportá site-data.json desde el panel y reemplazá ese archivo en el hosting.

## Deploy rápido con Netlify

- Instalación: npm install
- Borrador: npm run deploy:draft
- Producción: npm run deploy:prod

Flujo corto:

1. Abrí admin.html.
2. Editá y guardá.
3. Exportá site-data.json y reemplazalo en la carpeta del proyecto.
4. Ejecutá npm run deploy:prod.

## Publicación estática

Este proyecto está listo para subir tal cual a Netlify, Vercel, GitHub Pages o cualquier hosting estático.

Subí estos archivos y carpetas:

- index.html
- admin.html
- styles.css
- script.js
- admin.css
- admin.js
- data.js
- site-data.json
- assets/

## Flujo recomendado

1. Abrí admin.html.
2. Editá contenido y guardá.
3. Exportá site-data.json.
4. Subí el proyecto al hosting y reemplazá site-data.json cuando hagas cambios.