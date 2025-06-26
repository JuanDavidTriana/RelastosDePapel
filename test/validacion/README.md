# Pruebas de Aceptación - Búsqueda de Libros y Compra

Este directorio contiene las pruebas de aceptación automatizadas para validar el caso de uso **"Buscar un libro y hacer una compra"**.

## 📋 Criterios de Aceptación

Los criterios detallados se encuentran en [CRITERIOS_ACEPTACION.md](./CRITERIOS_ACEPTACION.md).

## 🚀 Cómo Ejecutar las Pruebas

### **Prerrequisitos**

Antes de ejecutar las pruebas, asegúrate de que estos servicios estén corriendo:

1. **Eureka Server** (puerto 8761)
2. **MS-Books-Catalogue** (puerto 8081) 
3. **MS-Books-Payments** (puerto 8082)
4. **Base de datos PostgreSQL**

### **Opción 1: Ejecutar desde el directorio del proyecto (Recomendado)**

```bash
# Navegar al directorio del microservicio de catálogo
cd BackEnd-RelatosDePapel/ms-books-catalogue

# Limpiar el proyecto (importante para evitar archivos duplicados)
mvn clean

# Ejecutar las pruebas de aceptación
mvn test
```

### **Opción 2: Ejecutar usando el script batch**

```bash
# Desde el directorio raíz del proyecto
cd "Nueva carpeta"

# Ejecutar el script de validación
.\test\validacion\run-validation-tests.bat
```

### **Opción 3: Ejecutar pruebas específicas**

```bash
# Ejecutar solo las pruebas de aceptación
mvn test -Dtest=BookSearchAndPurchaseTest

# Ejecutar con modo debug para más detalles
mvn test -Dtest=BookSearchAndPurchaseTest -X
```

## 📊 Resultados Esperados

### **Pruebas que se ejecutan:**

1. **Búsqueda de Libros** - GET `/books`
2. **Búsqueda de Libro Específico** - GET `/books/{id}`
3. **Creación de Compra** - POST `/purchases`
4. **Validación de Datos** - Validaciones de email, cantidad, bookId
5. **Persistencia en BD** - Verificación de datos guardados
6. **Flujo Completo** - Integración end-to-end

### **Salida esperada:**

```
[INFO] Tests run: 6, Failures: 0, Errors: 0, Skipped: 0
[INFO] BUILD SUCCESS
```

## 🔧 Estructura del Proyecto

```
BackEnd-RelatosDePapel/
├── ms-books-catalogue/
│   ├── src/
│   │   └── test/
│   │       └── java/
│   │           └── com/
│   │               └── relatosdepapel/
│   │                   └── books/
│   │                       └── acceptance/
│   │                           └── BookSearchAndPurchaseTest.java  ← Pruebas aquí
│   └── pom.xml
├── ms-books-payments/
└── eureka-server/
```

## 🛠️ Solución de Problemas

### **Error: "Unable to find a @SpringBootConfiguration"**

Si ves este error, significa que hay archivos compilados duplicados:

```bash
# Solución: Limpiar el proyecto
mvn clean
mvn test
```

### **Error: "Connection refused"**

Si los servicios no están corriendo:

1. Verifica que Eureka Server esté en puerto 8761
2. Verifica que MS-Books-Catalogue esté en puerto 8081
3. Verifica que MS-Books-Payments esté en puerto 8082
4. Verifica que PostgreSQL esté corriendo

### **Error: "Tests run: 7" en lugar de 6**

Esto indica archivos duplicados:

```bash
# Limpiar y recompilar
mvn clean compile test
```

## 📝 Logs y Debugging

### **Ver logs detallados:**

```bash
mvn test -X
```

### **Ejecutar una prueba específica:**

```bash
mvn test -Dtest=BookSearchAndPurchaseTest#testBusquedaLibros
```

### **Ver reportes de pruebas:**

Los reportes se generan en: `target/surefire-reports/`

## ✅ Validación Manual

También puedes validar manualmente los endpoints:

```bash
# Buscar todos los libros
curl http://localhost:8081/books

# Buscar libro específico
curl http://localhost:8081/books/1

# Crear compra
curl -X POST http://localhost:8082/purchases \
  -H "Content-Type: application/json" \
  -d '{"bookId":1,"quantity":2,"totalAmount":51.98,"customerEmail":"usuario@test.com"}'
```

## 🎯 Criterios de Éxito

Las pruebas se consideran **exitosas** cuando:

- ✅ Todas las 6 pruebas pasan
- ✅ Los servicios están conectados correctamente
- ✅ La base de datos responde
- ✅ Las APIs devuelven los códigos de estado esperados
- ✅ Los datos se persisten correctamente

## 📞 Soporte

Si tienes problemas:

1. Verifica que todos los servicios estén corriendo
2. Ejecuta `mvn clean` antes de las pruebas
3. Revisa los logs en `target/surefire-reports/`
4. Verifica la conectividad de la base de datos