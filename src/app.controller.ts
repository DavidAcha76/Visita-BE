import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getRoot() {
    return {
      message: '🌟 Bienvenido a la API de Visita Cocha',
      version: '1.0.0',
      endpoints: {
        docs: '/api',
        health: '/health',
      },
      status: 'online',
    };
  }

  @Get('health')
  getHealth() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
    };
  }
}
