# Servicio de Catálogo de Libros

## Descripción
Microservicio encargado de la gestión del catálogo de libros, incluyendo operaciones CRUD y búsqueda.

## Características
- Gestión completa de libros (CRUD)
- Búsqueda y filtrado avanzado
- Validación de datos
- Integración con base de datos MySQL

## Configuración
- **Puerto**: 8081
- **Base de Datos**: MySQL (books_catalogue)
- **URL Base**: http://localhost:8081

## Endpoints

### Libros
- `GET /books` - Listar todos los libros
  - Parámetros de búsqueda:
    - title
    - author
    - category
    - isbn
    - rating
    - visibility
    - publicationDate
  - Paginación: page, size

- `GET /books/{id}` - Obtener libro por ID

- `POST /books` - Crear nuevo libro
  ```json
  {
      "title": "La casa de los espíritus",
      "author": "Isabel Allende",
      "publicationDate": "1982-01-01",
      "category": "Novela",
      "isbn": "9788497593797",
      "rating": 5,
      "visibility": true,
      "price": 22.99
  }
  ```

- `PUT /books/{id}` - Actualizar libro completo

- `PATCH /books/{id}` - Actualizar libro parcialmente

- `DELETE /books/{id}` - Eliminar libro

## Base de Datos
```sql
CREATE DATABASE IF NOT EXISTS books_catalogue;
```

## Cómo Levantar
```bash
cd ms-books-catalogue
mvn spring-boot:run
```

## Ejemplos de Uso

### Buscar Libros
```bash
# Buscar por título
GET http://localhost:8081/books?title=Quijote

# Buscar por categoría
GET http://localhost:8081/books?category=Novela

# Buscar por autor
GET http://localhost:8081/books?author=Gabriel García Márquez
```

### Crear Libro
```bash
POST http://localhost:8081/books
Content-Type: application/json

{
    "title": "La casa de los espíritus",
    "author": "Isabel Allende",
    "publicationDate": "1982-01-01",
    "category": "Novela",
    "isbn": "9788497593797",
    "rating": 5,
    "visibility": true,
    "price": 22.99
}
```

## Notas
- Requiere MySQL instalado y configurado
- Se registra automáticamente en Eureka
- Implementa validación de datos
- Soporta paginación en las búsquedas 