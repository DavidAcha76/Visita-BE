import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RestaurantCategory } from './schemas/restaurant-category.schema';
import { CreateRestaurantCategoryDto } from './dto/create-restaurant-category.dto';
import { UpdateRestaurantCategoryDto } from './dto/update-restaurant-category.dto';

@Injectable()
export class RestaurantCategoriesService {
  constructor(@InjectModel(RestaurantCategory.name) private categoryModel: Model<RestaurantCategory>) {}

  async findAll(): Promise<RestaurantCategory[]> {
    return this.categoryModel.find().sort({ order: 1 }).exec();
  }

  async findOne(id: string): Promise<RestaurantCategory> {
    const category = await this.categoryModel.findById(id).exec();
    if (!category) {
      throw new NotFoundException(`Categoría de restaurante con id ${id} no encontrada`);
    }
    return category;
  }

  async create(createCategoryDto: CreateRestaurantCategoryDto): Promise<RestaurantCategory> {
    const nuevaCategoria = new this.categoryModel(createCategoryDto);
    return nuevaCategoria.save();
  }

  async update(id: string, updateCategoryDto: UpdateRestaurantCategoryDto): Promise<RestaurantCategory> {
    const categoriaActualizada = await this.categoryModel
      .findByIdAndUpdate(id, updateCategoryDto, { new: true })
      .exec();
    
    if (!categoriaActualizada) {
      throw new NotFoundException(`Categoría de restaurante con id ${id} no encontrada`);
    }
    
    return categoriaActualizada;
  }

  async delete(id: string): Promise<void> {
    const resultado = await this.categoryModel.findByIdAndDelete(id).exec();
    
    if (!resultado) {
      throw new NotFoundException(`Categoría de restaurante con id ${id} no encontrada`);
    }
  }
}
