import { Injectable } from '@nestjs/common';
import { CreateGenerosDto } from './dto/create-generos.dto';
import { Generos } from './entities/generos.entity';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateGenerosDto } from './dto/update-generos.dto';

@Injectable()
export class GenerosService {
  generos: Generos[] = [];

  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Generos[]> {
    return this.prisma.generos.findMany();
  }

  findOne(id: string): Promise<Generos> {
    return this.prisma.genero.findUnique({ where: { id }});
  }

  create(dto: CreateGenerosDto): Promise<Generos> {
  const data: Generos = { ...dto };

  return this.prisma.genero.create({ data });
  }

  update(id: string, dto: UpdateGeneroDto): Promise<Generos> {
    const data: Partial<Generos> = { ...dto };

    return this.prisma.table.update({
      where: { id },
      data,
    });

    async delete(id: string) {
      await this.findById(id);
      await this.prisma.table.delete({ where: { id } });
    }
}
