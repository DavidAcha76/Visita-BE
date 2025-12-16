#!/bin/bash

# ============================================
# SCRIPT DE INSTALACIÓN AUTOMÁTICA
# Sistema Visita Cocha - Backend
# Para Ubuntu Server
# ============================================

set -e  # Detener si hay errores

echo "=========================================="
echo "🏛️  INSTALACIÓN VISITA COCHA BACKEND"
echo "=========================================="
echo ""

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Función para imprimir con color
print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${YELLOW}ℹ️  $1${NC}"
}

# Verificar que se ejecuta como root o con sudo
if [ "$EUID" -ne 0 ]; then 
    print_error "Por favor ejecuta este script con sudo"
    echo "Uso: sudo bash install-ubuntu.sh"
    exit 1
fi

print_info "Iniciando instalación..."
echo ""

# ============================================
# 1. ACTUALIZAR SISTEMA
# ============================================
print_info "Paso 1/6: Actualizando sistema Ubuntu..."
apt update -qq
apt upgrade -y -qq
print_success "Sistema actualizado"
echo ""

# ============================================
# 2. INSTALAR DEPENDENCIAS
# ============================================
print_info "Paso 2/6: Instalando dependencias..."
apt install -y -qq \
    git \
    curl \
    wget \
    ca-certificates \
    gnupg \
    lsb-release
print_success "Dependencias instaladas"
echo ""

# ============================================
# 3. INSTALAR DOCKER
# ============================================
print_info "Paso 3/6: Instalando Docker..."

# Verificar si Docker ya está instalado
if command -v docker &> /dev/null; then
    print_success "Docker ya está instalado"
else
    # Agregar repositorio oficial de Docker
    mkdir -p /etc/apt/keyrings
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
    
    echo \
      "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
      $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
    
    apt update -qq
    apt install -y -qq docker-ce docker-ce-cli containerd.io docker-compose-plugin
    
    # Iniciar y habilitar Docker
    systemctl start docker
    systemctl enable docker
    
    print_success "Docker instalado y configurado"
fi
echo ""

# ============================================
# 4. INSTALAR DOCKER COMPOSE
# ============================================
print_info "Paso 4/6: Instalando Docker Compose..."

if command -v docker-compose &> /dev/null; then
    print_success "Docker Compose ya está instalado"
else
    curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose
    print_success "Docker Compose instalado"
fi
echo ""

# ============================================
# 5. CONFIGURAR FIREWALL
# ============================================
print_info "Paso 5/6: Configurando firewall..."

# Instalar UFW si no está
apt install -y -qq ufw

# Configurar reglas básicas
ufw --force enable
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw allow 80/tcp    # HTTP
ufw allow 443/tcp   # HTTPS
ufw allow 3000/tcp  # API

print_success "Firewall configurado"
echo ""

# ============================================
# 6. CREAR DIRECTORIO DEL PROYECTO
# ============================================
print_info "Paso 6/6: Preparando directorio del proyecto..."

# Crear directorio
mkdir -p /opt/visita-cocha
cd /opt/visita-cocha

print_success "Directorio creado: /opt/visita-cocha"
echo ""

# ============================================
# RESUMEN
# ============================================
echo "=========================================="
echo "✅ INSTALACIÓN COMPLETADA"
echo "=========================================="
echo ""
echo "📋 Componentes instalados:"
echo "  • Ubuntu actualizado"
echo "  • Docker $(docker --version | cut -d ' ' -f3)"
echo "  • Docker Compose $(docker-compose --version | cut -d ' ' -f4)"
echo "  • Firewall UFW configurado"
echo ""
echo "📁 Directorio del proyecto: /opt/visita-cocha"
echo ""
echo "🚀 Próximos pasos:"
echo ""
echo "1. Clonar el repositorio:"
echo "   cd /opt/visita-cocha"
echo "   git clone https://github.com/VictoriaGuerra/visita-cocha-be.git ."
echo ""
echo "2. Configurar variables de entorno:"
echo "   nano .env"
echo "   (Agregar MONGODB_URI y otras variables)"
echo ""
echo "3. Iniciar la aplicación:"
echo "   docker-compose up -d"
echo ""
echo "4. Ver logs:"
echo "   docker-compose logs -f"
echo ""
echo "5. Verificar funcionamiento:"
echo "   curl http://localhost:3000/health"
echo ""
echo "=========================================="
echo ""

# Mostrar información del sistema
print_info "Información del sistema:"
echo "  • IP: $(hostname -I | awk '{print $1}')"
echo "  • Hostname: $(hostname)"
echo "  • CPU: $(nproc) cores"
echo "  • RAM: $(free -h | grep Mem | awk '{print $2}')"
echo "  • Disco: $(df -h / | tail -1 | awk '{print $4}') disponible"
echo ""

print_success "¡Listo! El servidor está preparado para el despliegue."
