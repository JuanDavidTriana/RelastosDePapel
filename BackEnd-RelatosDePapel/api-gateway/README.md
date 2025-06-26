# API Gateway

## Descripción
Punto de entrada único para todas las peticiones externas, encargado de enrutar las peticiones a los microservicios correspondientes.

## Características
- Enrutamiento de peticiones
- Balanceo de carga
- Validación de peticiones
- Punto de entrada único para clientes

## Configuración
- **Puerto**: 8080
- **URL Base**: http://localhost:8080

## Endpoints Configurados

### Catálogo de Libros
- `GET /api/books` - Listar todos los libros
- `GET /api/books/{id}` - Obtener libro por ID
- `POST /api/books` - Crear nuevo libro
- `PUT /api/books/{id}` - Actualizar libro
- `DELETE /api/books/{id}` - Eliminar libro

### Pagos
- `POST /api/payments/purchases` - Crear una compra

## Cómo Levantar
```bash
cd api-gateway
mvn spring-boot:run
```

## Ejemplos de Uso

### Crear un Libro
```bash
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
```

### Crear una Compra
```bash
POST http://localhost:8080/api/payments/purchases
Content-Type: application/json

{
    "bookId": 1,
    "quantity": 1,
    "customerEmail": "cliente@ejemplo.com"
}
```

## Notas
- Debe iniciarse después del Eureka Server
- Todas las peticiones deben pasar por este gateway
- Implementa el patrón de enrutamiento para los microservicios 