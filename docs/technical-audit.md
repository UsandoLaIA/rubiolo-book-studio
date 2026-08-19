# Auditoría técnica — 18 de agosto de 2026

## Dictamen

El repositorio está listo para publicar la **demo conceptual** como webapp Next.js en GitHub y desplegarla en Coolify mediante Docker. No debe presentarse todavía como una aplicación productiva: los renders, créditos, archivos y PDF siguen siendo simulaciones locales de interfaz.

## Decisiones aplicadas

- Se retiró el runtime de Sites, vinext, Wrangler, Workers y D1 porque la interfaz no usaba esas integraciones.
- Se adoptó Next.js standalone sobre Node.js 22 como un único proceso desplegable.
- Se fijó Next.js 16.3.1 y un lockfile reproducible.
- Se agregó un contenedor multi-stage que ejecuta como usuario `nextjs`, escucha en `0.0.0.0:3000` e incluye healthcheck.
- Se agregó CI para lint, pruebas y build, además de un contrato mínimo automatizado del flujo de seis pasos.
- Se agregó documentación operativa y se reforzaron los archivos ignorados para evitar publicar secretos o artefactos locales.

## Evidencia de cierre

| Control | Resultado |
|---|---|
| `npm run check` | Aprobado |
| TypeScript y build Next.js | Aprobado |
| Pruebas automatizadas | 2/2 aprobadas |
| `npm audit` | 0 vulnerabilidades |
| Build Docker desde contexto limpio | Aprobado |
| Usuario del contenedor | `nextjs` (no root) |
| Healthcheck Docker | `healthy` |
| Home, `/api/health` e imágenes | HTTP 200 |
| Escaneo local de secretos comunes | Sin coincidencias |

El lint conserva advertencias no bloqueantes por el uso deliberado de `<img>` en el prototipo. Migrarlas a `next/image` es una mejora de rendimiento posterior, no un impedimento para esta demo.

## Riesgos pendientes

### Altos antes de venderlo como producto real

- No existe autenticación, autorización ni separación entre vendedores.
- No existe almacenamiento de archivos ni persistencia de proyectos.
- No existe generación de imágenes ni cola asíncrona de trabajos.
- La billetera, los costos y la descarga PDF no realizan operaciones reales.

### Medios

- La pantalla principal concentra gran parte del comportamiento en `app/page.tsx`; conviene dividirla por flujo cuando se implemente backend real.
- No hay pruebas end-to-end en navegador; el contrato actual protege estructura y activos esenciales.
- Los recursos visuales son pesados y utilizan etiquetas `<img>` sin optimización automática.

## Siguiente fase recomendada

1. Publicar esta demo y validar el recorrido comercial con el cliente.
2. Escribir contratos de datos para proyectos, productos, materiales, composiciones, créditos y generaciones.
3. Elegir autenticación, base de datos, almacenamiento de objetos y proveedor de generación.
4. Implementar un flujo vertical real: crear proyecto, subir referencias, generar una imagen, debitar créditos y guardar el resultado.
5. Incorporar permisos, límites de archivo, trazabilidad de costos, reintentos y observabilidad antes de habilitar usuarios reales.
