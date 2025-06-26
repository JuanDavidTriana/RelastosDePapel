@echo off
echo ========================================
echo Iniciando Frontend - Relatos de Papel
echo ========================================

echo.
echo Verificando dependencias...
if not exist "node_modules" (
    echo Instalando dependencias...
    npm install
)

echo.
echo Configurando variables de entorno...
echo VITE_API_URL=http://localhost:8081 > .env

echo.
echo Iniciando servidor de desarrollo...
echo El frontend estara disponible en: http://localhost:5173
echo.
npm run dev 