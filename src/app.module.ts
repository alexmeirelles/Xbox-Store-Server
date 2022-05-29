import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JogosModule } from './jogos/jogos.module';
import { GenerosModule } from './generos/generos.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { PerfisModule } from './perfis/perfis.module';

@Module({
  imports: [JogosModule, GenerosModule, PrismaModule, UsuariosModule, PerfisModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
