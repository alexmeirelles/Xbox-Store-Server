import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreatePerfilDto } from './dto/create-perfil.dto';
import { Perfil } from './entities/perfil.entity';
import { PrismaService } from '../prisma/prisma.service';
import { UpdatePerfilDto } from './dto/update-perfil.dto';

@Injectable()
export class PerfilService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Perfil[]> {
    return this.prisma.perfis.findMany({
      include: {
        user: true,
        Jogos: true,
      },
    });
  }

  async findById(id: string): Promise<Perfil> {
    const record = await this.prisma.perfis.findUnique({
      where: { id: id },
      include: { Jogos: true },
    });

    if (!record) {
      throw new NotFoundException(`Registro com o '${id}' não encontrado.`);
    }

    return record;
  }

  findOne(id: string): Promise<Perfil> {
    return this.prisma.perfis.findUnique({ where: { id } });
  }

  async create(userId: string, dto: CreatePerfilDto): Promise<Perfil> {
    if (dto.gameId) {
      return await this.prisma.perfis
        .create({
          data: {
            title: dto.title,
            imageUrl: dto.imageUrl,
            userId: userId,
            Jogos: {
              connect: {
                id: dto.gameId,
              },
            },
          },
          include: { Jogos: true, user: true },
        })
        .catch(this.handleError);
    } else {
      return await this.prisma.perfis
        .create({
          data: {
            title: dto.title,
            imageUrl: dto.imageUrl,
            userId: userId,
          },
          include: { Jogos: true },
        })
        .catch(this.handleError);
    }
  }

  async update(id: string, dto: UpdatePerfilDto): Promise<Perfil> {
    await this.findById(id);

    return this.prisma.perfis.update({
      where: { id },
      data: {
        title: dto.title,
        imageUrl: dto.imageUrl,
        userId: dto.userId,
      },
      include: { Jogos: true },
    });
  }
  async delete(id: string) {
    await this.findById(id);

    await this.prisma.perfis.delete({ where: { id } });
  }

  handleError(error: Error): undefined {
    const errorLines = error.message?.split('\n');
    const lastErrorLine = errorLines[errorLines.length - 1]?.trim();
    throw new UnprocessableEntityException(
      lastErrorLine || `Algum erro inesperado ocorreu`,
    );
  }
}
