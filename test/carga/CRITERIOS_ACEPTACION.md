# Criterios de Aceptación - Pruebas de Carga (Requisitos No Funcionales)

## 🎯 Objetivo
Verificar que el sistema cumple con los requisitos de rendimiento y escalabilidad bajo carga de usuarios concurrentes.

## 📋 Requisitos No Funcionales

### **Carga Objetivo**
- **Usuarios Concurrentes:** 10,000 usuarios simultáneos
- **Tiempo de Respuesta Máximo:** 2 segundos por petición
- **Tasa de Error Máxima:** 1% (99% de éxito)
- **Duración de la Prueba:** 10 minutos

### **Escenarios de Carga**

#### **1. Consulta de Catálogo de Libros**
- **Endpoint:** `GET /books`
- **Frecuencia:** 40% de las peticiones
- **Comportamiento:** Usuario consulta la lista completa de libros
- **Criterio:** Respuesta en ≤ 2 segundos

#### **2. Búsqueda de Libros**
- **Endpoint:** `GET /books?search={term}`
- **Frecuencia:** 35% de las peticiones
- **Comportamiento:** Usuario busca libros por título o autor
- **Términos de búsqueda:** ["libro", "autor", "novela", "historia", "fantasía"]
- **Criterio:** Respuesta en ≤ 2 segundos

#### **3. Consulta de Libro Específico**
- **Endpoint:** `GET /books/{id}`
- **Frecuencia:** 20% de las peticiones
- **Comportamiento:** Usuario consulta detalles de un libro específico
- **Criterio:** Respuesta en ≤ 2 segundos

#### **4. Creación de Compra**
- **Endpoint:** `POST /purchases`
- **Frecuencia:** 5% de las peticiones
- **Comportamiento:** Usuario realiza una compra
- **Criterio:** Respuesta en ≤ 2 segundos

## 🔧 Configuración Técnica

### **Herramienta de Pruebas**
- **Framework:** Locust (Python)
- **Protocolo:** HTTP/HTTPS
- **Navegador:** Headless (sin interfaz gráfica)

### **Configuración de Locust**
```python
# Configuración de usuarios
users = 10000
spawn_rate = 100  # usuarios por segundo
run_time = "10m"  # 10 minutos

# Configuración de timeouts
timeout = 2.0  # 2 segundos máximo
```

### **Endpoints a Probar**
- **Base URL:** `http://localhost:8081` (API Gateway)
- **Servicios:** 
  - `ms-books-catalogue` (puerto 8081)
  - `ms-books-payments` (puerto 8082)

## 📊 Métricas de Rendimiento

### **Métricas Principales**
- **RPS (Requests Per Second):** ≥ 5,000 RPS
- **Tiempo de Respuesta Promedio:** ≤ 1 segundo
- **Tiempo de Respuesta P95:** ≤ 1.5 segundos
- **Tiempo de Respuesta P99:** ≤ 2 segundos
- **Tasa de Error:** ≤ 1%

### **Métricas de Recursos**
- **CPU:** ≤ 80% de uso promedio
- **Memoria:** ≤ 80% de uso promedio
- **Red:** Monitorear ancho de banda
- **Base de Datos:** ≤ 70% de uso de conexiones

## 🧪 Casos de Prueba

### **Caso 1: Carga Gradual**
- **Descripción:** Incrementar usuarios de 0 a 10,000 en 5 minutos
- **Criterio:** Sistema mantiene rendimiento estable
- **Duración:** 10 minutos

### **Caso 2: Carga Sostenida**
- **Descripción:** Mantener 10,000 usuarios por 10 minutos
- **Criterio:** No degradación de rendimiento
- **Duración:** 10 minutos

### **Caso 3: Picos de Carga**
- **Descripción:** Variar carga entre 5,000 y 10,000 usuarios
- **Criterio:** Sistema se recupera rápidamente
- **Duración:** 10 minutos

## 🎯 Criterios de Aceptación

### **Criterios de Éxito**
1. ✅ **Concurrencia:** Sistema soporta 10,000 usuarios simultáneos
2. ✅ **Tiempo de Respuesta:** ≤ 2 segundos para todas las peticiones
3. ✅ **Tasa de Error:** ≤ 1% de peticiones fallidas
4. ✅ **Estabilidad:** No degradación durante 10 minutos
5. ✅ **Recuperación:** Sistema se recupera de picos de carga

### **Criterios de Fallo**
- ❌ **Tiempo de respuesta > 2 segundos**
- ❌ **Tasa de error > 1%**
- ❌ **Sistema no disponible**
- ❌ **Degradación continua de rendimiento**

## 📈 Reportes Esperados

### **Métricas de Salida**
```
Nombre de la prueba: Prueba de Carga - 10,000 Usuarios
Duración: 10 minutos
Usuarios máximos: 10,000
RPS promedio: 5,000+
Tiempo de respuesta promedio: ≤ 1s
Tiempo de respuesta P95: ≤ 1.5s
Tiempo de respuesta P99: ≤ 2s
Tasa de error: ≤ 1%
Estado: ✅ PASÓ / ❌ FALLÓ
```

## 🔧 Configuración de Entorno

### **Requisitos Previos**
- Python 3.8+
- Locust instalado (`pip install locust`)
- Servicios backend corriendo
- Base de datos configurada
- Monitoreo de recursos activo

### **Comandos de Ejecución**
```bash
# Ejecutar prueba de carga
locust -f test/carga/locustfile.py --host=http://localhost:8081

# Ejecutar con configuración específica
locust -f test/carga/locustfile.py --users=10000 --spawn-rate=100 --run-time=10m
```

## 🎯 Resultado Esperado

Al completar las pruebas exitosamente:

```
✅ PRUEBA DE CARGA EXITOSA: 10,000 usuarios concurrentes
✅ Tiempo de respuesta: ≤ 2 segundos
✅ Tasa de error: ≤ 1%
✅ Rendimiento estable: 10 minutos
✅ Sistema escalable: Cumple requisitos no funcionales
``` 