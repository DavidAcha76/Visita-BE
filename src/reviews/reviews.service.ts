import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review } from './schemas/review.schema';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewsService {
  constructor(@InjectModel(Review.name) private reviewModel: Model<Review>) {}

  async findAll(): Promise<Review[]> {
    return this.reviewModel.find().sort({ fecha: -1 }).exec();
  }

  async findOne(id: string): Promise<Review> {
    const review = await this.reviewModel.findById(id).exec();
    if (!review) {
      throw new NotFoundException(`Reseña con id ${id} no encontrada`);
    }
    return review;
  }

  async findByEntity(entidadId: string, entidadTipo: string): Promise<Review[]> {
    return this.reviewModel.find({ entidad_id: entidadId, entidad_tipo: entidadTipo }).sort({ fecha: -1 }).exec();
  }

  async create(createReviewDto: CreateReviewDto): Promise<Review> {
    const nuevaReview = new this.reviewModel(createReviewDto);
    return nuevaReview.save();
  }

  async update(id: string, updateReviewDto: UpdateReviewDto): Promise<Review> {
    const reviewActualizada = await this.reviewModel
      .findByIdAndUpdate(id, updateReviewDto, { new: true })
      .exec();
    
    if (!reviewActualizada) {
      throw new NotFoundException(`Reseña con id ${id} no encontrada`);
    }
    
    return reviewActualizada;
  }

  async delete(id: string): Promise<void> {
    const resultado = await this.reviewModel.findByIdAndDelete(id).exec();
    
    if (!resultado) {
      throw new NotFoundException(`Reseña con id ${id} no encontrada`);
    }
  }
}
