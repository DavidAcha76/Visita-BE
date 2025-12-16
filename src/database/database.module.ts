import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGODB_URI ||
      'mongodb+srv://visitaCocha:aLnJIKZct4gHc28L@visita-cocha.rd6cvks.mongodb.net/visita_cocha?appName=Visita-Cocha',
    ),
  ],
})
export class DatabaseModule {}
