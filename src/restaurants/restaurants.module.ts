import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RestaurantsService } from './restaurants.service';
import { RestaurantsController } from './restaurants.controller';
import { Restaurante, RestauranteSchema } from './schemas/restaurante.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Restaurante.name, schema: RestauranteSchema },
    ]),
  ],
  controllers: [RestaurantsController],
  providers: [RestaurantsService],
  exports: [RestaurantsService],
})
export class RestaurantsModule {}
