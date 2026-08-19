# Rubiolo Book Studio

Webapp conceptual para configurar acoplados Rubiolo y generar un borrador visual de un book comercial. La demo permite elegir producto, materiales, movilidad, contextos, características verificadas, composiciones y editar una presentación simulada.

> Estado: demo navegable. La generación de imágenes, la persistencia, la billetera y la exportación PDF son simulaciones de interfaz.

## Requisitos

- Node.js 22
- npm 10 o posterior
- Docker 25 o posterior, solamente para probar el despliegue en contenedor

## Desarrollo local

```bash
npm ci
npm run dev
```

Abrir `http://localhost:3000`.

## Verificación

```bash
npm run check
```

El comando ejecuta lint, pruebas de contrato y build de producción.

## Ejecución de producción sin Docker

```bash
npm ci
npm run build
npm start
```

El servidor usa el puerto indicado por `PORT`; Next.js utiliza `3000` por defecto.

## Docker

```bash
docker build -t rubiolo-book-studio .
docker run --rm -p 3000:3000 rubiolo-book-studio
```

Comprobaciones:

- App: `http://localhost:3000`
- Salud: `http://localhost:3000/api/health`

La imagen usa Next.js standalone, corre como usuario no root y contiene un `HEALTHCHECK`.

## Publicar en GitHub

1. Crear un repositorio vacío en GitHub, sin README ni `.gitignore` adicionales.
2. Desde esta carpeta, revisar los archivos a publicar:

   ```bash
   git status
   git remote -v
   ```

3. Si todavía no existe un remoto:

   ```bash
   git remote add origin https://github.com/ORGANIZACION/rubiolo-book-studio.git
   ```

4. Publicar `main`:

   ```bash
   git push -u origin main
   ```

El workflow de GitHub Actions valida automáticamente cada push y pull request.

## Desplegar en Coolify

Crear una **Application** conectada al repositorio GitHub y configurar:

| Campo | Valor |
|---|---|
| Build Pack | Dockerfile |
| Base Directory | `/` |
| Dockerfile Location | `/Dockerfile` |
| Ports Exposes | `3000` |
| Healthcheck | provisto por el Dockerfile |
| Dominio | el dominio o subdominio asignado al proyecto |

El proceso escucha en `0.0.0.0:3000`, requisito para que el proxy de Coolify pueda alcanzarlo. No se necesitan variables de entorno para esta demo.

Después del primer deploy:

1. Confirmar que el contenedor figure como `healthy`.
2. Abrir `/api/health` y comprobar una respuesta con `status: ok`.
3. Revisar portada, catálogo y al menos un flujo completo hasta el editor.
4. Activar despliegue automático desde `main` solo después de validar el primer release.

## Estructura

```text
app/                 interfaz y endpoint de salud
public/              imágenes y recursos de producto
tests/               pruebas de contrato de la demo
.github/workflows/   integración continua
Dockerfile           build y runtime para Coolify
docs/                decisiones de producto y despliegue
```

## Límites actuales

- Todo el estado es temporal y se pierde al recargar.
- Los archivos elegidos no se suben a un servidor.
- Los créditos y valores monetarios son demostrativos.
- Los renders y regeneraciones son simulados.
- El botón de PDF muestra una previsualización; no genera un archivo real.

El alcance y los criterios de aceptación están en `docs/deployment-pdr.md`; el dictamen técnico y los riesgos pendientes están en `docs/technical-audit.md`.
