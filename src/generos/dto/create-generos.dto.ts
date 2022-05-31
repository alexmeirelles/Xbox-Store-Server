import { ApiProperty } from '@nestjs/swagger';

export class CreateGenerosDto {
  @ApiProperty({
    description: 'O nome do gênero',
    example: 'xxxxx',
  })
  name: string;
}
