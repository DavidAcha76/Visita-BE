import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Announcement } from './schemas/announcement.schema';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';

@Injectable()
export class AnnouncementsService {
  constructor(@InjectModel(Announcement.name) private announcementModel: Model<Announcement>) {}

  async findAll(): Promise<Announcement[]> {
    return this.announcementModel.find().sort({ order: 1 }).exec();
  }

  async findOne(id: string): Promise<Announcement> {
    const announcement = await this.announcementModel.findById(id).exec();
    if (!announcement) {
      throw new NotFoundException(`Anuncio con id ${id} no encontrado`);
    }
    return announcement;
  }

  async create(createAnnouncementDto: CreateAnnouncementDto): Promise<Announcement> {
    const nuevoAnuncio = new this.announcementModel(createAnnouncementDto);
    return nuevoAnuncio.save();
  }

  async update(id: string, updateAnnouncementDto: UpdateAnnouncementDto): Promise<Announcement> {
    const anuncioActualizado = await this.announcementModel
      .findByIdAndUpdate(id, updateAnnouncementDto, { new: true })
      .exec();
    
    if (!anuncioActualizado) {
      throw new NotFoundException(`Anuncio con id ${id} no encontrado`);
    }
    
    return anuncioActualizado;
  }

  async delete(id: string): Promise<void> {
    const resultado = await this.announcementModel.findByIdAndDelete(id).exec();
    
    if (!resultado) {
      throw new NotFoundException(`Anuncio con id ${id} no encontrado`);
    }
  }
}
