import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AttractionsService } from './attractions.service';
import { AttractionsController } from './attractions.controller';
import { Atractivo, AtractivoSchema } from './schemas/atractivo.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Atractivo.name, schema: AtractivoSchema },
    ]),
  ],
  controllers: [AttractionsController],
  providers: [AttractionsService],
  exports: [AttractionsService],
})
export class AttractionsModule {}
