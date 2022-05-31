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

  async findById(name: string): Promise<Generos> {
    const record = await this.prisma.generos.findUnique({ where: { name } });

    if (!record) {
      throw new NotFoundException(`Registro com o '${name}' não encontrado.`);
    }

    return record;
  }

  findOne(name: string): Promise<Generos> {
    return this.findById(name);
  }

  create(dto: CreateGenerosDto): Promise<Generos> {
    const data: Generos = { ...dto };

    return this.prisma.generos.create({ data });
  }

  async update(name: string, dto: UpdateGenerosDto): Promise<Generos> {
    await this.findById(name);

    const data: Partial<Generos> = { ...dto };

    return this.prisma.generos.update({
      where: { name },
      data,
    });
  }
  async delete(name: string) {
    await this.findById(name);

    await this.prisma.generos.delete({ where: { name } });
  }
}
