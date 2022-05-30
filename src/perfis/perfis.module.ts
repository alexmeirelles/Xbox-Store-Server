import { Module } from '@nestjs/common';
import { PerfilService } from './perfis.service';
import { PerfisController } from './perfis.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PerfisController],
  providers: [PerfilService],
})
export class PerfisModule {}
