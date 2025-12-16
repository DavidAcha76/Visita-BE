import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Restaurante } from './schemas/restaurante.schema';
import { CreateRestauranteDto } from './dto/create-restaurante.dto';
import { UpdateRestauranteDto } from './dto/update-restaurante.dto';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectModel(Restaurante.name) private restauranteModel: Model<Restaurante>,
  ) {}

  async create(createRestauranteDto: CreateRestauranteDto): Promise<Restaurante> {
    const createdRestaurante = new this.restauranteModel(createRestauranteDto);
    return createdRestaurante.save();
  }

  async findAll(): Promise<Restaurante[]> {
    return this.restauranteModel.find().exec();
  }

  async findOne(id: number): Promise<Restaurante> {
    const restaurante = await this.restauranteModel.findOne({ id }).exec();
    if (!restaurante) {
      throw new NotFoundException(`Restaurante con id ${id} no encontrado`);
    }
    return restaurante;
  }

  async findByCategoria(categoria: string): Promise<Restaurante[]> {
    return this.restauranteModel.find({ categoria }).exec();
  }

  async update(id: number, updateRestauranteDto: UpdateRestauranteDto): Promise<Restaurante> {
    const updatedRestaurante = await this.restauranteModel
      .findOneAndUpdate({ id }, updateRestauranteDto, { new: true })
      .exec();
    
    if (!updatedRestaurante) {
      throw new NotFoundException(`Restaurante con id ${id} no encontrado`);
    }
    return updatedRestaurante;
  }

  async remove(id: number): Promise<void> {
    const result = await this.restauranteModel.deleteOne({ id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Restaurante con id ${id} no encontrado`);
    }
  }
}
