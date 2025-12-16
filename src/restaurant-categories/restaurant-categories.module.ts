import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RestaurantCategoriesService } from './restaurant-categories.service';
import { RestaurantCategoriesController } from './restaurant-categories.controller';
import { RestaurantCategory, RestaurantCategorySchema } from './schemas/restaurant-category.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: RestaurantCategory.name, schema: RestaurantCategorySchema }])],
  controllers: [RestaurantCategoriesController],
  providers: [RestaurantCategoriesService],
})
export class RestaurantCategoriesModule {}
