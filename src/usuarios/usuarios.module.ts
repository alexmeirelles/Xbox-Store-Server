import { Module } from '@nestjs/common';
import { UsuarioService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UsuariosController],
  providers: [UsuarioService],
})
export class UsuariosModule {}
