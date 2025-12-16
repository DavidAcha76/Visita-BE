# 🐳 Scripts de Docker para Visita Cocha

# Construir imagen
build:
	docker build -t visita-cocha-api .

# Correr contenedor
run:
	docker run -p 3000:3000 \
		--env-file .env \
		--name visita-cocha-api \
		visita-cocha-api

# Correr en background
run-detached:
	docker run -d -p 3000:3000 \
		--env-file .env \
		--name visita-cocha-api \
		visita-cocha-api

# Detener contenedor
stop:
	docker stop visita-cocha-api

# Eliminar contenedor
remove:
	docker rm visita-cocha-api

# Reiniciar
restart: stop remove build run

# Ver logs
logs:
	docker logs -f visita-cocha-api

# Docker Compose - Iniciar todo
up:
	docker-compose up -d

# Docker Compose - Detener todo
down:
	docker-compose down

# Docker Compose - Ver logs
compose-logs:
	docker-compose logs -f

# Docker Compose - Reiniciar
compose-restart:
	docker-compose down && docker-compose up -d

# Limpiar todo (cuidado)
clean:
	docker stop visita-cocha-api || true
	docker rm visita-cocha-api || true
	docker rmi visita-cocha-api || true

# Health check
health:
	curl http://localhost:3000/health

# Test API
test:
	curl http://localhost:3000/atractivos

.PHONY: build run run-detached stop remove restart logs up down compose-logs compose-restart clean health test
