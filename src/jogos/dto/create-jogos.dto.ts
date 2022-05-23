import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateJogosDto {
  @IsString()
  @ApiProperty({
    description: 'O número da mesa',
    example: 'xxxxx',
  })
  id?: string;
  name?: string;
}
