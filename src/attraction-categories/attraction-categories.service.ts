import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AttractionCategory } from './schemas/attraction-category.schema';
import { CreateAttractionCategoryDto } from './dto/create-attraction-category.dto';
import { UpdateAttractionCategoryDto } from './dto/update-attraction-category.dto';

@Injectable()
export class AttractionCategoriesService {
  constructor(@InjectModel(AttractionCategory.name) private categoryModel: Model<AttractionCategory>) {}

  async findAll(): Promise<AttractionCategory[]> {
    return this.categoryModel.find().sort({ order: 1 }).exec();
  }

  async findOne(id: string): Promise<AttractionCategory> {
    const category = await this.categoryModel.findById(id).exec();
    if (!category) {
      throw new NotFoundException(`Categoría con id ${id} no encontrada`);
    }
    return category;
  }

  async create(createCategoryDto: CreateAttractionCategoryDto): Promise<AttractionCategory> {
    const nuevaCategoria = new this.categoryModel(createCategoryDto);
    return nuevaCategoria.save();
  }

  async update(id: string, updateCategoryDto: UpdateAttractionCategoryDto): Promise<AttractionCategory> {
    const categoriaActualizada = await this.categoryModel
      .findByIdAndUpdate(id, updateCategoryDto, { new: true })
      .exec();
    
    if (!categoriaActualizada) {
      throw new NotFoundException(`Categoría con id ${id} no encontrada`);
    }
    
    return categoriaActualizada;
  }

  async delete(id: string): Promise<void> {
    const resultado = await this.categoryModel.findByIdAndDelete(id).exec();
    
    if (!resultado) {
      throw new NotFoundException(`Categoría con id ${id} no encontrada`);
    }
  }
}
