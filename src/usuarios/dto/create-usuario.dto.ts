import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, MinLength } from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  @ApiProperty({
    description: 'nome do usuário',
    example: 'Alex',
  })
  name: string;

  @IsString()
  @ApiProperty({
    description: 'email do usuário',
    example: 'ale@gmail.com',
  })
  email: string;

  @IsString()
  @MinLength(6)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Senha fraca',
  })
  @ApiProperty({
    description: 'senha usuário',
    example: 'Abcd@123456',
  })
  password: string;

  @ApiProperty({
    description: 'confirmação senha usuário',
    example: 'Abcd@123456',
  })
  confirmPassword: string;

  @IsString()
  @ApiProperty({
    description: 'cpf do usuário',
    example: '123456789',
  })
  cpf: string;

  @ApiProperty({
    description: 'permissoes do usuário usuário',
    example: false,
  })
  isAdmin: boolean;
}
