import { Injectable, UnauthorizedException, BadRequestException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Verificar si la contraseña está hasheada o no
    let isPasswordValid = false;
    
    // Intentar primero con bcrypt (contraseñas hasheadas)
    if (user.password.startsWith('$2b$') || user.password.startsWith('$2a$')) {
      isPasswordValid = await bcrypt.compare(password, user.password);
    } else {
      // Si no está hasheada, comparar directamente (solo para datos legacy)
      isPasswordValid = password === user.password;
    }

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = { sub: user._id, email: user.email };

    return {
      message: 'Login exitoso',
      usuario: { id: user._id, nombre: user.nombre, email: user.email, rol: user.rol },
      token: this.jwtService.sign(payload),
    };
  }

  async getMe(user: any) {
    const userData = await this.userService.findOne(user.sub);
    if (!userData) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return {
      id: userData._id,
      nombre: userData.nombre,
      email: userData.email,
      rol: userData.rol,
      estado: userData.estado,
    };
  }

  async requestPasswordReset(email: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      // No revelar si el email existe o no por seguridad
      return {
        message: 'Si el email existe, recibirá un enlace de reset',
      };
    }

    // Generar token de reset válido por 1 hora
    const resetToken = this.jwtService.sign(
      { sub: user._id, email: user.email, type: 'reset' },
      { expiresIn: '1h' },
    );

    // TODO: Guardar el token en DB y enviar email
    // Por ahora solo retornamos el token (en producción se enviaría por email)

    return {
      message: 'Email de reset enviado',
      resetToken: resetToken, // Solo para desarrollo
    };
  }

  async verifyResetToken(token: string) {
    try {
      const payload = this.jwtService.verify(token);
      
      if (payload.type !== 'reset') {
        throw new BadRequestException('Token inválido');
      }

      return {
        valid: true,
        email: payload.email,
      };
    } catch (error) {
      throw new BadRequestException('Token expirado o inválido');
    }
  }

  async confirmPasswordReset(token: string, newPassword: string) {
    try {
      const payload = this.jwtService.verify(token);
      
      if (payload.type !== 'reset') {
        throw new BadRequestException('Token inválido');
      }

      // Hashear la nueva contraseña
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Actualizar password en DB
      await this.userService.updatePassword(payload.sub, hashedPassword);

      return {
        message: 'Contraseña actualizada exitosamente',
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Token expirado o inválido');
    }
  }

  async setInitialPassword(user: any, newPassword: string) {
    const userData = await this.userService.findOne(user.sub);
    if (!userData) {
      throw new NotFoundException('Usuario no encontrado');
    }

    // Hashear la nueva contraseña
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Actualizar password en DB
    await this.userService.updatePassword(user.sub, hashedPassword);

    return {
      message: 'Contraseña actualizada exitosamente',
      usuario: {
        id: userData._id,
        nombre: userData.nombre,
        email: userData.email,
      },
    };
  }
}
