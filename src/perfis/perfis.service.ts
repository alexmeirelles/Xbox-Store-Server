import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePerfilDto } from './dto/create-perfil.dto';
import { Perfil } from './entities/perfil.entity';
import { PrismaService } from '../prisma/prisma.service';
import { UpdatePerfilDto } from './dto/update-perfil.dto';

@Injectable()
export class PerfilService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Perfil[]> {
    return this.prisma.perfis.findMany();
  }

  async findById(id: string): Promise<Perfil> {
    const record = await this.prisma.perfis.findUnique({ where: { id } });

    if (!record) {
      throw new NotFoundException(`Registro com o '${id}' não encontrado.`);
    }

    return record;
  }

  findOne(id: string): Promise<Perfil> {
    return this.prisma.perfis.findUnique({ where: { id } });
  }

  create(dto: CreatePerfilDto): Promise<Perfil> {
    const data: Perfil = { ...dto };

    return this.prisma.perfis.create({ data });
  }

  async update(id: string, dto: UpdatePerfilDto): Promise<Perfil> {
    await this.findById(id);

    const data: Partial<Perfil> = { ...dto };

    return this.prisma.perfis.update({
      where: { id },
      data,
    });
  }
  async delete(id: string) {
    await this.findById(id);

    await this.prisma.perfis.delete({ where: { id } });
  }
}
