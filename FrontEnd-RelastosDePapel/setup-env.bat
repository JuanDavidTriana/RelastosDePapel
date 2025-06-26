@echo off
echo Configurando variables de entorno para el frontend...
echo.

if exist .env (
    echo El archivo .env ya existe.
) else (
    echo Creando archivo .env...
    copy env.example .env
    echo Archivo .env creado exitosamente.
)

echo.
echo Variables de entorno configuradas:
echo - VITE_API_URL=http://localhost:8080/api
echo.
echo Ahora puedes ejecutar: npm run dev
echo.
pause 