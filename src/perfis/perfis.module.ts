import { Module } from '@nestjs/common';
import { PerfilService } from './perfis.service';
import { PerfisController } from './perfis.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PrismaModule, PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [PerfisController],
  providers: [PerfilService],
})
export class PerfisModule {}
