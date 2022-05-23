import { ApiProperty } from '@nestjs/swagger';

export class CreateGenerosDto {
  @ApiProperty({
    description: 'O número da mesa',
    example: 'xxxxx',
  })
  id: string;
  name: string;
}
