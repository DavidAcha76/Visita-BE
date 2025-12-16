import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Hotel } from './schemas/hotel.schema';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';

@Injectable()
export class HotelsService {
  constructor(@InjectModel(Hotel.name) private hotelModel: Model<Hotel>) {}

  async findAll(): Promise<Hotel[]> {
    return this.hotelModel.find().exec();
  }

  async findOne(id: string): Promise<Hotel> {
    const hotel = await this.hotelModel.findById(id).exec();
    if (!hotel) {
      throw new NotFoundException(`Hotel con id ${id} no encontrado`);
    }
    return hotel;
  }

  async create(createHotelDto: CreateHotelDto): Promise<Hotel> {
    const nuevoHotel = new this.hotelModel(createHotelDto);
    return nuevoHotel.save();
  }

  async update(id: string, updateHotelDto: UpdateHotelDto): Promise<Hotel> {
    const hotelActualizado = await this.hotelModel
      .findByIdAndUpdate(id, updateHotelDto, { new: true })
      .exec();
    
    if (!hotelActualizado) {
      throw new NotFoundException(`Hotel con id ${id} no encontrado`);
    }
    
    return hotelActualizado;
  }

  async delete(id: string): Promise<void> {
    const resultado = await this.hotelModel.findByIdAndDelete(id).exec();
    
    if (!resultado) {
      throw new NotFoundException(`Hotel con id ${id} no encontrado`);
    }
  }
}
