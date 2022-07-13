import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateJogosDto {
  @ApiProperty({
    description: 'O nome do jogo',
    example: 'Resident Evil',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Link da imagem do jogoo',
    example: 'link imagem do jogo',
  })
  @IsString()
  coverImageUrl: string;

  @ApiProperty({
    description: 'descricao do jogo',
    example: ' jogo de terror e zombies',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Ano jogo',
    example: 1990,
  })
  @IsNumber()
  @IsPositive()
  year: number;

  @ApiProperty({
    description: 'Avaliação do jogo',
    example: 5,
  })
  @IsNumber()
  @IsPositive()
  imdbScore: number;

  @ApiProperty({
    description: 'Trailer do jogo',
    example: ' url do filme do jogo',
  })
  @IsString()
  trailerYoutubeUrl: string;

  @ApiProperty({
    description: 'jogando o jogo',
    example: ' url video jogando o jogo',
  })
  @IsString()
  gameplayYoutubeUrl: string;

  @ApiProperty({
    description: 'genero do jogo',
    example: 'terror',
  })
  @IsString()
  generoNome: string;
}
