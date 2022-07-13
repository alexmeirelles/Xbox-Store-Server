import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {
  private usuarioSelect = {
    id: true,
    name: true,
    email: true,
    password: false,
    cpf: false,
    isAdmin: false,
    createdAt: true,
    updatedAt: true,
  };
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Usuario[]> {
    return this.prisma.usuarios.findMany({
      select: this.usuarioSelect,
    });
  }

  async findById(id: string): Promise<Usuario> {
    const record = await this.prisma.usuarios.findUnique({
      where: { id },
      select: this.usuarioSelect,
    });

    if (!record) {
      throw new NotFoundException(`Registro com o '${id}' não encontrado.`);
    }

    return record;
  }

  async findOne(id: string): Promise<Usuario> {
    return this.prisma.usuarios.findUnique({ where: { id } });
  }

  async create(dto: CreateUsuarioDto): Promise<Usuario> {
    if (dto.password != dto.confirmPassword) {
      throw new BadRequestException('As senhas informadas não são iguais.');
    }

    delete dto.confirmPassword;

    const data: Usuario = {
      ...dto,
      password: await bcrypt.hash(dto.password, 10),
    };

    return this.prisma.usuarios
      .create({
        data: { ...data },
        select: this.usuarioSelect,
      })
      .catch(this.handleError);
  }

  async update(id: string, dto: UpdateUsuarioDto): Promise<Usuario> {
    await this.findById(id);

    if (dto.password) {
      if (dto.password != dto.confirmPassword) {
        throw new BadRequestException('As senhas informadas não são iguais.');
      }
    }

    delete dto.confirmPassword;

    const data: Partial<Usuario> = { ...dto };

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    return this.prisma.usuarios
      .update({
        where: { id },
        data,
        select: this.usuarioSelect,
      })
      .catch(this.handleError);
  }
  async delete(id: string) {
    await this.findById(id);

    await this.prisma.usuarios.delete({ where: { id } });
  }
  handleError(error: Error): undefined {
    const errorLines = error.message?.split('\n');
    const lastErrorLine = errorLines[errorLines.length - 1]?.trim();

    if (!lastErrorLine) {
      console.error(error);
    }

    throw new UnprocessableEntityException(
      lastErrorLine || 'Algum erro ocorreu ao executar a operação',
    );
  }
}
