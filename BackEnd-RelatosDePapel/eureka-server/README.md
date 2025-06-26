# Eureka Server

## Descripción
Servicio de descubrimiento y registro que actúa como el centro de control de la arquitectura de microservicios.

## Características
- Registro automático de microservicios
- Balanceo de carga
- Monitoreo de estado de servicios
- Interfaz web para visualización de servicios registrados

## Configuración
- **Puerto**: 8761
- **URL**: http://localhost:8761

## Cómo Levantar
```bash
cd eureka-server
mvn spring-boot:run
```

## Verificación
1. Accede a http://localhost:8761
2. Deberías ver la interfaz de Eureka
3. Los servicios se irán registrando automáticamente al iniciarlos

## Notas
- Este servicio debe ser el primero en iniciarse
- Todos los demás servicios dependen de él
- Mantiene un registro de todos los microservicios activos 