import { Module } from '@nestjs/common';
import { JogosController } from './jogos.controller';
import { JogosService } from './jogos.service';
import { PrismaModule } from '../prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PrismaModule, PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [JogosController],
  providers: [JogosService],
})
export class JogosModule {}
