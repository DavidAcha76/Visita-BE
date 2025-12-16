# Visita Cocha - Backend API

Sistema de gestión turística para Cochabamba. Backend desarrollado con NestJS, MongoDB y Docker.

## Requisitos

- Node.js 18+
- MongoDB 6+
- Docker y Docker Compose

## Instalación Local

```bash
# Clonar repositorio
git clone https://github.com/VictoriaGuerra/visita-cocha-be.git
cd visita-cocha-be

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env

# Iniciar en desarrollo
npm run start:dev
```

El servidor estará disponible en http://localhost:3000

## Configuración

Crear archivo `.env` con las siguientes variables:

```env
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/database
PORT=3000
NODE_ENV=production
```

## Uso con Docker

```bash
# Levantar servicios
docker-compose up -d

# Ver logs
docker-compose logs -f

# Detener servicios
docker-compose down
```

## Documentación API

- **API Base:** http://localhost:3000
- **Documentación Swagger:** http://localhost:3000/api
- **Health Check:** http://localhost:3000/health

## Endpoints Disponibles

### Atractivos Turísticos
- `GET /attractions` - Lista todos
- `GET /attractions/:id` - Obtiene uno
- `POST /attractions` - Crear nuevo
- `PATCH /attractions/:id` - Actualizar
- `DELETE /attractions/:id` - Eliminar

### Restaurantes
- `GET /restaurants` - Lista todos
- `GET /restaurants/:id` - Obtiene uno
- `POST /restaurants` - Crear nuevo
- `PATCH /restaurants/:id` - Actualizar
- `DELETE /restaurants/:id` - Eliminar

### Eventos
- `GET /events` - Lista todos
- `GET /events/:id` - Obtiene uno
- `POST /events` - Crear nuevo
- `PATCH /events/:id` - Actualizar
- `DELETE /events/:id` - Eliminar

### Otros Módulos
- `/hotels` - Hoteles
- `/foods` - Comidas típicas
- `/reviews` - Reseñas
- `/attraction-categories` - Categorías de atractivos
- `/restaurant-categories` - Categorías de restaurantes

Ver documentación completa en http://localhost:3000/api

## Estructura

```
src/
├── attractions/      # Atractivos turísticos
├── restaurants/      # Restaurantes
├── events/           # Eventos
├── hotels/           # Hoteles
├── foods/            # Comidas típicas
├── reviews/          # Reseñas
├── auth/             # Autenticación
└── database/         # Configuración MongoDB
```

## Scripts

```bash
npm run start:dev     # Desarrollo con hot-reload
npm run build         # Compilar para producción
npm run start:prod    # Iniciar en producción
```

## Despliegue en Servidor Ubuntu

Ver `DEPLOY-UBUNTU.md` para instrucciones completas.

Resumen rápido:
```bash
# 1. Instalar Docker
sudo bash install-ubuntu.sh

# 2. Configurar y levantar
docker-compose up -d
```

## Licencia

Desarrollado para la Alcaldía Municipal de Cochabamba.
