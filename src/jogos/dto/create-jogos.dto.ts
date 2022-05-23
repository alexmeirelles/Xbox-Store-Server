import { ApiProperty } from '@nestjs/swagger';

export class CreateJogosDto {
  @ApiProperty({
    description: 'O número da mesa',
    example: 'xxxxx',
  })
  id?: string;
  name?: string;
}
