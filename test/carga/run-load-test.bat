@echo off
echo ========================================
echo    PRUEBAS DE CARGA - RELASTOS DE PAPEL
echo ========================================
echo.

echo Verificando requisitos previos...
echo.

REM Verificar si Python está instalado
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ ERROR: Python no está instalado o no está en el PATH
    echo Instala Python desde: https://python.org
    pause
    exit /b 1
)

REM Verificar si Locust está instalado
locust --version >nul 2>&1
if errorlevel 1 (
    echo ❌ ERROR: Locust no está instalado
    echo Instalando Locust...
    pip install locust
    if errorlevel 1 (
        echo ❌ ERROR: No se pudo instalar Locust
        pause
        exit /b 1
    )
)

echo ✅ Python y Locust verificados
echo.

REM Verificar que los servicios estén corriendo
echo Verificando servicios backend...
curl -s http://localhost:8081/books >nul 2>&1
if errorlevel 1 (
    echo ⚠️  ADVERTENCIA: No se puede conectar al API Gateway (puerto 8081)
    echo Asegúrate de que los servicios backend estén corriendo
    echo.
    set /p continue="¿Continuar de todas formas? (s/n): "
    if /i not "%continue%"=="s" (
        echo Prueba cancelada
        pause
        exit /b 1
    )
) else (
    echo ✅ API Gateway disponible
)

echo.
echo ========================================
echo    CONFIGURACIÓN DE LA PRUEBA
echo ========================================
echo.

REM Configuración por defecto
set USERS=10000
set SPAWN_RATE=100
set RUN_TIME=10m
set HOST=http://localhost:8081

echo Configuración actual:
echo   - Usuarios: %USERS%
echo   - Spawn rate: %SPAWN_RATE%/s
echo   - Duración: %RUN_TIME%
echo   - Host: %HOST%
echo.

REM Preguntar si quiere cambiar la configuración
set /p custom="¿Usar configuración personalizada? (s/n): "
if /i "%custom%"=="s" (
    echo.
    set /p USERS="Número de usuarios (default: 10000): "
    if "%USERS%"=="" set USERS=10000
    
    set /p SPAWN_RATE="Spawn rate por segundo (default: 100): "
    if "%SPAWN_RATE%"=="" set SPAWN_RATE=100
    
    set /p RUN_TIME="Duración (default: 10m): "
    if "%RUN_TIME%"=="" set RUN_TIME=10m
    
    set /p HOST="Host (default: http://localhost:8081): "
    if "%HOST%"=="" set HOST=http://localhost:8081
)

echo.
echo ========================================
echo    EJECUTANDO PRUEBAS DE CARGA
echo ========================================
echo.

REM Crear directorio para resultados si no existe
if not exist "test-results" mkdir test-results

REM Ejecutar Locust
echo Iniciando Locust con la siguiente configuración:
echo   - Archivo: locustfile.py
echo   - Host: %HOST%
echo   - Usuarios: %USERS%
echo   - Spawn rate: %SPAWN_RATE%
echo   - Duración: %RUN_TIME%
echo   - Modo: Headless (sin interfaz gráfica)
echo.

echo 🚀 Iniciando prueba de carga...
echo ⏱️  Duración estimada: %RUN_TIME%
echo 📊 Monitorea el progreso en la consola
echo.

locust -f locustfile.py ^
  --host=%HOST% ^
  --users=%USERS% ^
  --spawn-rate=%SPAWN_RATE% ^
  --run-time=%RUN_TIME% ^
  --headless ^
  --html=test-results/load-test-report.html ^
  --csv=test-results/load-test-results

if errorlevel 1 (
    echo.
    echo ❌ ERROR: La prueba de carga falló
    echo Revisa los logs para más detalles
) else (
    echo.
    echo ✅ PRUEBA DE CARGA COMPLETADA EXITOSAMENTE
    echo.
    echo 📁 Resultados guardados en:
    echo   - test-results/load-test-report.html
    echo   - test-results/load-test-results.csv
    echo   - test-results/load-test-results_stats.csv
    echo.
    echo 📊 Abre el reporte HTML para ver los resultados detallados
)

echo.
echo Presiona cualquier tecla para salir...
pause >nul 