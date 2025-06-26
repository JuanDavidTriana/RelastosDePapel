# Pruebas de Carga - Requisitos No Funcionales

Esta carpeta contiene las pruebas automatizadas de carga usando Locust para verificar que el sistema cumple con los requisitos de rendimiento.

## 🎯 Objetivo

Verificar que el sistema soporta **10,000 usuarios concurrentes** con un **tiempo de respuesta máximo de 2 segundos**.

## 📋 Requisitos

### **Requisitos Previos**
- Python 3.8 o superior
- Locust instalado (`pip install locust`)
- Servicios backend corriendo:
  - API Gateway (puerto 8080)
  - ms-books-catalogue (puerto 8081)
  - ms-books-payments (puerto 8082)
- Base de datos PostgreSQL configurada y accesible

### **Instalación de Locust**
```bash
# Instalar Locust
pip install locust

# Verificar instalación
locust --version
```

## 🚀 Cómo Ejecutar las Pruebas de Carga

### **1. Preparación del Entorno**

**Asegúrate de que los servicios estén corriendo:**
```bash
# Verificar que el API Gateway esté disponible
curl http://localhost:8080/api/books
```

### **2. Ejecutar Pruebas de Carga**

#### **🌐 Opción A: Interfaz Web (Recomendada)**

**Paso 1: Navegar al directorio correcto**
```bash
cd test/carga
```

**Paso 2: Ejecutar Locust en modo web**
```bash
locust -f locustfile.py --host=http://localhost:8080
```

**Paso 3: Acceder a la interfaz web**
- Abre tu navegador
- Ve a: **http://localhost:8089**

**Paso 4: Configurar la prueba**
En la interfaz web verás:
- **Number of users**: Número de usuarios concurrentes (ej: 100)
- **Spawn rate**: Usuarios por segundo (ej: 10)
- **Host**: `http://localhost:8080` (ya configurado)

**Paso 5: Iniciar la prueba**
- Haz clic en **"Start swarming"**

#### **📊 Características de la Interfaz Web**

**Dashboard Principal:**
- **Gráficos en tiempo real** de requests por segundo
- **Tiempos de respuesta** (promedio, mediana, percentiles)
- **Tasa de errores** en tiempo real
- **Número de usuarios activos**

**Pestañas Disponibles:**
1. **Charts**: Gráficos de rendimiento interactivos
2. **Statistics**: Estadísticas detalladas por endpoint
3. **Failures**: Errores (si los hay)
4. **Exceptions**: Excepciones del sistema
5. **Download Data**: Descargar resultados en CSV/HTML

**Controles de la Prueba:**
- **Stop**: Detener la prueba
- **Reset Stats**: Reiniciar estadísticas
- **Download Report**: Descargar reporte HTML completo

#### **⚡ Opción B: Comando Básico (Headless)**
```bash
cd test/carga
locust -f locustfile.py --host=http://localhost:8080 --users=100 --spawn-rate=10 --run-time=2m --headless
```

#### **⚙️ Opción C: Con Configuración Específica**
```bash
cd test/carga
locust -f locustfile.py \
  --host=http://localhost:8080 \
  --users=10000 \
  --spawn-rate=100 \
  --run-time=10m \
  --headless
```

#### **🎯 Opción D: Ejecutar Directamente**
```bash
cd test/carga
python locustfile.py
```

### **3. Comandos Avanzados**

**Prueba con menos usuarios (para desarrollo):**
```bash
locust -f locustfile.py --host=http://localhost:8080 --users=100 --spawn-rate=10 --run-time=2m --headless
```

**Prueba con configuración personalizada:**
```bash
locust -f locustfile.py \
  --host=http://localhost:8080 \
  --users=5000 \
  --spawn-rate=50 \
  --run-time=5m \
  --headless \
  --html=test-results/load-test-report.html \
  --csv=test-results/load-test-results
```

**Ejecutar en modo distribuido (múltiples máquinas):**
```bash
# Máquina principal (master)
locust -f locustfile.py --host=http://localhost:8080 --master

# Máquinas esclavas (workers)
locust -f locustfile.py --host=http://localhost:8080 --worker
```

## 📊 Escenarios de Prueba

### **Distribución de Carga**
- **40%** - Consulta de catálogo completo (`GET /api/books`)
- **35%** - Búsqueda de libros (`GET /api/books?title={term}`)
- **20%** - Consulta de libro específico (`GET /api/books/{id}`)
- **5%** - Creación de compra (`POST /api/purchases`)
- **1%** - Health check (`GET /actuator/health`)

### **Términos de Búsqueda Simulados**
- "libro", "autor", "novela", "historia", "fantasía"
- "romance", "misterio", "ciencia ficción", "poesía", "ensayo"
- "clásico", "moderno", "infantil", "juvenil", "adulto"

## 📈 Métricas Esperadas

### **Criterios de Éxito**
- ✅ **Usuarios Concurrentes:** 10,000 usuarios simultáneos
- ✅ **Tiempo de Respuesta:** ≤ 2 segundos por petición
- ✅ **Tasa de Error:** ≤ 1% (99% de éxito)
- ✅ **RPS:** ≥ 5,000 requests por segundo
- ✅ **Estabilidad:** Sin degradación durante 10 minutos

### **Métricas de Rendimiento**
- **Tiempo de Respuesta Promedio:** ≤ 1 segundo
- **Tiempo de Respuesta P95:** ≤ 1.5 segundos
- **Tiempo de Respuesta P99:** ≤ 2 segundos
- **Throughput:** ≥ 5,000 RPS

## 📁 Archivos de Resultados

Los resultados se guardan en:
- `test-results/load-test-report.html` - Reporte HTML detallado
- `test-results/load-test-results.csv` - Datos en formato CSV
- `test-results/load-test-results_stats.csv` - Estadísticas detalladas
- `test-results/load-test-results_stats_history.csv` - Historial de métricas

## 🔧 Configuración Avanzada

### **Modificar Configuración**
Edita `locustfile.py` para cambiar:
- Número de usuarios
- Tiempo de ejecución
- Distribución de tareas
- Timeouts
- Endpoints

### **Variables de Entorno**
```bash
export LOCUST_HOST=http://localhost:8080
export LOCUST_USERS=10000
export LOCUST_SPAWN_RATE=100
export LOCUST_RUN_TIME=10m
```

## 🚨 Solución de Problemas

### **Error: "Could not find 'locustfile.py'"**
```bash
# Asegúrate de estar en el directorio correcto
cd test/carga
dir  # Verifica que locustfile.py esté presente
```

### **Error: "Connection refused"**
- Verifica que el API Gateway esté corriendo en puerto 8080
- Verifica que los microservicios estén disponibles

### **Error: "Locust not found"**
```bash
pip install locust
```

### **Error: "Too many open files"**
```bash
# En Linux/Mac
ulimit -n 65536

# En Windows, aumentar límites del sistema
```

### **Rendimiento Lento**
- Verifica recursos del sistema (CPU, RAM, red)
- Considera ejecutar en modo distribuido
- Verifica configuración de base de datos

### **Errores de Base de Datos**
- Verifica conexiones de base de datos
- Ajusta pool de conexiones
- Monitorea uso de recursos

## 📊 Monitoreo Durante la Prueba

### **Métricas del Sistema**
```bash
# Monitorear CPU y memoria
htop

# Monitorear red
iftop

# Monitorear base de datos
pg_stat_activity
```

### **Logs de Aplicación**
- Revisar logs de Spring Boot
- Monitorear errores en consola
- Verificar métricas de Actuator

## 🎯 Resultado Esperado

Al completar las pruebas exitosamente:

```
✅ PRUEBA DE CARGA EXITOSA: 10,000 usuarios concurrentes
✅ Tiempo de respuesta: ≤ 2 segundos
✅ Tasa de error: ≤ 1%
✅ RPS: ≥ 5,000 requests/segundo
✅ Rendimiento estable: 10 minutos
✅ Sistema escalable: Cumple requisitos no funcionales
```

## 📋 Checklist de Ejecución

- [ ] Python 3.8+ instalado
- [ ] Locust instalado (`pip install locust`)
- [ ] Servicios backend corriendo
- [ ] Base de datos configurada
- [ ] Recursos del sistema disponibles
- [ ] Configuración de red optimizada
- [ ] Monitoreo activo
- [ ] Backup de datos (opcional)

## ⚠️ Advertencias

- **Las pruebas de carga son intensivas** - Asegúrate de tener recursos suficientes
- **Pueden afectar el rendimiento** - Ejecuta en entorno de pruebas, no producción
- **Monitorea el sistema** - Observa CPU, memoria, red y base de datos
- **Ten un plan de rollback** - En caso de problemas, detén las pruebas inmediatamente 