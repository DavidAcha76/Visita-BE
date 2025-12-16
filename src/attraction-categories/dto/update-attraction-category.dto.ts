import { PartialType } from '@nestjs/swagger';
import { CreateAttractionCategoryDto } from './create-attraction-category.dto';

export class UpdateAttractionCategoryDto extends PartialType(CreateAttractionCategoryDto) {}
