# Sistema de Gestión de Productos - SPA en React + Vite 🛍️

_Trabajo Final Integrador - Programación Visual - Facultad de Ingeniería, UNJu_

## Introducción 📖

Este proyecto fue desarrollado como parte del **Trabajo Final Integrador** de la materia **Programación Visual** de la carrera **Analista Programador Universitario**. El objetivo principal es construir una **Single Page Application (SPA)** utilizando **React** y **Vite**, con manejo de estado global mediante **Redux**.

Esta aplicación web permite gestionar un catálogo de productos a través de una interfaz amigable y moderna. Incluye funcionalidades clave como la visualización detallada, creación, edición, eliminación y la posibilidad de marcar productos como favoritos. El manejo de estado global asegura que la información esté centralizada y sea accesible en toda la aplicación.

## Características ✨

La aplicación gestiona datos de productos a través de las siguientes funcionalidades:

* **Página de Inicio (Home)**: Muestra un listado de productos en formato de tarjetas (cards).
    * Cada tarjeta de producto incluye: ID, imagen representativa, nombre, precio, descripción, categoría y un botón para ver más detalles.
    * Ícono para marcar/desmarcar como favorito.
    * Botón para "Crear Nuevo Producto".
* **Funcionalidad de Favoritos**:
    * Los productos pueden ser marcados/desmarcados como favoritos.
    * El estado de los productos favoritos se almacena en el estado global (Redux).
* **Página de Favoritos**: Muestra únicamente los productos que el usuario ha marcado como favoritos.
* **Página de Detalle del Producto**:
    * Accesible desde el botón "Ver más detalles" de cada tarjeta.
    * Muestra información ampliada del producto (descripción, categoría, stock, precio).
    * Permite desmarcar el producto (favorito) desde esta vista, actualizando el estado global.
    * Permite editar el producto y eliminarlo (con confirmación previa).
* **Formulario de Creación y Edición**:
    * Componente reutilizable que permite crear un nuevo producto desde cero.
    * Permite editar un producto existente, con los campos precargados según el ID del producto.
    * Incluye validaciones en los campos (ej. ID único, precio positivo).
* **Notificaciones**: Mensajes emergentes para confirmar operaciones exitosas (ej. producto guardado/eliminado).
* **Página "Acerca de"**: Información sobre los desarrolladores de la aplicación y el proyecto.
* **Navegación General**: Un menú de navegación (`NavBar`) persistente y accesible desde todas las vistas de la aplicación.

## Tecnologías Utilizadas 🛠️

Este proyecto ha sido desarrollado utilizando las siguientes tecnologías y herramientas, buscando un equilibrio entre rendimiento y mantenibilidad:

* **Entorno de Desarrollo:** [Vite](https://vitejs.dev/) (v6.3.5)
* **Librería Principal:** [React](https://react.dev/) (v19.1.0)
* **Manejo de Estado Global:** [Redux Toolkit](https://redux-toolkit.js.org/) (v2.8.2) y [React Redux](https://react-redux.js.org/) (v9.2.0)
* **Manejo de Rutas:** [React Router Dom](https://reactrouter.com/en/main) (v7.6.2)
* **Consumo de API:** [Fetch API](https://developer.mozilla.org/es/docs/Web/API/Fetch_API) (nativa de JavaScript)
* **Framework de UI:** [React Bootstrap](https://react-bootstrap.netlify.app/) (v2.10.10)
* **Iconos:** [React Icons](https://react-icons.github.io/react-icons/) (Font Awesome)
* **Lenguaje:** JavaScript (ES6+) con sintaxis JSX.

## Estructura de Datos del Producto 📝

Los productos gestionados en la aplicación siguen una estructura similar a la proporcionada por la FakeStore API, con campos como:

* **`id`**: Identificador único del producto (Number).
* **`title`**: Título/Nombre del producto (String).
* **`price`**: Precio del producto (Number).
* **`description`**: Descripción detallada del producto (String).
* **`category`**: Categoría a la que pertenece el producto (String, ej: "electronics", "jewelry").
* **`image`**: URL de la imagen representativa del producto (String).
* **`rating`**: Objeto que incluye `rate` (calificación promedio) y `count` (cantidad de valoraciones, usado como stock en este proyecto).

Los productos son almacenados en el estado global de la aplicación gestionado por Redux.

## Consumo de API Externa 🌐

La aplicación consume datos de productos de la siguiente API REST pública para alimentar su listado principal:

* **URL Base:** `https://fakestoreapi.com/products`

El consumo se realiza mediante `Fetch`. Al cargar la aplicación por primera vez, se realiza una petición `GET` para obtener el catálogo de productos, los cuales son luego guardados en el estado global y sobre los cuales se aplica toda la lógica de la aplicación (favoritos, edición, eliminación).

## Integrantes del Equipo 🧑‍💻👩‍💻

* **Gonzalo Nicolás Barboza** ➡ GitHub: [`Nicolas-Barboza`](https://github.com/Nicolas-Barboza)
* **Facundo Santiago Cortez** ➡ GitHub: [`Facundo254`](https://github.com/Facundo254)
* **Joaquin Matías Coca** ➡ GitHub: [`Coca-m`](https://github.com/Coca-m)

## Instalación y Ejecución Local 🚀

Para ejecutar este proyecto en tu entorno de desarrollo local, sigue estos sencillos pasos:

1.  **Clona el repositorio:**
    ```bash
    git clone https://github.com/Nicolas-Barboza/pv_tp_integrador_grupo6.git
    cd pv_tp_integrador_grupo6 
    ```
2.  **Instala las dependencias del proyecto:**
    ```bash
    npm install
    ```
3.  **Inicia el servidor de desarrollo:**
    ```bash
    npm run dev
    ```
    La aplicación estará disponible en `http://localhost:5173` (o el puerto que Vite asigne).

## Estrategia de Control de Versiones (Git) 🌿

El desarrollo del proyecto sigue un flujo de trabajo basado en ramas para asegurar una gestión de versiones organizada y colaborativa:

* **`main`**: Rama principal que contiene la versión estable del proyecto, lista para entrega o "producción".
* **`develop`**: Rama de integración donde se consolidan las nuevas funcionalidades y correcciones. Las ramas de características y correcciones se fusionan aquí.
* **Ramas de funcionalidad/corrección (ej. `feature/<nombre-feature>`, `fix/<nombre-fix>`)**: Ramas temporales creadas para el desarrollo de nuevas características o la solución de errores específicos. Una vez completadas, se fusionan de nuevo a `develop` (preferiblemente a través de Pull Requests).

---