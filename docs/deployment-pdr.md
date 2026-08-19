# PDR — GitHub Pages

## Objetivo

Publicar Rubiolo Book Studio como demo estática pública desde el repositorio `UsandoLaIA/rubiolo-book-studio`, sin servidor ni proveedor de hosting adicional.

## Alcance

- Mantener el flujo conceptual de seis pasos y el editor visual.
- Generar un sitio estático con Next.js.
- Publicarlo automáticamente desde `main` mediante GitHub Actions.
- Servir correctamente la aplicación bajo `/rubiolo-book-studio`.

No incluye autenticación, persistencia, almacenamiento, IA real, pagos ni PDF real.

## Arquitectura mínima

- Next.js App Router con `output: "export"`.
- Interacción ejecutada completamente en el navegador.
- Recursos locales dentro de `public/` con prefijo centralizado.
- GitHub Actions como sistema de verificación y publicación.

## Criterios de aceptación

1. `npm ci` instala el lockfile sin cambios.
2. `npm run check` finaliza con código 0.
3. `out/index.html` y las imágenes principales existen.
4. El build de GitHub usa `/rubiolo-book-studio` para rutas y activos.
5. Los pull requests ejecutan CI y los cambios de `main` ejecutan el deploy.
6. La URL pública permite recorrer el flujo completo.
7. No se versionan secretos, dependencias ni artefactos generados.

## Riesgos

- La publicación es pública para cualquier persona con la URL.
- GitHub Pages no ejecuta backend.
- El estado de la demo vive solamente en memoria.
- Una futura aplicación real necesitará volver a una infraestructura con runtime.
