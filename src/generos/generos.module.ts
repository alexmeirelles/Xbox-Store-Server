import { Module } from '@nestjs/common';
import { GenerosController } from './generos.controller';
import { GenerosService } from './generos.service';
import { PrismaModule } from '../prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PrismaModule, PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [GenerosController],
  providers: [GenerosService],
})
export class GenerosModule {}
