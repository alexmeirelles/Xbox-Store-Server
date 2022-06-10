import { Module } from '@nestjs/common';
import { UsuarioService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PrismaModule, PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [UsuariosController],
  providers: [UsuarioService],
})
export class UsuariosModule {}
