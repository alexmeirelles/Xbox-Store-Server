import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuarioService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Usuario[]> {
    return this.prisma.usuarios.findMany();
  }

  async findById(id: string): Promise<Usuario> {
    const record = await this.prisma.usuarios.findUnique({ where: { id } });

    if (!record) {
      throw new NotFoundException(`Registro com o '${id}' não encontrado.`);
    }

    return record;
  }

  findOne(id: string): Promise<Usuario> {
    return this.prisma.usuarios.findUnique({ where: { id } });
  }

  create(dto: CreateUsuarioDto): Promise<Usuario> {
    const data: Usuario = { ...dto };

    return this.prisma.usuarios.create({ data });
  }

  async update(id: string, dto: UpdateUsuarioDto): Promise<Usuario> {
    await this.findById(id);

    const data: Partial<Usuario> = { ...dto };

    return this.prisma.usuarios.update({
      where: { id },
      data,
    });
  }
  async delete(id: string) {
    await this.findById(id);

    await this.prisma.usuarios.delete({ where: { id } });
  }
}
