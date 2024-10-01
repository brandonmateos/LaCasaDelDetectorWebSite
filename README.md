# Ferretería y Electrónica La Casa del Detector

| <img src="https://github.com/brandonmateos/LaCasaDelDetectorWebSite/blob/main/public/img/logoFBlanco.png" alt="Logo" width="200"> | Descubre más sobre el proyecto visitando la página de la [La Casa del Detector](https://la-casa-del-detector-web-site.vercel.app/) para más información. |
|:---:|---:|

## Descripción

Bienvenido al sitio web de **Ferretería y Electrónica La Casa del Detector**, donde encontrarás las mejores herramientas y productos de alta calidad para tus proyectos. Navega a través de nuestro catálogo para descubrir las últimas novedades en herramientas y productos de cacería, detección y más.

## Características

- **Catálogo en línea**: Navega y busca productos por categorías como herramientas, cacería y detección.
- **Interfaz amigable**: Una experiencia de usuario sencilla y accesible en cualquier dispositivo.
- **Carrusel de imágenes**: Visualiza las últimas promociones y productos destacados desde la página principal.
- **Filtros de búsqueda**: Encuentra fácilmente los productos que necesitas con los filtros por categoría, disponibilidad, etc.

## Tecnologías utilizadas

Este proyecto está construido con:

- **HTML5**: Para la estructura de las páginas.
- **CSS3**: Para el diseño y la presentación.
- **Bootstrap 5**: Para la interfaz y el diseño responsive.
- **JavaScript**: Para la interactividad del sitio.
- **PostgreSql**: Para la base de datos.

## Instalación y Configuración

Sigue estos pasos para clonar el repositorio, instalar las dependencias y ejecutar la aplicación en tu entorno local.

### 1. Clona el repositorio

Utiliza el siguiente comando para clonar el repositorio en tu máquina local:

    git clone https://github.com/usuario/nombre-del-repositorio.git

### 2. Navega al directorio del proyecto

Dirígete a la carpeta del proyecto que acabas de clonar:

    cd nombre-del-repositorio

### 3. Instala las dependencias

Ejecuta el siguiente comando para instalar todas las dependencias necesarias:

    npm install

### 4. Agrega conexion a Base De datos

Agregamos un archivo .env en donde se agregara la conexion a PosgreSQL con la siguiente estructura;

    postgres://username:password@hostname:port/dbname

### 5. Estructura de query

La estructura que manejara el query que se usara es la siguiente:

    DROP TABLE IF EXISTS products;

    CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        brand VARCHAR(255) NOT NULL,
        code VARCHAR(50) NOT NULL,
        category VARCHAR(255) NOT NULL,
        availability BOOLEAN NOT NULL,
        price NUMERIC(10, 2) NOT NULL,
        image TEXT NOT NULL
    );

    INSERT INTO products (name, brand, code, category, availability, price, image) VALUES
    ('Destornillador de precisión', 'Truper', 'TRUP-001', 'Herramientas manuales', TRUE, 5.99, 'img/ROTI-20A.jpg');

### 6. Ejecuta el servidor

Una vez instaladas las dependencias y configuradas las variables de entorno, ejecuta el siguiente comando para iniciar el servidor:

    node server.js

### 7. Accede a la aplicación

Con el servidor en funcionamiento, puedes acceder a la aplicación a través de tu navegador web en:

    http://localhost:3000

