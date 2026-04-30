# CSS components system

## 🚀 Cómo Empezar

1. **Inclusión:** Para utilizar la biblioteca, simplemente enlaza el archivo `master.css` en la sección `<head>` de tu documento HTML.

   ```html
   <link rel="stylesheet" href="/assets/css/master.css" />
   ```

2. **Uso de Componentes:** Utiliza el `index.html` como una guía de referencia visual y de marcado para implementar los diferentes componentes en tu proyecto. La estructura de clases está inspirada en frameworks populares para una fácil adopción.

## 🎨 Personalización y Temas

La personalización es el punto fuerte de este sistema.
La arquitectura permite dos niveles de personalización:

### 1. A Nivel de Componente (Recomendado para ajustes específicos)

Este es el método ideal para modificar un componente de forma aislada sin afectar a los demás.

1. Navega a la carpeta del componente que deseas cambiar (ej. `assets/css/components/buttons/`).
2. Abre el archivo `root.css` que se encuentra allí.
3. Modifica los valores de las variables. Por ejemplo, para cambiar el radio de los bordes de todos los botones, cambiarías `--btn-border-radius`.

Estos archivos contienen todos los "diales" y "perillas" de diseño para cada componente.

### 2. A Nivel Global (Para Temas y Sobrescrituras Generales)

Si necesitas aplicar un cambio que afecte a todo el sitio (como cambiar el color primario) o sobrescribir múltiples componentes a la vez, usa `assets/css/master.css`.

- **Modificar el Tema:** Dentro del selector `:root` en `master.css`, puedes cambiar los valores de las variables de color (`--color-primary`, `--color-surface`, etc.) para aplicar un nuevo tema.
- **Sobrescribir Componentes:** Cualquier variable que definas en el `:root` de `master.css` tendrá prioridad sobre las definidas en los archivos `root.css` de los componentes, debido al orden de la cascada de CSS. Esto es útil para asegurar consistencia en todo el tema.
- **Modo Oscuro:** Los ajustes para el modo oscuro también se centralizan en `master.css` para facilitar su gestión.

## 🧩 Listado de Componentes

El proyecto incluye los siguientes componentes listos para usar:

- **Layout:**
  - Grid System (`.container`, `.row`, `.col-*`, `.offset-*`)
- **Base:**
  - Tipografía (Headings, párrafos, listas, etc.)
  - Imágenes (`.img-thumbnail`, `.rounded-circle`)
  - Figuras
- **Componentes:**
  - Accordion (Nativo con `<details>`)
  - Alerts (con variantes de color y opción de cierre)
  - Badges (Etiquetas)
  - Breadcrumbs
  - Buttons (con variantes, tamaños y estados)
  - Button Group
  - Cards (con variantes vertical, horizontal y de ticket)
  - Dropdowns
  - Forms (Inputs, Textarea, Select, Checkbox, Radio, File)
  - Form Validation (estados de validación y advertencia)
  - Modals (Nativo con `<dialog>`, responsivo y fullscreen)
  - Navbar (responsive, off-canvas, sticky, con múltiples alineaciones)
  - Tabs (accesible con navegación por teclado)
- **Utilidades:**
  - Espaciadores (clases `m-*`, `p-*` para márgenes y paddings)
  - Helpers (clases de display, alineación, etc.)
