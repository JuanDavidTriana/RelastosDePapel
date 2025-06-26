# Criterios de Aceptación - Pruebas Funcionales de Interfaz de Usuario (UI)

## 🎯 Objetivo
Verificar que la interfaz web permite la interacción completa del usuario con todas las funcionalidades principales de la aplicación Relastos de Papel.

## 📋 Casos de Uso Validados

### **1. Carga de Página Principal**
- **Escenario:** El usuario accede a la página principal
- **Criterio:** La página debe cargar correctamente con el título "Relastos de Papel"
- **Validación:** Verificar título de página y contenido visible

### **2. Navegación al Catálogo**
- **Escenario:** El usuario navega al catálogo de libros
- **Criterio:** Debe poder acceder a la página `/catalogo`
- **Validación:** URL correcta y título "Catálogo de Libros" visible

### **3. Búsqueda de Libros**
- **Escenario:** El usuario busca libros en el catálogo
- **Criterio:** Debe poder ingresar términos de búsqueda por título o autor
- **Validación:** Campo de búsqueda funcional y filtrado en tiempo real

### **4. Filtros de Precio**
- **Escenario:** El usuario filtra libros por rango de precio
- **Criterio:** Debe poder seleccionar filtros: Menos de $20, $20-$30, Más de $30
- **Validación:** Filtros aplicados correctamente y resultados actualizados

### **5. Ordenamiento de Libros**
- **Escenario:** El usuario ordena los libros del catálogo
- **Criterio:** Debe poder ordenar por: Título, Autor, Precio (ascendente/descendente)
- **Validación:** Ordenamiento aplicado correctamente

### **6. Formulario de Suscripción**
- **Escenario:** El usuario se suscribe al newsletter
- **Criterio:** Debe poder ingresar email en el formulario del footer
- **Validación:** Campo de email funcional y botón de suscripción visible

### **7. Navegación Entre Páginas**
- **Escenario:** El usuario navega entre diferentes secciones
- **Criterio:** Debe poder navegar entre: Inicio, Catálogo, Contacto
- **Validación:** Navegación fluida y URLs correctas

### **8. Carrito de Compras**
- **Escenario:** El usuario accede al carrito de compras
- **Criterio:** Debe poder abrir el drawer del carrito
- **Validación:** Drawer se abre correctamente y es visible

## 🔧 Configuración Técnica
- **Navegador automatizado:** Playwright
- **URL base:** `http://localhost:3000`
- **Framework:** React + Material-UI
- **Rutas principales:** `/`, `/catalogo`, `/contacto`, `/checkout`, `/historial`

## 🚀 Cómo Ejecutar las Pruebas

### **Comando Básico:**
```bash
cd FrontEnd-RelastosDePapel
npx playwright test
```

### **Con Interfaz Gráfica:**
```bash
cd FrontEnd-RelastosDePapel
npx playwright test --ui
```

### **Modo Debug:**
```bash
cd FrontEnd-RelastosDePapel
npx playwright test --debug
```

## 📊 Métricas de Éxito

### **Cobertura de Funcionalidad**
- ✅ **100% Navegación:** Todas las rutas principales
- ✅ **100% Búsqueda:** Campo de búsqueda funcional
- ✅ **100% Filtros:** Filtros de precio operativos
- ✅ **100% Ordenamiento:** Todas las opciones de ordenamiento
- ✅ **100% Formularios:** Formulario de suscripción
- ✅ **100% Carrito:** Funcionalidad del carrito

### **Criterios de Aceptación**
1. ✅ **Carga de Página:** Página principal carga correctamente
2. ✅ **Navegación:** Acceso al catálogo exitoso
3. ✅ **Búsqueda:** Campo de búsqueda funcional
4. ✅ **Filtros:** Filtros de precio aplicados
5. ✅ **Ordenamiento:** Ordenamiento de libros funcional
6. ✅ **Suscripción:** Formulario de newsletter operativo
7. ✅ **Navegación Completa:** Entre todas las páginas
8. ✅ **Carrito:** Drawer del carrito funcional

## 🎯 Resultado Esperado

Al completar todas las pruebas exitosamente:

```
✅ PRUEBAS FUNCIONALES EXITOSAS: 8/8 tests pasando
✅ Búsqueda de libros: Funcionando correctamente
✅ Filtros de precio: Funcionando correctamente
✅ Ordenamiento: Funcionando correctamente
✅ Navegación: Funcionando correctamente
✅ Formulario de suscripción: Funcionando correctamente
✅ Carrito de compras: Funcionando correctamente
✅ Interfaz de usuario: Completamente funcional
```

## 📁 Estructura de Archivos
```
test/funcional/
├── CRITERIOS_ACEPTACION.md     # Este archivo
├── README.md                   # Instrucciones detalladas
└── busqueda-libros.spec.ts     # Tests automatizados (en FrontEnd/tests/)
```

--- 