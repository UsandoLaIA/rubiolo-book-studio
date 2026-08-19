# Rubiolo Book Studio

Demo pública para configurar acoplados Rubiolo y simular la creación de un book comercial. Permite elegir producto, materiales, movilidad, contextos, características y composiciones, y editar una presentación visual.

> La generación de imágenes, la persistencia, la billetera y la exportación PDF son simulaciones de interfaz.

## Demo

La versión publicada está disponible en:

<https://usandolaia.github.io/rubiolo-book-studio/>

Cada actualización de `main` se verifica y publica automáticamente mediante GitHub Actions.

## Desarrollo local

Requisitos: Node.js 22 y npm 10 o posterior.

```bash
npm ci
npm run dev
```

Abrir `http://localhost:3000`.

## Verificación

```bash
npm run check
```

Este comando ejecuta lint, pruebas de contrato, exportación estática y validación del contenido generado en `out/`.

Para reproducir localmente el prefijo utilizado por GitHub Pages en PowerShell:

```powershell
$env:GITHUB_ACTIONS = "true"
npm run check
Remove-Item Env:GITHUB_ACTIONS
```

## Publicación en GitHub Pages

El workflow `.github/workflows/deploy-pages.yml`:

1. instala el lockfile con `npm ci`;
2. ejecuta todas las verificaciones;
3. sube el directorio `out/`;
4. publica el artefacto en GitHub Pages.

En el repositorio, la fuente de Pages debe configurarse una sola vez como **GitHub Actions** desde `Settings → Pages`.

## Trabajo colaborativo

Crear una rama por cambio y abrir un pull request hacia `main`:

```bash
git switch -c feature/nombre-del-cambio
git add .
git commit -m "feat: descripción del cambio"
git push -u origin feature/nombre-del-cambio
```

El workflow de CI verifica los pull requests sin publicarlos. El despliegue ocurre solamente después de integrar el cambio en `main`.

## Estructura

```text
app/                 interfaz de la demo
public/              imágenes y recursos de producto
tests/               contratos y validación de la exportación
.github/workflows/   CI y publicación de Pages
docs/                decisiones y auditoría técnica
out/                 sitio generado, no versionado
```

## Límites actuales

- Todo el estado se pierde al recargar.
- Los archivos elegidos no se suben a un servidor.
- Los créditos y valores monetarios son demostrativos.
- Los renders y regeneraciones son simulados.
- El botón de PDF no genera un archivo real.
- GitHub Pages no puede alojar un backend, base de datos o trabajos de IA.

El diseño de esta publicación está documentado en `docs/plans/2026-08-18-github-pages-design.md`.
