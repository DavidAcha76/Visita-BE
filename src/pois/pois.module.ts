import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PoisService } from './pois.service';
import { PoisController } from './pois.controller';
import { Poi, PoiSchema } from './schemas/poi.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Poi.name, schema: PoiSchema }])],
  controllers: [PoisController],
  providers: [PoisService],
})
export class PoisModule {}
