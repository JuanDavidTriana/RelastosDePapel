# Relatos de Papel - Backend

Este proyecto implementa una arquitectura de microservicios para una plataforma de venta de libros.

## Arquitectura

El proyecto está estructurado en los siguientes microservicios:

### 1. Eureka Server (eureka-server)
- **Puerto**: 8761
- **Función**: Servicio de descubrimiento y registro de microservicios
- **Características**:
  - Centraliza el registro de todos los microservicios
  - Permite el balanceo de carga
  - Facilita la comunicación entre servicios
- **URL**: http://localhost:8761

### 2. API Gateway (api-gateway)
- **Puerto**: 8080
- **Función**: Punto de entrada único para todas las peticiones
- **Características**:
  - Enruta las peticiones a los microservicios correspondientes
  - Implementa seguridad y validación de peticiones
  - Proporciona un único punto de acceso para los clientes
- **Endpoints**:
  - `/api/books/**` -> Servicio de Catálogo
  - `/api/payments/**` -> Servicio de Pagos

### 3. Servicio de Catálogo (ms-books-catalogue)
- **Puerto**: 8081
- **Función**: Gestión del catálogo de libros
- **Características**:
  - CRUD completo de libros
  - Búsqueda y filtrado de libros
  - Gestión de disponibilidad
- **Endpoints**:
  - `GET /books` - Listar libros
  - `GET /books/{id}` - Obtener libro por ID
  - `POST /books` - Crear libro
  - `PUT /books/{id}` - Actualizar libro
  - `DELETE /books/{id}` - Eliminar libro

### 4. Servicio de Pagos (ms-books-payments)
- **Puerto**: 8082
- **Función**: Gestión de compras y pagos
- **Características**:
  - Procesamiento de compras
  - Validación de disponibilidad
  - Cálculo de precios
- **Endpoints**:
  - `POST /purchases` - Crear una compra

## Base de Datos

El proyecto utiliza dos bases de datos MySQL:

1. **books_catalogue**
   - Almacena la información de los libros
   - Tablas: books

2. **books_payments**
   - Almacena la información de las compras
   - Tablas: purchases

## Cómo Levantar el Proyecto

1. **Iniciar Eureka Server**:
```bash
cd eureka-server
mvn spring-boot:run
```

2. **Iniciar API Gateway**:
```bash
cd api-gateway
mvn spring-boot:run
```

3. **Iniciar Servicio de Catálogo**:
```bash
cd ms-books-catalogue
mvn spring-boot:run
```

4. **Iniciar Servicio de Pagos**:
```bash
cd ms-books-payments
mvn spring-boot:run
```

## Pruebas de API

### Catálogo de Libros
```bash
# Listar todos los libros
GET http://localhost:8080/api/books

# Crear un libro
POST http://localhost:8080/api/books
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

# Obtener un libro específico
GET http://localhost:8080/api/books/1
```

### Pagos
```bash
# Crear una compra
POST http://localhost:8080/api/payments/purchases
Content-Type: application/json

{
    "bookId": 1,
    "quantity": 1,
    "customerEmail": "cliente@ejemplo.com"
}
```

## Tecnologías Utilizadas

- Java 17
- Spring Boot 3.2.3
- Spring Cloud 2023.0.0
- MySQL 8
- Maven
- Eureka Server
- Spring Cloud Gateway
- Spring Data JPA
- Spring Cloud OpenFeign

## Notas Importantes

1. Asegúrate de que MySQL esté corriendo y las bases de datos creadas
2. Los servicios deben iniciarse en el orden especificado
3. Verifica que todos los servicios estén registrados en Eureka antes de hacer peticiones
4. El API Gateway es el punto de entrada para todas las peticiones 