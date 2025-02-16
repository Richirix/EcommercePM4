# 🚀 PM4BE-Richirix

## 📖 Descripción
**PM4BE-Richirix** es un proyecto diseñado para proporcionar una experiencia optimizada y eficiente en la gestión de productos, usuarios, pedidos y autenticación.

## ⚙️ Tecnologías Utilizadas
- 🟢 **NestJS**
- 🛠️ **Swagger** para documentación interactiva
- 🗂️ **TypeORM** con **PostgreSQL**
- 🌐 **Axios** para peticiones HTTP
- ☁️ **Cloudinary** para almacenamiento de imágenes
- 🐳 **Docker** (opcional para despliegue)

## 🚧 Funcionalidades
- 🔑 Autenticación y autorización de usuarios.
- 🛒 Gestión de productos y pedidos.
- 🌐 Integración de Swagger para probar los endpoints.
- 📂 Carga de imágenes en la nube con Cloudinary.

## 🚀 Instalación y Ejecución
1. Clona el repositorio:
    ```bash
    git clone https://github.com/pi-rym/PM4BE-Richirix.git
    ```
2. Accede al directorio:
    ```bash
    cd PM4BE-Richirix
    ```
3. Instala las dependencias:
    ```bash
    npm install
    ```
4. Configura las variables de entorno en un archivo `.env`:
    ```bash
    PORT=3000
    DB_TYPE=postgres
    DB_HOST=localhost
    DB_PORT=5432
    DB_USERNAME=postgres
    DB_PASSWORD=contraseña
    DB_NAME=nombre_base_datos
    CLOUDINARY_CLOUD_NAME=nombre_cloud
    CLOUDINARY_APY_KEY=clave_api
    CLOUDINARY_APY_SECRET=clave_secreta
    JWT_SECRET=clave_secreta_jwt
    ```
5. Inicia el servidor:
    ```bash
    npm run start:dev
    ```

## 🌐 Endpoints Principales (Swagger)
La documentación completa de los endpoints está disponible en Swagger:
- **URL:** `http://localhost:3000/api`

### 🛒 Products
- `GET /products` - Listar todos los productos.
- `POST /products` - Agregar un nuevo producto.
- `GET /products/seeder` - Cargar productos de prueba.
- `GET /products/{id}` - Obtener producto por ID.
- `PUT /products/{id}` - Actualizar un producto.
- `DELETE /products/{id}` - Eliminar un producto.

### 👤 Users
- `GET /users` - Listar todos los usuarios.
- `GET /users/{id}` - Obtener un usuario por ID.
- `PUT /users/{id}` - Actualizar un usuario.
- `DELETE /users/{id}` - Eliminar un usuario.

### 🔐 Auth
- `POST /auth/signup` - Registro de nuevos usuarios.
- `POST /auth/signin` - Inicio de sesión.

### 🏷️ Categories
- `GET /categories/seeder` - Cargar categorías de prueba.

### 📦 Orders
- `POST /orders` - Crear una nueva orden.
- `GET /orders/{orderId}` - Obtener una orden por ID.

### 📸 FileUpload
- `POST /file-upload/uploadImage/{productId}` - Subir una imagen para un producto.

## 📋 Contribuciones
¡Las contribuciones son bienvenidas! Por favor, abre un **Issue** o envía un **Pull Request** si encuentras algún error o deseas agregar una nueva funcionalidad.

## 🧑‍💻 Autor
- **Richi** - [GitHub](https://github.com/pi-rym)

## 🛑 Licencia
Este proyecto está bajo la licencia **MIT**.


