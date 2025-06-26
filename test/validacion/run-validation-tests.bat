@echo off
echo ========================================
echo   PRUEBAS DE ACEPTACION - RELATOS DE PAPEL
echo ========================================
echo.

echo [1/4] Verificando que los servicios esten corriendo...
echo.

REM Verificar Eureka Server
echo Verificando Eureka Server (puerto 8761)...
curl -s http://localhost:8761 >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ ERROR: Eureka Server no esta corriendo en puerto 8761
    echo    Inicia el servicio con: cd BackEnd-RelatosDePapel/eureka-server && mvn spring-boot:run
    echo.
    pause
    exit /b 1
) else (
    echo ✅ Eureka Server esta corriendo
)

REM Verificar MS-Books-Catalogue
echo Verificando MS-Books-Catalogue (puerto 8081)...
curl -s http://localhost:8081/books >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ ERROR: MS-Books-Catalogue no esta corriendo en puerto 8081
    echo    Inicia el servicio con: cd BackEnd-RelatosDePapel/ms-books-catalogue && mvn spring-boot:run
    echo.
    pause
    exit /b 1
) else (
    echo ✅ MS-Books-Catalogue esta corriendo
)

REM Verificar MS-Books-Payments
echo Verificando MS-Books-Payments (puerto 8082)...
curl -s http://localhost:8082/purchases >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ ERROR: MS-Books-Payments no esta corriendo en puerto 8082
    echo    Inicia el servicio con: cd BackEnd-RelatosDePapel/ms-books-payments && mvn spring-boot:run
    echo.
    pause
    exit /b 1
) else (
    echo ✅ MS-Books-Payments esta corriendo
)

echo.
echo [2/4] Navegando al directorio del proyecto...
cd /d "%~dp0..\..\BackEnd-RelatosDePapel\ms-books-catalogue"
if %errorlevel% neq 0 (
    echo ❌ ERROR: No se pudo navegar al directorio del proyecto
    echo    Verifica que la estructura de directorios sea correcta
    pause
    exit /b 1
)
echo ✅ Directorio del proyecto encontrado

echo.
echo [3/4] Limpiando proyecto (eliminando archivos compilados)...
mvn clean -q
if %errorlevel% neq 0 (
    echo ❌ ERROR: Fallo al limpiar el proyecto
    pause
    exit /b 1
)
echo ✅ Proyecto limpiado correctamente

echo.
echo [4/4] Ejecutando pruebas de aceptacion...
echo.
echo ========================================
echo   EJECUTANDO PRUEBAS DE ACEPTACION
echo ========================================
echo.

mvn test -Dtest=BookSearchAndPurchaseTest

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo   ✅ TODAS LAS PRUEBAS PASARON EXITOSAMENTE
    echo ========================================
    echo.
    echo Resumen:
    echo - 6 pruebas de aceptacion ejecutadas
    echo - 0 fallos
    echo - 0 errores
    echo.
    echo Los criterios de aceptacion han sido validados correctamente.
    echo El caso de uso "Buscar un libro y hacer una compra" funciona correctamente.
    echo.
) else (
    echo.
    echo ========================================
    echo   ❌ ALGUNAS PRUEBAS FALLARON
    echo ========================================
    echo.
    echo Posibles soluciones:
    echo 1. Verifica que todos los servicios esten corriendo
    echo 2. Verifica la conectividad de la base de datos
    echo 3. Revisa los logs en target/surefire-reports/
    echo 4. Ejecuta: mvn clean test -Dtest=BookSearchAndPurchaseTest
    echo.
)

echo Presiona cualquier tecla para continuar...
pause >nul 