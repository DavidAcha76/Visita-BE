import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().select('-password').exec();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id).select('-password').exec();
    if (!user) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new ConflictException('El email ya está registrado');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const nuevoUsuario = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    });
    
    const savedUser = await nuevoUsuario.save();
    const { password, ...result } = savedUser.toObject();
    return result as any;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    const usuarioActualizado = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .select('-password')
      .exec();
    
    if (!usuarioActualizado) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }
    
    return usuarioActualizado;
  }

  async delete(id: string): Promise<void> {
    const resultado = await this.userModel.findByIdAndDelete(id).exec();
    
    if (!resultado) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }
  }

  async updatePassword(id: string, hashedPassword: string): Promise<User> {
    const usuarioActualizado = await this.userModel
      .findByIdAndUpdate(id, { password: hashedPassword }, { new: true })
      .select('-password')
      .exec();
    
    if (!usuarioActualizado) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }
    
    return usuarioActualizado;
  }
}
