import { ApiProperty } from '@nestjs/swagger';

import { IsString } from 'class-validator';

export class CreatePerfilDto {
  @IsString()
  @ApiProperty({
    description: 'nome do perfil',
    example: 'Jonas',
  })
  title: string;
  @IsString()
  @ApiProperty({
    description: 'imagem do perfil',
    example: 'https://image.com/u/link',
  })
  @IsString()
  imageUrl: string;

  userId: string;

  gameId?: string;
}
