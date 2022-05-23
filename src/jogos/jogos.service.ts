import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateJogosDto } from './dto/create-jogos.dto';
import { Jogos } from './entities/jogos.entity';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateJogosDto } from './dto/update-jogos.dto';

@Injectable()
export class JogosService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Jogos[]> {
    return this.prisma.jogos.findMany();
  }

  async findById(id: string): Promise<Jogos> {
    const record = await this.prisma.jogos.findUnique({ where: { id } });

    if (!record) {
      throw new NotFoundException(`Registro com o '${id}' não encontrado.`);
    }

    return record;
  }

  findOne(id: string): Promise<Jogos> {
    return this.prisma.jogos.findUnique({ where: { id } });
  }

  create(dto: CreateJogosDto): Promise<Jogos> {
    const data: Jogos = { ...dto };

    return this.prisma.jogos.create({ data });
  }

  async update(id: string, dto: UpdateJogosDto): Promise<Jogos> {
    await this.findById(id);

    const data: Partial<Jogos> = { ...dto };

    return this.prisma.jogos.update({
      where: { id },
      data,
    });
  }
  async delete(id: string) {
    await this.findById(id);

    await this.prisma.jogos.delete({ where: { id } });
  }
}
