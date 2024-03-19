# Prueba tecnica - API REST de comercio electrónico

<p align="center" >
  <img src="https://github.com/Zoomelectrico/avilatek-graphql-api/blob/master/logo.png?raw=true" alt="Avila Tek Logo" height="150px">
</p>

La API REST de comercio electrónico es un servicio que facilita la gestión de usuarios, productos, pedidos y otras funcionalidades relacionadas con el comercio. Esta API proporciona endpoints para realizar operaciones como la creación, actualización, eliminación y consulta de usuarios, productos y pedidos. Con una arquitectura RESTful.

## Tabla de Contenido

- [1. Empezando a ejecutar el servicio](#1-empezando-a-ejecutar-el-servicio)
- [2. Dependencias](#2-dependencias)
- [3. Npm Scripts](#3-npm-scripts)
- [4. Documentación de endpoints](#4-documentación-de-endpoints)
- [5. Opciones de diseño y explicaciones](#5-opciones-de-diseño-y-explicaciones)
  - [5.1 Elecciones de diseño realizadas](#51-elecciones-de-diseño-realizadas)
  - [5.2 Motivos para seleccionar el sistema de base de datos](#52-motivos-para-seleccionar-el-sistema-de-base-de-datos)
- [6. Diagrama entidad relación](#6-diagrama-entidad-relación)

## 1. Empezando a ejecutar el servicio

Clonación de repositorio.

```bash
  git clone https://github.com/s-amuel-18/avilatek-prueba-tecnica.git <project_name>
  cd <project_name>
  npm install
```

Preparación de variables de entorno.

```bash
  mv .env.template .env
```

Para que el proyecto funcione debes introducir las credenciales de la base de datos PostgreSQL.

```txt
DB_USER=<USER>
DB_PASSWORD=<PASSWORD>
DB_NAME=<DB_NAME>
DB_PORT=<DB_PORT>
DB_HOST=<DB_HOST>
```

Para que las tablas se sincronicen correctamente debemos colocar "true" en las siguientes variables.

```txt
DB_SYNC=true
DB_FORCE_SYNC=true
```

Ejecutamos el comando siguiente comando para inicializar el servidor de desarrollo.

```bash
  npm run dev
```

IMPORTANTE: Si tienes algún error con respecto al paquete nodemon, puedes ejecutar el comando `npm install -g nodemon` para una instalación global en tu sistema.

NOTA: Podemos cambiar a "false" las variables de sincronización de tablas luego de que se creen todas las tablas necesarias.

Posteriormente ejecutamos una petición de tipo GET al endpoint `api/seeders/execute` para crear los registros necesarios en nuestra base de datos.

NOTA: Los Seeders los ejecuto de esa forma por practicidad, en un proyecto real sería más recomendable implementar un método más robusto y seguro.

## 2. Dependencias

Listado de dependencias del proyecto.

| devDependency | Dependencia          | Uso                                                              |
| ------------- | -------------------- | ---------------------------------------------------------------- |
| ❌            | bcryptjs             | Hashear contraseñas, para guardarlas en la DB                    |
| ❌            | cors                 | Activar CORS en el servidor                                      |
| ❌            | dotenv               | Agregar las variables de entorno                                 |
| ❌            | express              | Facilitar la creación de servidores con Node.js                  |
| ❌            | express-validator    | Ayuda a validar los campos                                       |
| ❌            | jsonwebtoken         | Ayuda en la generación de jwt para el flujo de auth              |
| ❌            | pg                   | Driver para interactuar con bases de datos PostgreSql            |
| ❌            | sequelize            | ORM para interactuar con bases de datos relacionales             |
| ❌            | sequelize-typescript | Ayuda a que sequelize tenga una mejor integración con TypeScript |
| ✔            | @types/\*            | Son paquetes que contienen los "tipos" de las librerías          |
| ✔            | prettier             | Para mantener una estética similar en el código                  |
| ✔            | ts-node              | Ayuda a ejercutar TypeScript en Node                             |
| ✔            | typescript           | Es el compilar de ts                                             |

## 3. Npm Scripts

Listado de Scripts necesarios para el funcionamiento del proyecto.

| Comando | Uso                                               |
| :-----: | ------------------------------------------------- |
|  start  | Ejecuta la version build de proyecto              |
|  build  | Compila el proyecto y hace un build de producción |
|   dev   | Ejecuta el servidor para desarrolladores          |

## 4. Documentación de endpoints

En el siguiente enlace podrás tener una documentación precisa de cada endpoint y como funciona.

[Documentación de servicio](https://documenter.getpostman.com/view/14681924/2sA358c5Kf)

## 5. Opciones de diseño y explicaciones

### 5.1 Elecciones de diseño realizadas

La API se ha diseñado siguiendo un enfoque modular, donde se han creado archivos de servicios para gestionar funciones reutilizables. Además, se ha implementado el patrón Modelo-Vista-Controlador (MVC) para una mejor organización y separación de responsabilidades.

### 5.2 Motivos para seleccionar el sistema de base de datos

La elección de PostgreSQL como gestor de base de datos para esta API se basó en varios motivos fundamentales:

- **Relaciones entre tablas**: PostgreSQL es conocido por su capacidad para gestionar eficientemente relaciones complejas entre tablas, lo que resulta fundamental para mantener la integridad de los datos y garantizar un diseño de base de datos robusto.

- **Familiaridad**: La familiaridad con PostgreSQL fue un factor determinante en la elección, ya que el conocimiento previo del sistema facilita el desarrollo y la administración de la base de datos, lo que puede traducirse en una mayor productividad y eficiencia.

Además, se optó por implementar Sequelize como ORM (Object-Relational Mapping) debido a las siguientes razones:

- **Facilidad de implementación**: Sequelize es conocido por ser fácil de implementar y utilizar, lo que agiliza el proceso de interacción con la base de datos y simplifica tareas como consultas, inserciones y actualizaciones de datos.

- **Interacción entre entidades**: Sequelize proporciona una capa de abstracción que facilita la interacción entre entidades y simplifica la escritura de consultas complejas, lo que resulta especialmente útil en un entorno de desarrollo basado en modelos relacionales.

## 6. Diagrama entidad relación

En el siguiente enlace encontrarás el diagrama entidad relación que se preparó para la construcción de la API

[Diagrama entidad relación](https://dbdiagram.io/d/65f83b08ae072629ce4b3f7f)
