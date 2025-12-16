# Despliegue en Servidor Ubuntu

Guía para instalar el backend en un servidor Ubuntu usando Docker.

## Requisitos del Servidor

- Ubuntu 20.04 o superior
- 2GB RAM mínimo
- 2 CPU cores
- 20GB espacio en disco
- Acceso root o sudo
- Conexión a internet

## Instalación Automática

Ejecutar el script de instalación que prepara todo el entorno:

```bash
sudo bash install-ubuntu.sh
```

Este script instala:
- Docker
- Docker Compose
- Configura firewall
- Crea directorios necesarios

## Instalación Manual

### 1. Instalar Docker

```bash
# Actualizar sistema
sudo apt update
sudo apt upgrade -y

# Instalar dependencias
sudo apt install -y curl wget git

# Instalar Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Habilitar Docker
sudo systemctl start docker
sudo systemctl enable docker

# Instalar Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### 2. Configurar Firewall

```bash
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
sudo ufw allow 3000/tcp  # API
sudo ufw enable
```

### 3. Clonar Proyecto

```bash
cd /opt
sudo git clone https://github.com/VictoriaGuerra/visita-cocha-be.git
cd visita-cocha-be
```

### 4. Configurar Variables

```bash
sudo nano .env
```

Agregar:
```env
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/database
PORT=3000
NODE_ENV=production
```

### 5. Levantar Aplicación

```bash
sudo docker-compose up -d
```

### 6. Verificar

```bash
# Ver logs
sudo docker-compose logs -f

# Verificar estado
curl http://localhost:3000/health
```

## Comandos Útiles

```bash
# Ver logs en tiempo real
sudo docker-compose logs -f

# Reiniciar servicio
sudo docker-compose restart

# Detener servicio
sudo docker-compose down

# Actualizar aplicación
cd /opt/visita-cocha-be
sudo git pull
sudo docker-compose up -d --build

# Ver estado de contenedores
sudo docker-compose ps
```

## Configurar Dominio (Opcional)

Si tienen un dominio como `api.visitacocha.gob.bo`:

### Instalar Nginx

```bash
sudo apt install nginx -y
```

### Configurar Reverse Proxy

```bash
sudo nano /etc/nginx/sites-available/visita-cocha
```

Agregar:
```nginx
server {
    listen 80;
    server_name api.visitacocha.gob.bo;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Activar:
```bash
sudo ln -s /etc/nginx/sites-available/visita-cocha /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## SSL con Let's Encrypt (Opcional)

```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d api.visitacocha.gob.bo
```

## Troubleshooting

### Docker no inicia
```bash
sudo systemctl status docker
sudo systemctl restart docker
```

### Puerto en uso
```bash
sudo lsof -i :3000
# Matar proceso si es necesario
sudo kill -9 PID
```

### Ver logs de errores
```bash
sudo docker-compose logs api
```

### Reiniciar todo
```bash
sudo docker-compose down
sudo docker-compose up -d --build
```

## Backup de MongoDB

Si MongoDB está en el servidor:
```bash
sudo docker-compose exec mongodb mongodump --out=/backup
```

## Monitoreo

Verificar que la API responde:
```bash
curl http://localhost:3000/health
```

Respuesta esperada:
```json
{
  "status": "ok",
  "timestamp": "2025-11-26T00:00:00.000Z"
}
```

## Soporte

Para problemas o dudas, contactar al equipo de desarrollo.
