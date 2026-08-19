# PDR — GitHub y Coolify

## 1. Resumen

Preparar Rubiolo Book Studio como una webapp Next.js reproducible desde un repositorio Git y desplegable en Coolify mediante un único contenedor Docker.

## 2. Usuario y trabajo a resolver

- Usuario operativo: responsable técnico que mantiene y despliega la demo.
- Usuario del producto: vendedor de Acoplados Rubiolo que configura y presenta books comerciales.
- Trabajo: cuando el repositorio se clona o Coolify recibe un nuevo commit, la aplicación debe instalar, compilar, iniciar y reportar salud sin depender de Codex, Sites, Wrangler ni configuración manual del equipo original.
- No es todavía un sistema productivo de generación de imágenes, pagos o persistencia.

## 3. Objetivos

- Build reproducible con Node.js 22 y `npm ci`.
- Imagen Docker autosuficiente, no root y con healthcheck.
- Proceso escuchando en `0.0.0.0:3000`.
- Documentación concreta para GitHub y Coolify.
- CI que valide lint, pruebas y build en cada push o pull request.

## 4. Alcance

### V1

- Mantener la webapp conceptual existente.
- Migrar el runtime de producción desde vinext/Workers a Next.js standalone.
- Retirar scaffolding no utilizado de Cloudflare D1, Wrangler y Sites.
- Agregar `/api/health`, Dockerfile, `.dockerignore`, CI y guía de despliegue.

### Posterior

- Persistencia de proyectos y archivos.
- Autenticación y roles.
- Integración con generación de imágenes, billetera y cobros.
- Almacenamiento de objetos, trabajos asíncronos y observabilidad externa.

### Fuera de alcance

- Implementar IA real, Mercado Pago, base de datos o exportación PDF real.
- Crear o configurar por cuenta de la usuaria el servidor Coolify, DNS o repositorio remoto sin autorización explícita.

## 5. Arquitectura mínima

- Next.js App Router como monolito web.
- React cliente para la experiencia conceptual actual.
- Endpoint liviano de salud en el mismo proceso.
- Docker multi-stage con salida standalone.
- Coolify construye el Dockerfile desde GitHub y enruta al puerto interno 3000.

## 6. Criterios de aceptación

1. `npm ci` instala exactamente el lockfile sin cambios.
2. `npm run lint`, `npm test` y `npm run build` finalizan con código 0.
3. El artefacto standalone incluye `server.js`, estáticos y recursos públicos.
4. El contenedor arranca como usuario no root y escucha en `0.0.0.0:3000`.
5. `GET /api/health` responde HTTP 200 con JSON estable.
6. La portada y las imágenes de los tres productos continúan disponibles.
7. El README permite a otra persona ejecutar localmente y configurar Coolify sin conocimiento previo del starter.
8. No hay secretos, `.env`, builds ni dependencias locales versionadas.

## 7. Riesgos y supuestos

- La demo mantiene estado únicamente en memoria del navegador; recargar pierde el trabajo.
- Las cargas de archivos no se envían ni persisten.
- El cálculo monetario es demostrativo.
- La producción real necesitará contratos de datos, seguridad, límites de archivos y trazabilidad de costos.

## 8. Validación

- Instalación limpia.
- Lint y pruebas automatizadas.
- Build Next.js standalone.
- Build y ejecución Docker cuando Docker esté disponible.
- Prueba HTTP del home, healthcheck e imágenes representativas.
