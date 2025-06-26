# Servicio de Pagos

## Descripción
Microservicio encargado de la gestión de compras y pagos de libros, incluyendo validación de disponibilidad y cálculo de precios.

## Características
- Procesamiento de compras
- Validación de disponibilidad de libros
- Cálculo automático de precios
- Integración con el servicio de catálogo
- Base de datos MySQL para persistencia

## Configuración
- **Puerto**: 8082
- **Base de Datos**: MySQL (books_payments)
- **URL Base**: http://localhost:8082

## Endpoints

### Compras
- `POST /purchases` - Crear una nueva compra
  ```json
  {
      "bookId": 1,
      "quantity": 1,
      "customerEmail": "cliente@ejemplo.com"
  }
  ```

## Base de Datos
```sql
CREATE DATABASE IF NOT EXISTS books_payments;
```

## Cómo Levantar
```bash
cd ms-books-payments
mvn spring-boot:run
```

## Ejemplos de Uso

### Crear una Compra
```bash
POST http://localhost:8082/purchases
Content-Type: application/json

{
    "bookId": 1,
    "quantity": 1,
    "customerEmail": "cliente@ejemplo.com"
}
```

### Respuesta Exitosa
```json
{
    "id": 1,
    "bookId": 1,
    "purchaseDate": "2024-03-21T10:30:00",
    "quantity": 1,
    "totalAmount": 19.99,
    "customerEmail": "cliente@ejemplo.com",
    "status": "CONFIRMED"
}
```

## Estados de Compra
- PENDING: Compra en proceso
- CONFIRMED: Compra confirmada
- CANCELLED: Compra cancelada
- FAILED: Compra fallida

## Notas
- Requiere MySQL instalado y configurado
- Se registra automáticamente en Eureka
- Depende del servicio de catálogo para validar libros
- Implementa validación de datos
- Calcula automáticamente el precio total 