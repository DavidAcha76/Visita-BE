# ENTREGA OFICIAL - BACKEND VISITA COCHA

## INFORMACIÓN DEL PROYECTO

**Sistema:** Backend API para gestión turística de Cochabamba  
**Tecnología:** NestJS, MongoDB, Docker  
**Estado:** Completado y listo para despliegue

## ARCHIVOS INCLUIDOS

### Configuración Docker
- `Dockerfile` - Imagen del backend
- `docker-compose.yml` - Configuración de servicios
- `.dockerignore` - Optimización

### Documentación
- `README.md` - Información general del proyecto
- `DEPLOY-UBUNTU.md` - Guía de instalación en Ubuntu
- `install-ubuntu.sh` - Script de instalación automática
- Este documento

### Código Fuente
- Carpeta `src/` - Código completo del backend
- Módulos implementados: atractivos, restaurantes, eventos, hoteles, comidas, reseñas

## INFORMACIÓN REQUERIDA PARA INSTALACIÓN

Para realizar el despliegue en su servidor, necesitamos la siguiente información:

### Acceso al Servidor
- Dirección IP
- Usuario con permisos sudo
- Contraseña o clave SSH
- Puerto SSH

### Base de Datos MongoDB
- URL de conexión (si ya tienen MongoDB instalado)
- O confirmar instalación en el servidor

### Configuración de Red (Opcional)
- Dominio o subdominio asignado
- Certificado SSL si lo tienen disponible

## PROCESO DE INSTALACIÓN

El proceso de instalación en el servidor Ubuntu consta de los siguientes pasos:

### 1. Preparación del Servidor (15 minutos)
Instalación de Docker y dependencias necesarias mediante el script automatizado.

### 2. Configuración (10 minutos)
Configuración de variables de entorno y credenciales de base de datos.

### 3. Despliegue (5 minutos)
Construcción y levantamiento de los contenedores Docker.

### 4. Verificación (5 minutos)
Pruebas de funcionamiento y acceso a la documentación API.

**Tiempo total estimado:** 30-45 minutos

## COMANDOS DE INSTALACIÓN

Una vez se tenga acceso al servidor:

```bash
# 1. Instalar Docker y preparar entorno
sudo bash install-ubuntu.sh

# 2. Clonar repositorio
cd /opt
git clone <url-repositorio>
cd visita-cocha-be

# 3. Configurar variables
nano .env
# Agregar MONGODB_URI y otras variables

# 4. Levantar aplicación
docker-compose up -d

# 5. Verificar funcionamiento
curl http://localhost:3000/health
```

## VERIFICACIÓN POST-INSTALACIÓN

### Endpoints Disponibles
- API Base: `http://servidor:3000`
- Documentación: `http://servidor:3000/api`
- Health Check: `http://servidor:3000/health`

### Módulos Implementados
- Atractivos turísticos
- Restaurantes
- Eventos
- Hoteles
- Comidas típicas
- Reseñas
- Categorías

## REQUISITOS DEL SERVIDOR

**Mínimos:**
- Ubuntu 20.04 o superior
- 2GB RAM
- 2 CPU cores
- 20GB disco libre
- Conexión a internet

## MANTENIMIENTO

### Reiniciar Servicio
```bash
docker-compose restart
```

### Ver Logs
```bash
docker-compose logs -f
```

### Actualizar Aplicación
```bash
git pull
docker-compose up -d --build
```

## CONTACTO

Para coordinar la instalación o resolver dudas técnicas, contactar al equipo de desarrollo.

---

**Fecha de Entrega:** Noviembre 2025  
**Versión:** 1.0.0
