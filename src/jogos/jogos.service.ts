import { Injectable } from '@nestjs/common';
import { CreateJogosDto } from './dto/create-jogos.dto';
import { Jogos } from './entities/jogos.entity';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateJogosDto } from './dto/update-jogos.dto';

@Injectable()
export class JogosService {

  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Jogos[]> {
    return this.prisma.jogo.findMany();
  }

  findOne(id: string): Promise<Jogos> {
    return this.prisma.table.findUnique({ where: { id }});
  }

  create(dto: CreateJogosDto): Promise<Jogos> {
    const data: Jogos = { ...dto };

    return this.prisma.jogo.create({
      data });
  }

  update(id: string, dto: UpdateJogosDto): Promise<Jogos> {
    const data: Partial<Jogos> = { ...dto };

    return this.prisma.table.update({
      where: { id },
      data,
    });

    async delete(id: string) {
      await this.findById(id);
      await this.prisma.table.delete({ where: { id } });
    }
}
