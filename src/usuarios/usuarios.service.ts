import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
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
    delete dto.confirmPassword;

    const data: Usuario = { ...dto };

    return this.prisma.usuarios.create({ data }).catch(this.handleError);
  }

  async update(id: string, dto: UpdateUsuarioDto): Promise<Usuario> {
    await this.findById(id);

    delete dto.confirmPassword;

    const data: Partial<Usuario> = { ...dto };

    return this.prisma.usuarios
      .update({
        where: { id },
        data,
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

    // NOVO CÓDIGO PARA LOGAR ERRO
    if (!lastErrorLine) {
      console.error(error);
    }

    throw new UnprocessableEntityException(
      lastErrorLine || 'Algum erro ocorreu ao executar a operação',
    );
  }
}
