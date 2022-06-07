import { ApiProperty } from '@nestjs/swagger';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

export class LoginResponseDto {
  @ApiProperty({
    description: 'jwt gerado pelo login',
    example: 'token gerado automaticamnete',
  })
  token: string;

  @ApiProperty({
    description: 'dados usuario autenticado',
  })
  user: Usuario;
}
