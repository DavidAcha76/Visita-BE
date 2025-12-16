import { PartialType } from '@nestjs/swagger';
import { CreateAtractivoDto } from './create-atractivo.dto';

export class UpdateAtractivoDto extends PartialType(CreateAtractivoDto) {}
