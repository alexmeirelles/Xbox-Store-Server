import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGenerosDto {
  @IsString()
  @ApiProperty({
    description: 'O número da mesa',
    example: 'xxxxx',
  })
  id: string;
  name: string;
}
