import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MainCategory } from './schemas/main-category.schema';
import { CreateMainCategoryDto } from './dto/create-main-category.dto';
import { UpdateMainCategoryDto } from './dto/update-main-category.dto';

@Injectable()
export class MainCategoriesService {
  constructor(@InjectModel(MainCategory.name) private mainCategoryModel: Model<MainCategory>) {}

  async findAll(): Promise<MainCategory[]> {
    return this.mainCategoryModel.find().sort({ order: 1 }).exec();
  }

  async findOne(id: string): Promise<MainCategory> {
    const category = await this.mainCategoryModel.findById(id).exec();
    if (!category) {
      throw new NotFoundException(`Categoría principal con id ${id} no encontrada`);
    }
    return category;
  }

  async create(createMainCategoryDto: CreateMainCategoryDto): Promise<MainCategory> {
    const nuevaCategoria = new this.mainCategoryModel(createMainCategoryDto);
    return nuevaCategoria.save();
  }

  async update(id: string, updateMainCategoryDto: UpdateMainCategoryDto): Promise<MainCategory> {
    const categoriaActualizada = await this.mainCategoryModel
      .findByIdAndUpdate(id, updateMainCategoryDto, { new: true })
      .exec();
    
    if (!categoriaActualizada) {
      throw new NotFoundException(`Categoría principal con id ${id} no encontrada`);
    }
    
    return categoriaActualizada;
  }

  async delete(id: string): Promise<void> {
    const resultado = await this.mainCategoryModel.findByIdAndDelete(id).exec();
    
    if (!resultado) {
      throw new NotFoundException(`Categoría principal con id ${id} no encontrada`);
    }
  }
}
