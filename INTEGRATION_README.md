# Integración Backend-Frontend - Relatos de Papel

## Descripción
Este documento describe la integración completa entre el backend (microservicios Spring Boot) y el frontend (React + TypeScript) para la aplicación "Relatos de Papel".

## Arquitectura

### Backend (Microservicios)
- **Eureka Server** (Puerto 8761): Servicio de descubrimiento
- **API Gateway** (Puerto 8080): Gateway principal con CORS configurado
- **Books Catalogue Service** (Puerto 8081): Gestión de libros
- **Books Payments Service** (Puerto 8082): Gestión de compras

### Frontend
- **React + TypeScript** (Puerto 5173): Aplicación web
- **Material-UI**: Componentes de interfaz
- **Axios**: Cliente HTTP para comunicación con API

## Configuración Realizada

### 1. API Gateway
- Configurado CORS para permitir peticiones desde el frontend
- Rutas configuradas para redirigir a los microservicios:
  - `/api/books/**` → `ms-books-catalogue`
  - `/api/purchases/**` → `ms-books-payments`

### 2. Frontend
- URL base del API actualizada a `http://localhost:8080/api`
- Tipos actualizados para coincidir con el modelo del backend
- Nuevo hook `usePurchases` para manejar compras
- Carrito actualizado para integrar con el backend

### 3. Tipos de Datos
Los tipos del frontend han sido actualizados para coincidir con el modelo del backend:

```typescript
interface Book {
  id: number;
  title: string;
  author: string;
  publicationDate: string;
  category: string;
  isbn: string;
  rating?: number;
  visibility?: boolean;
  price: number;
  stock?: number;
  description?: string;
  coverImage?: string;
}
```

## Instrucciones de Uso

### 1. Preparación de la Base de Datos
```sql
-- Ejecutar el script de creación de bases de datos
mysql -u root -p < BackEnd-RelatosDePapel/create_databases.sql
```

### 2. Insertar Datos de Ejemplo
```bash
# Navegar al directorio del backend
cd BackEnd-RelatosDePapel

# Ejecutar el script de inserción de datos
insert-sample-data.bat

# O manualmente:
mysql -u root -padmin < insert-sample-data.sql
```

### 3. Iniciar Backend
```bash
# Navegar al directorio del backend
cd BackEnd-RelatosDePapel

# Ejecutar el script de inicio (Windows)
.\start-services.bat

# O manualmente:
# 1. Eureka Server
cd eureka-server && mvn spring-boot:run

# 2. Books Catalogue Service
cd ms-books-catalogue && mvn spring-boot:run

# 3. Books Payments Service
cd ms-books-payments && mvn spring-boot:run

# 4. API Gateway
cd api-gateway && mvn spring-boot:run
```

### 4. Iniciar Frontend
```bash
# Navegar al directorio del frontend
cd FrontEnd-RelastosDePapel

# Ejecutar el script de inicio (Windows)
.\start-frontend.bat

# O manualmente:
npm install
npm run dev
```

## Endpoints Disponibles

### Libros (a través del API Gateway)
- `GET /api/books` - Obtener todos los libros
- `GET /api/books/{id}` - Obtener libro por ID
- `POST /api/books` - Crear nuevo libro
- `PUT /api/books/{id}` - Actualizar libro
- `DELETE /api/books/{id}` - Eliminar libro

### Compras (a través del API Gateway)
- `POST /api/purchases` - Crear nueva compra

## Funcionalidades Integradas

### 1. Catálogo de Libros
- Listado de libros desde el backend
- Filtrado y búsqueda
- Visualización de detalles (título, autor, categoría, rating, precio)

### 2. Carrito de Compras
- Agregar/remover libros
- Actualizar cantidades
- Cálculo automático del total

### 3. Proceso de Checkout
- Formulario de dirección de envío
- Selección de método de pago
- Integración con el servicio de pagos del backend
- Historial de compras local

### 4. Gestión de Estado
- Context API para el carrito
- Hooks personalizados para libros y compras
- Persistencia local del historial

## Estructura de Archivos Modificados

### Backend
- `api-gateway/src/main/resources/application.yml` - Configuración de rutas y CORS
- `ms-books-catalogue/src/main/java/.../BookController.java` - Endpoints de libros
- `ms-books-payments/src/main/java/.../PurchaseController.java` - Endpoints de compras
- `insert-sample-data.sql` - Datos de ejemplo
- `insert-sample-data.bat` - Script para insertar datos

### Frontend
- `src/services/api.ts` - Configuración del cliente HTTP
- `src/types/index.ts` - Tipos actualizados
- `src/hooks/useBooks.ts` - Hook para gestión de libros
- `src/hooks/useCart.tsx` - Hook del carrito actualizado
- `src/hooks/usePurchases.ts` - Nuevo hook para compras
- `src/components/common/BookCard.tsx` - Componente actualizado
- `src/components/BookCatalog.tsx` - Componente actualizado
- `src/pages/CatalogPage.tsx` - Página de catálogo integrada
- `src/pages/CheckoutPage.tsx` - Página de checkout integrada
- `env.example` - Variables de entorno de ejemplo

## Verificación de la Integración

### 1. Verificar Servicios Backend
- Eureka Server: http://localhost:8761
- API Gateway: http://localhost:8080
- Books Catalogue: http://localhost:8081/books
- Books Payments: http://localhost:8082/purchases

### 2. Verificar Frontend
- Aplicación: http://localhost:5173
- Verificar que los libros se cargan desde el backend
- Probar el proceso de compra completo

### 3. Verificar CORS
- Las peticiones desde el frontend deben llegar correctamente al backend
- No deben aparecer errores de CORS en la consola del navegador

### 4. Verificar Datos
```bash
# Verificar que hay libros en la base de datos
mysql -u root -padmin -e "USE books_catalogue; SELECT COUNT(*) as total_books FROM books;"
```

## Troubleshooting

### Problemas Comunes

1. **Error de CORS**
   - Verificar que el API Gateway esté ejecutándose en el puerto 8080
   - Verificar la configuración de CORS en `application.yml`

2. **Servicios no se registran en Eureka**
   - Verificar que Eureka Server esté ejecutándose primero
   - Verificar las configuraciones de Eureka en cada microservicio

3. **Frontend no puede conectar con el backend**
   - Verificar que la URL en `api.ts` sea correcta
   - Verificar que todos los servicios estén ejecutándose

4. **Errores de base de datos**
   - Verificar que MySQL esté ejecutándose
   - Verificar las credenciales en `application.properties`

5. **No se ven libros en el catálogo**
   - Verificar que se hayan insertado los datos de ejemplo
   - Ejecutar: `cd BackEnd-RelatosDePapel && insert-sample-data.bat`
   - Verificar que el servicio de libros esté funcionando

6. **Error "process is not defined"**
   - Verificar que el archivo `.env` existe en el frontend
   - Ejecutar: `cd FrontEnd-RelastosDePapel && .\setup-env.bat`

## Próximos Pasos

1. **Autenticación**: Implementar sistema de autenticación JWT
2. **Validación**: Agregar validaciones más robustas en el frontend
3. **Testing**: Implementar tests unitarios y de integración
4. **Deployment**: Configurar para producción
5. **Monitoreo**: Agregar logging y métricas 