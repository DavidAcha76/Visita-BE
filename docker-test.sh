#!/bin/bash
# Script rápido para probar Docker localmente

echo "🐳 Probando Docker de Visita Cocha API"
echo "======================================"

# Verificar que Docker esté instalado
if ! command -v docker &> /dev/null; then
    echo "❌ Docker no está instalado"
    exit 1
fi

echo "✅ Docker detectado"

# Verificar que exista .env
if [ ! -f .env ]; then
    echo "⚠️  No se encontró .env, copiando desde .env.example"
    cp .env.example .env
    echo "📝 Por favor edita .env con tus credenciales reales"
    exit 1
fi

echo "✅ Archivo .env encontrado"

# Construir imagen
echo ""
echo "🔨 Construyendo imagen Docker..."
docker build -t visita-cocha-api .

if [ $? -eq 0 ]; then
    echo "✅ Imagen construida exitosamente"
else
    echo "❌ Error al construir la imagen"
    exit 1
fi

# Correr contenedor
echo ""
echo "🚀 Iniciando contenedor..."
docker run -d -p 3000:3000 --env-file .env --name visita-cocha-api visita-cocha-api

if [ $? -eq 0 ]; then
    echo "✅ Contenedor iniciado exitosamente"
else
    echo "❌ Error al iniciar el contenedor"
    exit 1
fi

# Esperar a que inicie
echo ""
echo "⏳ Esperando a que la API inicie..."
sleep 5

# Health check
echo ""
echo "🏥 Verificando health..."
curl -s http://localhost:3000/health | jq .

echo ""
echo "======================================"
echo "✅ ¡API corriendo en http://localhost:3000!"
echo "📚 Documentación: http://localhost:3000/api"
echo ""
echo "Ver logs: docker logs -f visita-cocha-api"
echo "Detener: docker stop visita-cocha-api"
echo "======================================"
