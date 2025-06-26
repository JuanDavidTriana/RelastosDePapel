# 🚀 Instrucciones Rápidas - Pruebas de Aceptación

## ⚡ Ejecución Rápida (3 pasos)

### 1. Verificar servicios corriendo
```bash
# Verificar que estos servicios estén activos:
# - Eureka Server (puerto 8761)
# - MS-Books-Catalogue (puerto 8081) 
# - MS-Books-Payments (puerto 8082)
# - PostgreSQL
```

### 2. Ejecutar pruebas
```bash
# Opción A: Desde el directorio del proyecto
cd BackEnd-RelatosDePapel/ms-books-catalogue
mvn clean test

# Opción B: Usando el script batch
.\test\validacion\run-validation-tests.bat
```

### 3. Verificar resultados
```
✅ Esperado: [INFO] Tests run: 6, Failures: 0, Errors: 0, Skipped: 0
✅ Esperado: [INFO] BUILD SUCCESS
```

## 🔧 Comandos Útiles

### Verificar servicios
```bash
# Eureka Server
curl http://localhost:8761

# Catálogo de libros
curl http://localhost:8081/books

# Servicio de pagos
curl http://localhost:8082/purchases
```

### Ejecutar pruebas específicas
```bash
# Solo pruebas de aceptación
mvn test -Dtest=BookSearchAndPurchaseTest

# Con debug
mvn test -Dtest=BookSearchAndPurchaseTest -X

# Una prueba específica
mvn test -Dtest=BookSearchAndPurchaseTest#testBusquedaLibros
```

### Limpiar y recompilar
```bash
mvn clean compile test
```

## 🐛 Problemas Comunes

### Error: "Unable to find a @SpringBootConfiguration"
```bash
mvn clean
mvn test
```

### Error: "Connection refused"
- Verificar que todos los servicios estén corriendo
- Verificar puertos: 8761, 8081, 8082

### Error: "Tests run: 7" en lugar de 6
```bash
mvn clean compile test
```

## 📊 Resultados Esperados

### Pruebas que se ejecutan:
1. ✅ Búsqueda de Libros (GET /books)
2. ✅ Búsqueda de Libro Específico (GET /books/1)
3. ✅ Creación de Compra (POST /purchases)
4. ✅ Validación de Datos
5. ✅ Persistencia en BD
6. ✅ Flujo Completo

### Salida exitosa:
```
[INFO] Tests run: 6, Failures: 0, Errors: 0, Skipped: 0
[INFO] BUILD SUCCESS
```

## 📞 Ayuda Rápida

Si tienes problemas:
1. `mvn clean` - Limpia archivos compilados
2. Verifica servicios corriendo
3. Revisa `target/surefire-reports/` para logs
4. Ejecuta con `-X` para debug: `mvn test -X` 