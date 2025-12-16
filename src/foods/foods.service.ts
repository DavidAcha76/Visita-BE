import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Food } from './schemas/food.schema';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';

@Injectable()
export class FoodsService {
  constructor(@InjectModel(Food.name) private foodModel: Model<Food>) {}

  async findAll(): Promise<Food[]> {
    return this.foodModel.find().sort({ order: 1 }).exec();
  }

  async findOne(id: string): Promise<Food> {
    const food = await this.foodModel.findById(id).exec();
    if (!food) {
      throw new NotFoundException(`Plato con id ${id} no encontrado`);
    }
    return food;
  }

  async create(createFoodDto: CreateFoodDto): Promise<Food> {
    const nuevoPlato = new this.foodModel(createFoodDto);
    return nuevoPlato.save();
  }

  async update(id: string, updateFoodDto: UpdateFoodDto): Promise<Food> {
    const platoActualizado = await this.foodModel
      .findByIdAndUpdate(id, updateFoodDto, { new: true })
      .exec();
    
    if (!platoActualizado) {
      throw new NotFoundException(`Plato con id ${id} no encontrado`);
    }
    
    return platoActualizado;
  }

  async delete(id: string): Promise<void> {
    const resultado = await this.foodModel.findByIdAndDelete(id).exec();
    
    if (!resultado) {
      throw new NotFoundException(`Plato con id ${id} no encontrado`);
    }
  }
}
