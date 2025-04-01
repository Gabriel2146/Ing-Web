# Proyecto CRUD con Vue.js y Django

Este proyecto es una aplicación web que implementa un sistema CRUD (Crear, Leer, Actualizar y Eliminar) utilizando **Vue.js** como frontend y **Django** como backend. El frontend interactúa con el backend mediante una API RESTful para gestionar ítems. Este proyecto incluye funcionalidades para agregar, editar, eliminar y visualizar ítems.

---

## Índice

1. [Requisitos](#requisitos)
2. [Instalación](#instalación)
    - [Backend (Django)](#backend-django)
    - [Frontend (Vue.js)](#frontend-vuejs)
    - [CORS en Django](#cors-en-django)
3. [API](#api)
4. [Estructura de Archivos](#estructura-de-archivos)
5. [Funcionalidades](#funcionalidades)
6. [Tecnologías Utilizadas](#tecnologías-utilizadas)
7. [Capturas de Pantalla](#capturas-de-pantalla)
8. [Contribuciones](#contribuciones)
9. [Licencia](#licencia)

---

## Requisitos

Antes de comenzar, asegúrate de tener instalado lo siguiente en tu máquina:

- **Node.js**: Necesario para ejecutar el frontend en Vue.js.
- **Python**: Necesario para ejecutar el backend en Django.
- **Django Rest Framework**: Para crear y manejar la API del backend.
- **Font Awesome**: Para iconos en el frontend.

---

## Instalación

### Backend (Django)

1. Clona el repositorio o descarga el proyecto.
2. Navega al directorio del backend en tu terminal.
3. Crea un entorno virtual para gestionar las dependencias:

    ```bash
    python -m venv venv
    source venv/bin/activate  # En Windows usa `venv\Scripts\activate`
    ```

4. Instala las dependencias del proyecto:

    ```bash
    pip install -r requirements.txt
    ```

5. Realiza las migraciones para configurar la base de datos:

    ```bash
    python manage.py migrate
    ```

6. Ejecuta el servidor de desarrollo:

    ```bash
    python manage.py runserver
    ```

    El backend estará disponible en `http://127.0.0.1:8000`.

### Frontend (Vue.js)

1. Navega al directorio del frontend en tu terminal.
2. Instala las dependencias de Vue.js:

    ```bash
    npm install
    ```

3. Ejecuta el servidor de desarrollo:

    ```bash
    npm run serve
    ```

    El frontend estará disponible en `http://localhost:8080`.

### CORS en Django

Para permitir que el frontend (Vue.js) se comunique con el backend (Django) de manera segura, hemos configurado CORS en el backend. Asegúrate de tener instalado el paquete `django-cors-headers`:

1. Instala `django-cors-headers`:

    ```bash
    pip install django-cors-headers
    ```

2. Añade `'corsheaders'` a la lista de aplicaciones instaladas en `settings.py`:

    ```python
    INSTALLED_APPS = [
        'corsheaders',
        # Otras aplicaciones...
    ]
    ```

3. Configura los permisos CORS en `settings.py`:

    ```python
    CORS_ALLOWED_ORIGINS = [
        'http://localhost:8080',  # Frontend en Vue.js
    ]
    ```

---

## API

El backend proporciona una API RESTful que gestiona los ítems. Aquí tienes las rutas principales:

- `GET /api/items/`: Obtiene todos los ítems.
- `POST /api/items/`: Crea un nuevo ítem.
- `PUT /api/items/{id}/`: Actualiza un ítem existente.
- `DELETE /api/items/{id}/`: Elimina un ítem existente.

---

## Estructura de Archivos

El proyecto está dividido en dos partes principales:

1. **Backend (Django)**: 
    - El backend se encuentra en el directorio `backend/`.
    - Se utiliza Django para gestionar la API con `Django Rest Framework`.
    - La base de datos es SQLite para desarrollo (puedes configurarla a tu gusto).

2. **Frontend (Vue.js)**: 
    - El frontend está en el directorio `frontend/`.
    - Utiliza Vue.js para la interfaz de usuario.
    - Se utilizan componentes como `ItemList.vue`, `CreateItem.vue`, `EditItem.vue` para gestionar la lista de ítems y las operaciones CRUD.

---

## Funcionalidades

- **Vista de Ítems**: Muestra todos los ítems en una lista.
- **Agregar Ítem**: Permite agregar un nuevo ítem con nombre y descripción.
- **Editar Ítem**: Permite editar un ítem seleccionado.
- **Eliminar Ítem**: Permite eliminar un ítem de la lista.

---

## Tecnologías Utilizadas

- **Backend**:
    - Django
    - Django Rest Framework
    - SQLite (base de datos)
    - CORS Headers para permitir el acceso desde el frontend

- **Frontend**:
    - Vue.js
    - Axios (para realizar peticiones HTTP)
    - Font Awesome (para iconos)

---

## Capturas de Pantalla

Aquí puedes agregar algunas capturas de pantalla del proyecto funcionando. Ejemplo:

1. Vista general de los ítems:
    ![Items List](./screenshots/items_list.png)

2. Formulario de agregar ítem:
    ![Add Item Form](./screenshots/add_item.png)

---

## Contribuciones

Si deseas contribuir al proyecto, por favor sigue estos pasos:

1. Haz un fork de este repositorio.
2. Crea una rama para tus cambios (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza los cambios y haz commit (`git commit -am 'Añadir nueva funcionalidad'`).
4. Empuja tus cambios a tu repositorio (`git push origin feature/nueva-funcionalidad`).
5. Abre un pull request describiendo los cambios realizados.

---

## Licencia

Este proyecto está bajo la licencia **MIT**. Consulta el archivo `LICENSE` para más detalles.
