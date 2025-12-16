import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Atractivo } from './schemas/atractivo.schema';
import { CreateAtractivoDto } from './dto/create-atractivo.dto';
import { UpdateAtractivoDto } from './dto/update-atractivo.dto';

@Injectable()
export class AttractionsService {
  constructor(
    @InjectModel(Atractivo.name) private atractivoModel: Model<Atractivo>,
  ) {}

  async create(createAtractivoDto: CreateAtractivoDto): Promise<Atractivo> {
    const createdAtractivo = new this.atractivoModel(createAtractivoDto);
    return createdAtractivo.save();
  }

  async findAll(): Promise<Atractivo[]> {
    return this.atractivoModel.find().exec();
  }

  async findOne(id: string): Promise<Atractivo> {
    const atractivo = await this.atractivoModel.findById(id).exec();
    if (!atractivo) {
      throw new NotFoundException(`Atractivo con id ${id} no encontrado`);
    }
    return atractivo;
  }

  async findByCategoria(categoria: string): Promise<Atractivo[]> {
    return this.atractivoModel.find({ categories: categoria }).exec();
  }

  async update(id: string, updateAtractivoDto: UpdateAtractivoDto): Promise<Atractivo> {
    const updatedAtractivo = await this.atractivoModel
      .findByIdAndUpdate(id, updateAtractivoDto, { new: true })
      .exec();
    
    if (!updatedAtractivo) {
      throw new NotFoundException(`Atractivo con id ${id} no encontrado`);
    }
    return updatedAtractivo;
  }

  async remove(id: string): Promise<void> {
    const result = await this.atractivoModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Atractivo con id ${id} no encontrado`);
    }
  }
}
