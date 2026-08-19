# Auditoría técnica — GitHub Pages

## Dictamen

El repositorio está preparado para publicar la demo conceptual como exportación estática. La arquitectura coincide con su alcance actual: interacción local, datos precargados y ausencia de operaciones de servidor.

## Controles

| Control | Resultado esperado |
|---|---|
| Lint y TypeScript | Sin errores |
| Pruebas automatizadas | Aprobadas |
| Auditoría npm | Sin vulnerabilidades conocidas |
| Exportación estática | Directorio `out/` completo |
| Rutas de GitHub Pages | Prefijo `/rubiolo-book-studio` |
| Despliegue | GitHub Actions desde `main` |

Las advertencias por etiquetas `<img>` son una mejora de rendimiento pendiente y no bloquean la demo.

## Límites antes de producción

- No hay usuarios, permisos ni persistencia.
- Las cargas, generaciones, créditos y PDF son simulaciones.
- No hay pruebas end-to-end en navegador.
- `app/page.tsx` debe dividirse por dominio al incorporar backend real.

## Evolución recomendada

Validar primero la experiencia comercial. Luego definir contratos para proyectos, archivos, materiales, composiciones y créditos antes de seleccionar backend, almacenamiento y proveedor de generación.
