import { Controller, Post, Get, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBadRequestResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión de usuario' })
  @ApiResponse({ status: 201, description: 'Login exitoso' })
  @ApiBadRequestResponse({ description: 'Email o contraseña inválidos' })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.email, loginDto.password);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener datos del usuario autenticado' })
  @ApiResponse({ status: 200, description: 'Datos del usuario' })
  async getMe(@Request() req) {
    return this.authService.getMe(req.user);
  }

  @Post('password/reset/request')
  @ApiOperation({ summary: 'Solicitar reset de contraseña' })
  @ApiResponse({ status: 200, description: 'Email de reset enviado' })
  async requestPasswordReset(@Body() body: { email: string }) {
    return this.authService.requestPasswordReset(body.email);
  }

  @Post('password/reset/verify')
  @ApiOperation({ summary: 'Verificar token de reset' })
  @ApiResponse({ status: 200, description: 'Token válido' })
  async verifyResetToken(@Body() body: { token: string }) {
    return this.authService.verifyResetToken(body.token);
  }

  @Post('password/reset/confirm')
  @ApiOperation({ summary: 'Confirmar nuevo password' })
  @ApiResponse({ status: 200, description: 'Password actualizada' })
  async confirmPasswordReset(@Body() body: { token: string; newPassword: string }) {
    return this.authService.confirmPasswordReset(body.token, body.newPassword);
  }

  @Post('password/initial')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Cambiar password inicial (primer login)' })
  @ApiResponse({ status: 200, description: 'Password actualizada' })
  async setInitialPassword(@Request() req, @Body() body: { newPassword: string }) {
    return this.authService.setInitialPassword(req.user, body.newPassword);
  }
}