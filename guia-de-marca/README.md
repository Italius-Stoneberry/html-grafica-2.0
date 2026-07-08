# GraficArte — Kit de marca y UI

Recurso para construir interfaces (web, sistema interno) respetando la identidad
usada en la landing. Basado en el sistema "Atelier Precise" (`../DESIGN.md`),
adaptado: **sin el azul primario**, con el rojo del logo como acento.

## Contenido

| Archivo | Qué es |
|---|---|
| `guia.html` | Guía visual navegable: colores, tipografía, componentes, patrones. Abrila en el navegador. |
| `tokens.css` | Variables CSS + componentes base listos para importar en cualquier interfaz. |
| `patrones/topografia-clara.svg` | Patrón topográfico estático para fondos claros. |
| `patrones/topografia-oscura.svg` | Ídem para fondos oscuros (#121212). |

## Reglas rápidas

1. **Dorado (#F6A800) = acción.** Botones principales de acento, estados activos, focus.
2. **Rojo (#D30008) = énfasis y crítico.** Logo, indicadores, errores, acciones destructivas. Usarlo poco: pierde fuerza si está en todos lados.
3. **Nunca mezclar rojo y dorado en el mismo componente.**
4. **Negro #121212 = estructura** (barras, botón primario). El texto va en #1c1b1b, nunca negro puro.
5. **Profundidad con bordes de 1px y capas tonales, no sombras.** Única excepción: hover de botones primarios/acento.
6. **Radios chicos:** 4px botones e inputs, 8px cards. Imágenes sin radio.
7. **Tipografía:** Hanken Grotesk (títulos, peso 700/800, tracking negativo) + Inter (cuerpo). Labels siempre 12px, 600, mayúsculas, tracking 0.1em.
8. **Topografía = decoración.** En sistema interno usar la versión estática (estos SVG), en cabeceras, pantallas vacías o paneles hero. Nunca detrás de formularios ni tablas. En la landing pública puede ser la versión animada.
9. **Logo:** versión negra sobre fondos claros, blanca sobre oscuros (`../html-grafica-2.0/Logo negro completo.svg` y `Logo blanco completo.svg`). Favicon rojo. No deformar, no recolorear.
10. La paleta **no tiene verde a propósito**: para "éxito/activo" usar dorado; para error, rojo; para neutro, gris #42474c.

## Uso mínimo

```html
<link href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;600;700;800&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="tokens.css">

<body class="ga-body">
  <button class="ga-btn ga-btn-acento">Guardar</button>
  <div class="ga-card">...</div>
</body>
```
