# CSS components system

## 🚀 Cómo Empezar

1. **Inclusión:** Para utilizar la biblioteca, simplemente enlaza el archivo `master.css` en la sección `<head>` de tu documento HTML.

   ```html
   <link rel="stylesheet" href="/assets/css/master.css" />
   ```

2. **Uso de Componentes:** Utiliza el `index.html` como una guía de referencia visual y de marcado para implementar los diferentes componentes en tu proyecto. La estructura de clases está inspirada en frameworks populares para una fácil adopción.

## 🎨 Personalización y Temas

La personalización es el principio fundamental de este sistema.
Absolutamente todas las propiedades estructurales, visuales y de comportamiento de los componentes (incluyendo `position`, `display`, `width`, `height`, `flex`, `overflow`, `cursor`, `list-style`, colores, rellenos, márgenes, radios de borde, sombras, tamaños de fuente, z-index, transiciones y animaciones) están parametrizadas mediante variables CSS personalizables que se definen en el archivo `root.css` de cada componente.

La arquitectura permite dos niveles de personalización:


### 1. A Nivel de Componente (Recomendado para ajustes específicos)

Este es el método ideal para modificar un componente de forma aislada sin afectar a los demás.

1. Navega a la carpeta del componente que deseas cambiar (ej. `assets/css/components/buttons/`).
2. Abre el archivo `root.css` que se encuentra allí.
3. Modifica los valores de las variables. Por ejemplo:
   - En **Buttons**: cambia el radio de los bordes con `--btn-border-radius`.
   - En **Pagination**: ajusta la separación con `--pagination-margin-x` o el z-index con `--pagination-hover-zindex`.
   - En **Popovers**: ajusta el tamaño de la flecha con `--popover-arrow-size` o el offset con `--popover-arrow-offset`.
   - En **Carousel**: personaliza la altura de las diapositivas con `--carousel-height` y `--carousel-height-mobile`.

Estos archivos contienen todos los diales y perillas de diseño para personalizar al 100% cada elemento.

### 2. A Nivel Base, Grid y Utilidades (Arquitectura Profunda)

La parametrización va más allá de los componentes visuales e incluye los cimientos mismos de la interfaz:
- **Base:** Etiquetas estructurales como `body`, `h1`-`h6`, `img`, `figure` e incluso `<hr>` y `blockquote` están gobernadas por variables en sus propios archivos `root.css`. Esto incluye tipografía, márgenes, bordes estáticos y renderizado webkit.
- **Grid:** Las propiedades geométricas de los contenedores (`max-width`, `margin`), y las propiedades flex/grid base son personalizables desde `grid/root.css`.
- **Utilities:** Las clases utilitarias (`helpers.css` y `spacers.css`) como radios de borde (`.rounded-circle`), anchos invisibles (`.visually-hidden`) y demás también exponen variables. Esto garantiza un control absoluto en cada capa atómica.

### 3. A Nivel Global (Para Temas y Sobrescrituras Generales)

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
  - Accordion (Nativo con `<details>`, mejorado con navegación por teclado y exclusividad opcional)
  - Alerts (con variantes de color y opción de cierre)
  - Badges (Etiquetas)
  - Breadcrumbs
  - Buttons (con variantes, tamaños y estados)
  - Button Group
  - Cards (con variantes vertical, horizontal y de ticket)
  - Carousel (carrusel de diapositivas responsivo y accesible con autoplay seguro)
  - Dropdowns
  - Forms (Inputs, Textarea, Select, Checkbox, Radio, File, Floating Labels, Switches)
  - Form Validation (estados de validación y advertencia con animación de sacudida y pulso de foco)
  - List Groups (grupos de listas estructuradas e interactivas)
  - Modals (Nativo con `<dialog>`, responsivo y fullscreen)
  - Navbar (responsive, off-canvas, sticky, con múltiples alineaciones y soporte de glassmorphism)
  - Pagination (paginación accesible con estados interactivos)
  - Popovers (ventanas flotantes informativas interactivas)
  - Progress Bars (barras de progreso semánticas, con rayas y animadas)
  - Skeleton Loaders (cargadores de esqueleto animados con shimmer)
  - Spinners (cargadores de espera circulares y pulsantes)
  - Tabs (accesible con navegación por teclado)
  - Toasts (notificaciones dinámicas, accesibles y animadas con `aria-live` automático)
  - Tooltips Dinámicos (accesibles con posicionamiento inteligente)
  - Tablas (diseño responsivo, celdas compactas, zebra striping, hover y variantes semánticas)
- **Utilidades:**
  - Espaciadores (clases `m-*`, `p-*` para márgenes y paddings)
  - Helpers (clases de display, alineación, etc.)

## ✨ Características y Accesibilidad (A11y)

Nuestra biblioteca no es solo un conjunto de estilos CSS; está diseñada con foco en la experiencia del usuario y accesibilidad nativa:

1. **Diseño y Glassmorphism:**
   - Efectos de desenfoque de fondo (`backdrop-filter`) integrados en Navbar, Dropdowns y Modales.
   - Transiciones globales fluidas para cambios de tema en todas las propiedades clave (`background-color`, `color`, `transform`, `box-shadow`, etc.).
   - Selector de tema (Claro/Oscuro) en la barra de navegación usando iconos dinámicos SVG.

2. **Accesibilidad en Accordions (A11y):**
   - Soporte nativo para `<details>` y `<summary>` con navegación por teclado (`ArrowUp`, `ArrowDown`, `Home`, `End`).
   - Mecanismo de exclusividad automática en JS para asegurar que solo haya un acordeón abierto a la vez (fallback de `<details name="...">`).

3. **Sistema Dinámico de Toasts:**
   - Gestión inteligente mediante JS (`toast.success()`, `toast.info()`, etc.).
   - Accesibilidad nativa con asignación automática de `role="alert"` / `aria-live="assertive"` para notificaciones de peligro (`danger`) y `role="status"` / `aria-live="polite"` para las informativas.
   - Entrada dinámica con animación de muelle (scale + slide) y descarte suave.

4. **Navbar Móvil Offcanvas Robusta:**
   - Animación de entrada y salida lateral fluida en dispositivos móviles controlando las transiciones de `visibility` y `transform`.
   - Corrección del error de _containing block_ generado por `backdrop-filter` en la navbar pegajosa mediante la delegación del filtro a un pseudo-elemento `::before`, manteniendo la barra lateral fija respecto al viewport global.
   - Alineación izquierda elegante en pantallas pequeñas para una interfaz más nativa y ergonómica.

5. **Cargadores de Esqueleto (Skeleton Loaders):**
   - Estructura responsiva para simular carga en tarjetas (rectángulo), perfiles (avatar + texto) y tablas.
   - Animación de brillo ("shimmer") fluida y optimizada mediante gradientes lineales animados por CSS.

6. **Tooltips Accesibles y Dinámicos:**
   - Activación automática por ratón (`mouseenter`/`mouseleave`) y foco de teclado (`focus`/`blur`) para lectores de pantalla.
   - Posicionamiento dinámico automático e inteligente en las cuatro direcciones cardinales con flechas indicadoras.

7. **Etiquetas Flotantes y Validación Interactiva:**
   - Implementación moderna de etiquetas flotantes híbrida (CSS puro + fallback de JS para selectores).
   - Animaciones avanzadas de foco (pulse ring) y de error (sacudida o shake en elementos inválidos).
   - Switches táctiles y responsivos con transiciones y micro-interacciones al hacer clic.

8. **Popovers y List Groups Enriquecidos:**
   - Ventanas emergentes de popover estructuradas con título y cuerpo, posicionadas dinámicamente.
   - Activación por clic, con cierre automático al pulsar fuera o presionar la tecla `Escape`.
   - Grupos de listas con soporte para hover interactivo, elementos activos/deshabilitados y diseño estructurado para contenido complejo con insignias.

9. **Carrusel de Diapositivas Responsivo:**
   - Desplazamientos fluidos mediante CSS Scroll Snapping nativo de alto rendimiento.
   - Controles de navegación manual (previo/siguiente) e indicadores de posición interactivos sincronizados.
   - Autoplay seguro con pausa automática al pasar el cursor (`mouseenter`/`touchstart`) para cumplir con normativas de accesibilidad (A11y).
   - Optimización de redimensionado mediante debounce de eventos resize en JS.
