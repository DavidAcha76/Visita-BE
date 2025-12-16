import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Poi } from './schemas/poi.schema';
import { CreatePoiDto } from './dto/create-poi.dto';
import { UpdatePoiDto } from './dto/update-poi.dto';

@Injectable()
export class PoisService {
  constructor(@InjectModel(Poi.name) private poiModel: Model<Poi>) {}

  async findAll(): Promise<Poi[]> {
    return this.poiModel.find().exec();
  }

  async findOne(id: string): Promise<Poi> {
    const poi = await this.poiModel.findById(id).exec();
    if (!poi) {
      throw new NotFoundException(`POI con id ${id} no encontrado`);
    }
    return poi;
  }

  async create(createPoiDto: CreatePoiDto): Promise<Poi> {
    const nuevoPoi = new this.poiModel(createPoiDto);
    return nuevoPoi.save();
  }

  async update(id: string, updatePoiDto: UpdatePoiDto): Promise<Poi> {
    const poiActualizado = await this.poiModel
      .findByIdAndUpdate(id, updatePoiDto, { new: true })
      .exec();
    
    if (!poiActualizado) {
      throw new NotFoundException(`POI con id ${id} no encontrado`);
    }
    
    return poiActualizado;
  }

  async delete(id: string): Promise<void> {
    const resultado = await this.poiModel.findByIdAndDelete(id).exec();
    
    if (!resultado) {
      throw new NotFoundException(`POI con id ${id} no encontrado`);
    }
  }
}
