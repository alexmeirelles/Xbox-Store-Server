import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGenerosDto } from './dto/create-generos.dto';
import { Generos } from './entities/generos.entity';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateGenerosDto } from './dto/update-generos.dto';

@Injectable()
export class GenerosService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Generos[]> {
    return this.prisma.generos.findMany();
  }

  async findById(id: string): Promise<Generos> {
    const record = await this.prisma.generos.findUnique({ where: { id } });

    if (!record) {
      throw new NotFoundException(`Registro com o '${id}' não encontrado.`);
    }

    return record;
  }

  findOne(id: string): Promise<Generos> {
    return this.prisma.generos.findUnique({ where: { id } });
  }

  create(dto: CreateGenerosDto): Promise<Generos> {
    const data: Generos = { ...dto };

    return this.prisma.generos.create({ data });
  }

  async update(id: string, dto: UpdateGenerosDto): Promise<Generos> {
    await this.findById(id);

    const data: Partial<Generos> = { ...dto };

    return this.prisma.generos.update({
      where: { id },
      data,
    });
  }
  async delete(id: string) {
    await this.findById(id);

    await this.prisma.generos.delete({ where: { id } });
  }
}
