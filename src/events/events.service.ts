import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Evento } from './schemas/evento.schema';
import { CreateEventoDto } from './dto/create-evento.dto';
import { UpdateEventoDto } from './dto/update-evento.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Evento.name) private eventoModel: Model<Evento>,
  ) {}

  async create(createEventoDto: CreateEventoDto): Promise<Evento> {
    const createdEvento = new this.eventoModel(createEventoDto);
    return createdEvento.save();
  }

  async findAll(): Promise<Evento[]> {
    return this.eventoModel.find().exec();
  }

  async findOne(id: number): Promise<Evento> {
    const evento = await this.eventoModel.findOne({ id }).exec();
    if (!evento) {
      throw new NotFoundException(`Evento con id ${id} no encontrado`);
    }
    return evento;
  }

  async findByCategoria(categoria: string): Promise<Evento[]> {
    return this.eventoModel.find({ categoria }).exec();
  }

  async findProximos(): Promise<Evento[]> {
    const hoy = new Date().toISOString().split('T')[0];
    return this.eventoModel
      .find({ fecha: { $gte: hoy }, activo: true })
      .sort({ fecha: 1 })
      .exec();
  }

  async update(id: number, updateEventoDto: UpdateEventoDto): Promise<Evento> {
    const updatedEvento = await this.eventoModel
      .findOneAndUpdate({ id }, updateEventoDto, { new: true })
      .exec();
    
    if (!updatedEvento) {
      throw new NotFoundException(`Evento con id ${id} no encontrado`);
    }
    return updatedEvento;
  }

  async remove(id: number): Promise<void> {
    const result = await this.eventoModel.deleteOne({ id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Evento con id ${id} no encontrado`);
    }
  }
}
