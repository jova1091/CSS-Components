# AGENTS — Reglas y Especificaciones del Proyecto

## Stack

- **CSS vanilla** — sin preprocesadores, sin frameworks CSS
- **JavaScript vanilla (ES Modules)** — sin bundlers, sin transpilación
- **HTML semántico + ARIA** — accesibilidad nativa
- **Sin dependencias externas** — no npm, no node_modules, no build pipeline
- **Sin servidor de desarrollo** — se usa únicamente Live Server de VS Code (o `npx serve`)

## Arquitectura

### Core (siempre se carga)
- `assets/css/base/typography/` — tipografía base (headings, párrafos, listas, links, blockquotes, etc.)
- `assets/css/base/images/` — imágenes y figuras
- `assets/css/grid/` — sistema de rejilla (`.container`, `.row`, `.col-\*`, `.offset-\*`)
- `master.css` — entry point del core + import de todos los componentes via `@import` con `@layer`

### Componentes (carga independiente)

Cada componente vive en `assets/css/components/<nombre>/` con dos archivos:

| Archivo | Propósito |
|---|---|
| `root.css` | Variables CSS del componente (custom properties con `--nombre-propiedad: valor`) |
| `componente.css` | Estilos del componente, incluye `@import url("root.css")` al inicio |

### JavaScript

Los módulos interactivos viven en `assets/js/components/<nombre>.js` y siguen esta API:

```js
export function init(container = document) {
  // Escanea container en busca de elementos del componente y los inicializa
}

// export default init  → para retrocompatibilidad con importaciones directas
```

El cargador central (`assets/js/component-loader.js`) ofrece:

```js
ComponentLoader.load('buttons', containerEl?)   // CSS + JS bajo demanda
ComponentLoader.loadAll()                        // Carga todo (showcase)
ComponentLoader.startObserver()                  // Activa data-component
```

## Reglas de CSS

1. **Fallbacks obligatorios**: toda referencia a variable global (`var(--color-*)`, `var(--spacer-*)`, `var(--font-family-*)`, `var(--body-*)`, `var(--base-*)`, `var(--palette-dark-*)`) debe incluir fallback nativo:
   ```css
   var(--color-primary, #1b263b)
   var(--body-color, var(--color-text, #0d1b2a))  /* anidado si es necesario */
   ```
2. **`@import url("root.css")`** se mantiene dentro de cada `componente.css` — nunca se elimina.
3. **Variables en `:root`** — cada componente declara sus variables en su propio `root.css` usando el selector `:root` global. Nunca se usa Shadow DOM ni scoped styles.
4. **Sin clases de utilidad en el CSS del componente** — los componentes no deben depender de `.d-flex`, `.align-items-center`, etc. Esas clases pertenecen al HTML del showcase, no al CSS del componente.

## Reglas de JavaScript

1. Cada módulo exporta `init(container = document)` como función nombrada y como `default`.
2. Los event listeners globales (`document.addEventListener('click', ...)`) se mantienen en `document` siempre.
3. Las búsquedas de elementos se hacen contra `container`:
   - `container.querySelectorAll('.selector')` — inicialización local
   - `document.querySelectorAll('.selector')` — solo para listeners globales (como cerrar dropdowns al hacer clic fuera)
4. La clase `ToastService` es singleton — se exporta una instancia única como `default`.

## Flujo de trabajo

1. El proyecto se sirve con **Live Server** de VS Code (extensión Ritwick Dey).
2. No se necesita `npm install`, `npm run dev`, ni ningún comando de terminal para desarrollo.
3. Al finalizar cualquier cambio, ajuste o nueva funcionalidad, se debe **generar un mensaje de commit para GitHub** describiendo los cambios.
4. No se hace commit automáticamente — solo se entrega el mensaje al usuario para que decida.

## Convenciones de código

- **Indentación**: 2 espacios (definido en `.editorconfig`)
- **Encoding**: UTF-8
- **Final de línea**: LF
- **Comillas**: dobles en HTML, dobles/sencillas según preferencia en JS (consistente por archivo)
- **Punto y coma**: obligatorio en JS
- **Nombres de clases CSS**: kebab-case (`.btn-group`, `.form-control`, `.navbar-toggler`)
- **Nombres de variables CSS**: kebab-case con prefijo del componente (`--btn-padding-top`, `--card-border-radius`)
- **Nombres de archivos**: kebab-case (`.js`, `.css`)
- **Sin comentarios en código** a menos que sean necesarios para documentar una decisión técnica importante
- **IDs en HTML**: solo para elementos únicos del showcase (theme-toggle, secciones de demo), nunca para componentes reutilizables

## Estructura del proyecto

```
/
├── .editorconfig
├── .gitignore
├── AGENTS.md
├── README.MD
├── favicon.svg
├── index.html
├── assets/
│   ├── css/
│   │   ├── master.css
│   │   ├── base/
│   │   │   ├── images/   (core — siempre carga)
│   │   │   └── typography/ (core — siempre carga)
│   │   ├── components/
│   │   │   ├── accordion/
│   │   │   ├── alerts/
│   │   │   ├── badges/
│   │   │   ├── breadcrumb/
│   │   │   ├── buttons/
│   │   │   ├── cards/
│   │   │   ├── carousel/
│   │   │   ├── dropdown/
│   │   │   ├── forms/
│   │   │   ├── list-groups/
│   │   │   ├── modal/
│   │   │   ├── navbar/
│   │   │   ├── pagination/
│   │   │   ├── popovers/
│   │   │   ├── progress/
│   │   │   ├── skeletons/
│   │   │   ├── spinners/
│   │   │   ├── tables/
│   │   │   ├── tabs/
│   │   │   ├── toasts/
│   │   │   └── tooltips/
│   │   ├── grid/           (core — siempre carga)
│   │   └── utilities/
│   │       ├── helpers/    (independiente — se carga bajo demanda)
│   │       └── spacers/    (independiente — se carga bajo demanda)
│   ├── images/
│   │   ├── slide1.png
│   │   ├── slide2.png
│   │   └── slide3.png
│   └── js/
│       ├── component-loader.js
│       ├── main.js
│       └── components/
│           ├── accordion.js
│           ├── carousel.js
│           ├── dropdown.js
│           ├── float-labels.js
│           ├── modal.js
│           ├── navbar.js
│           ├── popovers.js
│           ├── tabs.js
│           ├── toasts.js
│           └── tooltips.js
```
