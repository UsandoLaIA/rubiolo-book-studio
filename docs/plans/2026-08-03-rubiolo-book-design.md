# Rubiolo Book Studio — diseño del prototipo

## Objetivo

Demostrar cómo un vendedor de Acoplados Rubiolo podría convertir referencias de un producto en un book comercial personalizado durante una conversación con un cliente.

## Usuario y trabajo a resolver

Usuario principal: vendedor interno. Cuando presenta un acoplado y necesita adaptarlo al contexto de un comprador, quiere configurar producto, materiales, escenario y vehículo tractor para mostrar una propuesta visual convincente en minutos.

## Alcance del prototipo

- Selección entre HO1028, HO1012 y HO1003.
- Simulación de cinco etapas: referencias, materiales, escenarios, vehículo y composición.
- Progreso de generación simulado.
- Book final visualizado dentro del navegador con seis composiciones conceptuales.
- Interacciones locales, sin persistencia ni cuentas.

## Fuera de alcance

- Lectura real de archivos CAD.
- Segmentación automática de piezas.
- Generación de imágenes mediante IA.
- Exportación PDF, autenticación, base de datos y gestión multiusuario.

## Dirección visual

Interfaz industrial premium basada en azul profundo y azul Rubiolo, con grafito y blanco cálido. El verde manzana se reserva para microacentos de confirmación, progreso y selección. La imagen del producto domina la experiencia; la interfaz evita la apariencia de dashboard genérico.

## Flujo

1. El vendedor inicia un nuevo book y selecciona un producto.
2. Revisa referencias CAD y fotografías precargadas.
3. Asigna materiales a zonas predefinidas.
4. Elige escenario y vehículo compatible.
5. Define las seis composiciones y ejecuta una generación simulada.
6. Recorre el book resultante en una vista editorial.

## Criterios de aceptación

1. Los tres productos pueden seleccionarse y muestran nombre, código, dimensiones y uso.
2. El vendedor puede completar los cinco pasos y volver a cualquiera de ellos sin perder la selección local.
3. Material, escenario y vehículo seleccionados se reflejan en el resumen y en el book final.
4. La generación muestra un estado de procesamiento observable antes del resultado.
5. El resultado contiene seis composiciones y permite recorrerlas.
6. La experiencia es usable con mouse, teclado y pantalla móvil.
7. La interfaz utiliza la paleta azul aprobada y el verde solo como acento sutil.

## Validación

Build de producción limpio, prueba del flujo principal y revisión de estados activos, navegación por teclado y adaptación responsive.
