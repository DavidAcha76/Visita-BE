import { IsString, IsNotEmpty, IsEmail, IsBoolean, IsOptional, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'ID único del usuario',
    example: 'u-1',
  })
  @IsString()
  @IsNotEmpty({ message: 'El ID es obligatorio' })
  id: string;

  @ApiProperty({
    description: 'Email del usuario',
    example: 'admin@visita.cocha',
  })
  @IsEmail({}, { message: 'Email inválido' })
  @IsNotEmpty({ message: 'El email es obligatorio' })
  email: string;

  @ApiProperty({
    description: 'Nombre completo del usuario',
    example: 'Super Admin',
  })
  @IsString()
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  nombre: string;

  @ApiProperty({
    description: 'Rol del usuario',
    example: 'superadmin',
  })
  @IsString()
  @IsNotEmpty({ message: 'El rol es obligatorio' })
  rol: string;

  @ApiProperty({
    description: 'Contraseña del usuario',
    example: 'Admin123',
    minLength: 6,
  })
  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  password: string;

  @ApiPropertyOptional({
    description: 'Indica si debe cambiar la contraseña en el próximo inicio de sesión',
    example: false,
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  debe_cambiar_password?: boolean;

  @ApiPropertyOptional({
    description: 'Estado del usuario',
    example: 'activo',
    default: 'activo',
  })
  @IsString()
  @IsOptional()
  estado?: string;
}
