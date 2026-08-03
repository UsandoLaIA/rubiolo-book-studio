# Rubiolo Book Studio — rediseño v2

## Objetivo

Evolucionar la demostración hacia un configurador-editor que muestre con claridad cómo el vendedor define el producto, controla lo que la IA puede afirmar, selecciona las composiciones, conoce el costo y edita el book antes de exportarlo.

## Portada

- Adoptar la dirección visual de la tarjeta social: transición conceptual CAD a producto terminado, azul técnico y jerarquía tipográfica industrial.
- Mantener el botón “Crear nuevo book”.
- Eliminar anotaciones de piezas que no agregan valor.
- Conservar el catálogo inferior aprobado.

## Flujo de seis pasos

1. Producto y referencias: selección del modelo, capturas CAD y fotografías.
2. Materiales por zona: selección visual de una región del producto y asignación desde una biblioteca con esferas de material iluminadas.
3. Movilidad: vehículo tractor compatible y carga opcional de fotografías del vehículo particular.
4. Contexto: contexto principal de uso y contextos complementarios permitidos para el book.
5. Información del producto: funciones, características especiales, beneficios, restricciones y hechos que la IA no debe inventar.
6. Composición y costo: selección libre de composiciones, resolución, cálculo de créditos y equivalencia monetaria orientativa.

## Borrador editorial

- Vista paginada similar a un PDF.
- Cada página combina una imagen coherente, título y texto editable.
- Acciones simuladas para regenerar imagen, texto o ambos a partir de una instrucción del vendedor.
- Miniaturas de páginas, costo de regeneración y vista previa conceptual de PDF.

## Reglas de la simulación

- El contexto principal orienta la narrativa, pero no restringe todos los escenarios.
- Las composiciones seleccionadas determinan la cantidad de páginas visuales y el costo.
- Los costos se expresan en créditos y ARS como estimación de demostración.
- La información ingresada por el vendedor es la fuente de verdad del borrador.
- No se realizan cargas persistentes, análisis CAD, generación real ni exportación PDF.

## Criterios de aceptación

1. La portada refleja la tarjeta social y no muestra anotaciones de carrocería o rodado.
2. Se puede seleccionar una zona del producto y asignarle un material visual.
3. La biblioteca presenta materiales como esferas con volumen, luz y sombra.
4. Movilidad aparece antes que contexto y admite una carga local simulada.
5. El contexto principal y los complementarios pueden configurarse por separado.
6. Existe un paso para declarar funciones, beneficios, restricciones y datos verificables.
7. El vendedor puede elegir libremente entre al menos diez composiciones.
8. El costo cambia con cantidad y resolución, mostrando créditos, ARS y saldo.
9. La pantalla de generación refleja el número de composiciones elegidas.
10. El book usa una maqueta paginada y permite editar o regenerar contenido por página.
11. Las referencias visuales y el texto de cada página son coherentes.
12. El flujo es responsive y navegable con teclado.
