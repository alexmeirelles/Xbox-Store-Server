import { PartialType } from '@nestjs/swagger';
import { CreatePerfiDto } from './create-perfi.dto';

export class UpdatePerfiDto extends PartialType(CreatePerfiDto) {}
