# Pruebas Funcionales de Interfaz de Usuario (UI)

Esta carpeta contiene las pruebas automatizadas de interacción con la interfaz web usando Playwright.

## 🚀 Cómo Ejecutar las Pruebas Funcionales

### **Requisitos Previos**
- Node.js y npm instalados
- Dependencias instaladas (`npm install` en la carpeta del frontend)
- La aplicación frontend debe estar corriendo en `http://localhost:3000/`

### **Pasos para Ejecutar**

#### **1. Iniciar el Frontend (si no está corriendo)**
```bash
cd FrontEnd-RelastosDePapel
npm run dev
```

#### **2. Ejecutar las Pruebas**

**Opción A: Comando básico**
```bash
cd FrontEnd-RelastosDePapel
npx playwright test
```

**Opción B: Usando script de npm**
```bash
cd FrontEnd-RelastosDePapel
npm run test:e2e
```

**Opción C: Con interfaz gráfica (recomendado)**
```bash
cd FrontEnd-RelastosDePapel
npx playwright test --ui
```

#### **3. Comandos Específicos**

**Ejecutar solo las pruebas funcionales:**
```bash
npx playwright test tests/busqueda-libros.spec.ts
```

**Ejecutar con reporte detallado:**
```bash
npx playwright test --reporter=list
```

**Ejecutar en modo debug (pausa en cada paso):**
```bash
npx playwright test --debug
```

**Ejecutar con timeout extendido:**
```bash
npx playwright test --timeout=60000
```

### **Funcionalidades Validadas**

✅ **Búsqueda de libros** - Campo de búsqueda por título o autor  
✅ **Filtros de precio** - Menos de $20, $20-$30, Más de $30  
✅ **Ordenamiento** - Por título, autor, precio ascendente/descendente  
✅ **Navegación** - Entre páginas (Inicio, Catálogo, Contacto)  
✅ **Formulario de suscripción** - En el footer  
✅ **Carrito de compras** - Apertura del drawer del carrito  

### **Resultados Esperados**

Al ejecutar correctamente deberías ver:
```
Running 8 tests using 1 worker

  ✓  1 › Pruebas Funcionales de UI - Relastos de Papel › La página principal carga correctamente
  ✓  2 › Pruebas Funcionales de UI - Relastos de Papel › Navegar al catálogo de libros
  ✓  3 › Pruebas Funcionales de UI - Relastos de Papel › Búsqueda de libros en el catálogo
  ✓  4 › Pruebas Funcionales de UI - Relastos de Papel › Filtros de precio en el catálogo
  ✓  5 › Pruebas Funcionales de UI - Relastos de Papel › Ordenamiento de libros en el catálogo
  ✓  6 › Pruebas Funcionales de UI - Relastos de Papel › Formulario de suscripción en el footer
  ✓  7 › Pruebas Funcionales de UI - Relastos de Papel › Navegación entre páginas
  ✓  8 › Pruebas Funcionales de UI - Relastos de Papel › Carrito de compras

  8 passed (14.9s)
```

### **Archivos de Resultados**

Los resultados se guardan en:
- `test-results/` - Screenshots y reportes de errores
- `playwright-report/` - Reporte HTML detallado (se abre automáticamente)

### **Solución de Problemas**

**Error: "No tests found"**
- Verifica que estés en la carpeta correcta: `FrontEnd-RelastosDePapel`
- Verifica que el archivo `tests/busqueda-libros.spec.ts` existe

**Error: "Connection refused"**
- Asegúrate de que el frontend esté corriendo en `http://localhost:3000/`
- Ejecuta `npm run dev` primero

**Error: "Element not found"**
- Verifica que la aplicación esté completamente cargada
- Usa `--debug` para ver paso a paso qué está pasando

### **Notas Importantes**

- Las pruebas NO afectan datos de producción
- Se ejecutan en un navegador automatizado
- Toman screenshots automáticamente en caso de error
- El tiempo total de ejecución es aproximadamente 15 segundos 