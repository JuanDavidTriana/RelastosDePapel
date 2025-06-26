# Criterios de Aceptación - Búsqueda y Compra de Libros

## Caso de Uso: Buscar un libro y realizar una compra

### Descripción
Como usuario del sistema de Relatos de Papel, quiero poder buscar libros disponibles y realizar compras para poder adquirir los libros que me interesan.

### Criterios de Aceptación

#### 1. Búsqueda de Libros (GET /books)
**Dado que** el usuario accede al catálogo de libros
**Cuando** realiza una petición GET a `http://localhost:8081/books`
**Entonces** debe recibir una lista de todos los libros disponibles
**Y** la respuesta debe incluir:
- Código de estado HTTP 200
- Lista de libros con sus propiedades (id, título, autor, precio, etc.)
- Formato JSON válido

#### 2. Búsqueda de Libro Específico (GET /books/{id})
**Dado que** el usuario busca un libro específico
**Cuando** realiza una petición GET a `http://localhost:8081/books/1`
**Entonces** debe recibir los detalles del libro con ID 1
**Y** la respuesta debe incluir:
- Código de estado HTTP 200
- Información completa del libro solicitado
- Formato JSON válido

#### 3. Creación de Compra (POST /purchases)
**Dado que** el usuario selecciona un libro para comprar
**Cuando** realiza una petición POST a `http://localhost:8082/purchases`
**Entonces** debe crear una nueva compra en la base de datos
**Y** la respuesta debe incluir:
- Código de estado HTTP 201 (Created)
- Información de la compra creada
- ID único de la compra
- Confirmación de inserción en la base de datos

#### 4. Validación de Datos de Compra
**Dado que** el usuario proporciona datos de compra
**Cuando** se crea la compra
**Entonces** debe validar que:
- El book_id existe en el catálogo
- El customer_email tiene formato válido
- La quantity es mayor que 0
- El total_amount se calcula correctamente (precio * cantidad)
- El status se establece como "PENDING" por defecto

#### 5. Persistencia en Base de Datos
**Dado que** se crea una compra exitosamente
**Cuando** se ejecuta la consulta Hibernate
**Entonces** debe insertar en la tabla `purchases`:
```sql
insert into purchases (book_id, customer_email, purchase_date, quantity, status, total_amount) 
values (?, ?, ?, ?, ?, ?)
```

### Endpoints a Probar

1. **GET** `http://localhost:8081/books` - Listar todos los libros
2. **GET** `http://localhost:8081/books/1` - Obtener libro específico
3. **POST** `http://localhost:8082/purchases` - Crear nueva compra

### Datos de Prueba

#### Libro de Prueba
```json
{
  "id": 1,
  "title": "El Quijote",
  "author": "Miguel de Cervantes",
  "price": 25.99,
  "isbn": "978-84-376-0494-7"
}
```

#### Compra de Prueba
```json
{
  "bookId": 1,
  "customerEmail": "usuario@test.com",
  "quantity": 2,
  "totalAmount": 51.98
}
```

### Evidencia Requerida
- Capturas de pantalla de las respuestas HTTP
- Logs de la base de datos mostrando la inserción
- Reporte de ejecución de pruebas automatizadas
- Validación de códigos de estado HTTP
- Verificación de formato JSON en las respuestas 