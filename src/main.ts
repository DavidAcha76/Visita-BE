import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS para múltiples frontends
  app.enableCors({
    origin: [
      'http://localhost:5173',  // React/Vite
      'http://localhost:4200',  // Angular
      'http://localhost:8100',  // Ionic
      // Agregar URLs de producción cuando las tengas
    ],
    credentials: true,
  });

  // Validación global de DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Servir archivos estáticos de uploads
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));
  
  // Servir archivos GeoJSON desde src/GeoJSON
  app.use('/geojson', express.static(join(__dirname, '..', 'src', 'GeoJSON')));

  // Configuración Swagger
  const config = new DocumentBuilder()
    .setTitle('Visita Cocha API')
    .setDescription('API para el sistema Visita Cocha - Panel de Administración y Página Pública')
    .setVersion('1.0')
    .addTag('attractions', 'Endpoints de atractivos turísticos')
    .addTag('restaurants', 'Endpoints de restaurantes')
    .addTag('events', 'Endpoints de eventos')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`\n🚀 Servidor corriendo en: http://localhost:${port}`);
  console.log(`📚 Documentación Swagger: http://localhost:${port}/api\n`);
}

bootstrap();
