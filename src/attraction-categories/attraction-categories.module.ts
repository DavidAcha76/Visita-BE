import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AttractionCategoriesService } from './attraction-categories.service';
import { AttractionCategoriesController } from './attraction-categories.controller';
import { AttractionCategory, AttractionCategorySchema } from './schemas/attraction-category.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: AttractionCategory.name, schema: AttractionCategorySchema }])],
  controllers: [AttractionCategoriesController],
  providers: [AttractionCategoriesService],
})
export class AttractionCategoriesModule {}
