import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransportRoutesService } from './transport-routes.service';
import { TransportRoutesController } from './transport-routes.controller';
import { TransportRoute, TransportRouteSchema } from './transport-route.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: TransportRoute.name, schema: TransportRouteSchema }])],
  controllers: [TransportRoutesController],
  providers: [TransportRoutesService],
  exports: [TransportRoutesService],
})
export class TransportRoutesModule {}
