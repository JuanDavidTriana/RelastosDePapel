# Criterios de Aceptación - Pruebas de Sistema (Back-end)

## 🎯 Objetivo
Verificar que las interfaces REST del back-end funcionan correctamente implementando un flujo completo CRUD (Create, Read, Update, Delete) para la entidad **Book**.

## 📋 Caso de Uso: Gestión Completa de Libros

### **Entidad Objetivo:** Book (Libro)
- **Endpoint Base:** `http://localhost:8081/books`
- **Métodos HTTP:** GET, POST, PUT, DELETE
- **Formato de Datos:** JSON

## 🔄 Flujo CRUD Completo

### **1. Verificación de Estado Inicial**
- **Acción:** Verificar que el libro de prueba no existe
- **Endpoint:** `GET /books/{id}`
- **Criterio:** Debe devolver 404 Not Found
- **Validación:** Confirmar que el libro con ID específico no existe

### **2. Creación de Entidad (CREATE)**
- **Acción:** Crear un nuevo libro
- **Endpoint:** `POST /books`
- **Criterio:** Debe devolver 201 Created
- **Datos de Prueba:**
  ```json
  {
    "title": "Libro de Prueba Sistema",
    "author": "Autor de Prueba",
    "publicationDate": "2025-06-26",
    "category": "Pruebas",
    "isbn": "978-1234567890",
    "rating": 5,
    "visibility": true,
    "price": 29.99,
    "coverImage": "https://ejemplo.com/imagen.jpg",
    "description": "Libro creado para pruebas de sistema"
  }
  ```
- **Validación:** 
  - Código de estado 201
  - Respuesta JSON con ID asignado
  - Datos correctos en la respuesta

### **3. Verificación de Creación (READ)**
- **Acción:** Obtener el libro recién creado
- **Endpoint:** `GET /books/{id}`
- **Criterio:** Debe devolver 200 OK
- **Validación:**
  - Código de estado 200
  - Datos coinciden con los enviados
  - ID correcto en la respuesta

### **4. Actualización de Entidad (UPDATE)**
- **Acción:** Modificar el libro existente
- **Endpoint:** `PUT /books/{id}`
- **Criterio:** Debe devolver 200 OK
- **Datos de Actualización:**
  ```json
  {
    "title": "Libro de Prueba Sistema - ACTUALIZADO",
    "author": "Autor de Prueba - MODIFICADO",
    "publicationDate": "2025-06-26",
    "category": "Pruebas Actualizadas",
    "isbn": "978-1234567890",
    "rating": 4,
    "visibility": true,
    "price": 34.99,
    "coverImage": "https://ejemplo.com/imagen-actualizada.jpg",
    "description": "Libro actualizado para pruebas de sistema"
  }
  ```
- **Validación:**
  - Código de estado 200
  - Datos actualizados correctamente
  - Respuesta JSON con datos modificados

### **5. Verificación de Actualización (READ)**
- **Acción:** Obtener el libro actualizado
- **Endpoint:** `GET /books/{id}`
- **Criterio:** Debe devolver 200 OK
- **Validación:**
  - Código de estado 200
  - Datos coinciden con la actualización
  - Cambios aplicados correctamente

### **6. Eliminación de Entidad (DELETE)**
- **Acción:** Eliminar el libro
- **Endpoint:** `DELETE /books/{id}`
- **Criterio:** Debe devolver 204 No Content
- **Validación:**
  - Código de estado 204
  - Sin contenido en la respuesta
  - Confirmación de eliminación

### **7. Verificación de Eliminación (READ)**
- **Acción:** Intentar obtener el libro eliminado
- **Endpoint:** `GET /books/{id}`
- **Criterio:** Debe devolver 404 Not Found
- **Validación:**
  - Código de estado 404
  - Confirmación de que el libro no existe

## 🔍 Criterios de Validación Específicos

### **Códigos de Estado HTTP**
- **200 OK:** Operaciones GET y PUT exitosas
- **201 Created:** Creación exitosa
- **204 No Content:** Eliminación exitosa
- **404 Not Found:** Recurso no encontrado
- **400 Bad Request:** Datos inválidos
- **500 Internal Server Error:** Error del servidor

### **Validación de Datos**
- **Campos Obligatorios:** title, author, isbn, price
- **Tipos de Datos:** String, Date, Boolean, Double, Integer
- **Formato de Fecha:** ISO 8601 (YYYY-MM-DD)
- **ISBN:** Formato válido (978-XXXXXXXXXX)
- **Precio:** Número positivo
- **Rating:** Entero entre 1 y 5

### **Validación de Respuestas JSON**
- **Estructura:** Campos correctos y tipos de datos
- **ID:** Asignado automáticamente por el sistema
- **Timestamps:** Fechas de creación/actualización
- **Consistencia:** Datos enviados = datos recibidos

## 🧪 Casos de Prueba Adicionales

### **Caso 1: Datos Inválidos**
- **Escenario:** Enviar datos incompletos o mal formateados
- **Criterio:** Debe devolver 400 Bad Request
- **Validación:** Mensaje de error descriptivo

### **Caso 2: ID Inexistente**
- **Escenario:** Operaciones con ID que no existe
- **Criterio:** Debe devolver 404 Not Found
- **Validación:** Respuesta consistente

### **Caso 3: Eliminación de Recurso Inexistente**
- **Escenario:** Eliminar libro que ya no existe
- **Criterio:** Debe devolver 404 Not Found
- **Validación:** Manejo correcto del error

## 📊 Métricas de Éxito

### **Cobertura de Funcionalidad**
- ✅ **100% CRUD:** Create, Read, Update, Delete
- ✅ **100% Códigos de Estado:** Todos los códigos HTTP válidos
- ✅ **100% Validación:** Datos de entrada y salida
- ✅ **100% Manejo de Errores:** Casos de error cubiertos

### **Criterios de Aceptación**
1. ✅ **Verificación Inicial:** Libro no existe (404)
2. ✅ **Creación:** Libro creado exitosamente (201)
3. ✅ **Lectura Post-Creación:** Datos correctos (200)
4. ✅ **Actualización:** Libro modificado (200)
5. ✅ **Lectura Post-Actualización:** Cambios aplicados (200)
6. ✅ **Eliminación:** Libro eliminado (204)
7. ✅ **Verificación Final:** Libro no existe (404)

## 🎯 Resultado Esperado

Al completar todas las pruebas exitosamente:

```
✅ PRUEBA DE SISTEMA EXITOSA: Flujo CRUD completo validado
✅ CREATE: Libro creado correctamente
✅ READ: Datos recuperados correctamente
✅ UPDATE: Libro actualizado correctamente
✅ DELETE: Libro eliminado correctamente
✅ VALIDACIÓN: Todos los códigos de estado correctos
✅ PERSISTENCIA: Datos guardados y recuperados correctamente
```

## 🔧 Configuración Técnica

### **Entorno de Pruebas**
- **Servidor:** Spring Boot en puerto 8081
- **Base de Datos:** PostgreSQL
- **Framework de Pruebas:** JUnit 5 + Spring Boot Test
- **Cliente HTTP:** TestRestTemplate
- **Formato:** JSON

### **Datos de Prueba**
- **ID de Prueba:** Generado automáticamente
- **ISBN Único:** 978-1234567890
- **Título Único:** "Libro de Prueba Sistema"
- **Autor Único:** "Autor de Prueba"

### **Limpieza de Datos**
- Las pruebas deben limpiar los datos creados
- No deben afectar datos existentes en producción
- Uso de transacciones para rollback automático 

## 🚦 Cómo ejecutar las pruebas de sistema

### Requisitos previos
- Tener Java 17 o superior instalado
- Tener Maven instalado y configurado en el PATH
- La base de datos PostgreSQL debe estar corriendo y accesible con los datos de conexión configurados en la aplicación
- El microservicio `ms-books-catalogue` debe estar detenido (Maven levantará el contexto de pruebas automáticamente)

### Pasos para ejecutar las pruebas

1. Abre una terminal y navega al directorio del microservicio:
   ```sh
   cd BackEnd-RelatosDePapel/ms-books-catalogue
   ```

2. Ejecuta el siguiente comando para limpiar y correr solo las pruebas de sistema:
   ```sh
   mvn clean test -Dtest=BookSystemTest
   ```

3. Espera a que finalicen las pruebas. Si todo es correcto, verás un resumen como:
   ```
   [INFO] Results:
   [INFO] Tests run: 4, Failures: 0, Errors: 0, Skipped: 0
   [INFO] BUILD SUCCESS
   ```

### Notas
- Si necesitas ver más detalles de la ejecución, puedes revisar la salida de la terminal o los reportes en `target/surefire-reports/`.
- Si alguna prueba falla, revisa los mensajes de error para identificar el criterio no cumplido.
- Las pruebas NO afectan datos de producción, ya que usan transacciones y rollback automático. 