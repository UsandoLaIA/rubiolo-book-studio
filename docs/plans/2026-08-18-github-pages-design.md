# Diseño: publicación de la demo en GitHub Pages

Fecha: 18 de agosto de 2026

## Objetivo

Publicar Rubiolo Book Studio como una demo pública alojada únicamente en GitHub Pages, accesible desde `https://usandolaia.github.io/rubiolo-book-studio/`, sin depender de Coolify ni de un servidor Node.js.

## Decisión

Convertir la aplicación Next.js a exportación estática y publicar el directorio generado mediante GitHub Actions. La demo conservará toda su interacción en el navegador, pero dejará de exponer funcionalidades propias de un servidor.

Se descartan estas alternativas:

- Mantener simultáneamente Pages y Docker: agrega dos modos de despliegue que no son necesarios para la etapa conceptual.
- Usar otro proveedor gratuito: no cumple el objetivo de concentrar código y visualización en GitHub.

## Arquitectura

- Next.js App Router con `output: "export"`.
- Sitio servido bajo el prefijo `/rubiolo-book-studio`.
- Metadatos estáticos con URL pública conocida.
- Recursos de `public/` referenciados mediante un prefijo centralizado para funcionar tanto en desarrollo local como en GitHub Pages.
- GitHub Actions compila, sube el artefacto `out/` y lo despliega en Pages al actualizar `main`.
- El workflow de CI sigue validando lint, pruebas y build en pull requests.

## Cambios de alcance

- Se elimina el endpoint `/api/health`, porque Pages no ejecuta un proceso servidor.
- Se retiran Dockerfile y configuración específica de Coolify.
- El flujo visual, las simulaciones, los textos editables y las imágenes se mantienen.
- La aplicación continúa siendo una demo: no incorpora autenticación, persistencia, generación real, billetera ni PDF real.

## Manejo de errores

- El workflow debe fallar si lint, pruebas o build fallan.
- Los tests deben verificar que no queden rutas de activos incompatibles con el subdirectorio.
- La exportación debe producir `out/index.html`, bundles estáticos e imágenes de productos.

## Validación

1. `npm run check` finaliza con código 0.
2. `out/index.html` existe.
3. Los recursos principales existen dentro de `out/`.
4. El HTML y los bundles utilizan `/rubiolo-book-studio` cuando corresponde.
5. El workflow de Pages completa build y deploy.
6. La URL pública abre la portada y permite recorrer la demo.

## Operación futura

Cuando el producto necesite backend real, se volverá a un hosting con runtime y se definirán contratos para autenticación, datos, almacenamiento, generación y créditos. Esa evolución queda fuera de esta publicación conceptual.
