import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateJogosDto } from './dto/create-jogos.dto';
import { Jogos } from './entities/jogos.entity';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateJogosDto } from './dto/update-jogos.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class JogosService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Jogos[]> {
    return this.prisma.jogos.findMany();
  }

  async findById(id: string) {
    const record = await this.prisma.jogos.findUnique({
      where: { id: id },
      include: { generos: true },
    });

    if (!record) {
      throw new NotFoundException(`Registro com o '${id}' não encontrado.`);
    }

    return record;
  }

  async create(dto: CreateJogosDto) {
    const data: Prisma.JogosCreateInput = {
      title: dto.title,
      description: dto.description,
      coverImageUrl: dto.coverImageUrl,
      year: dto.year,
      imdbScore: dto.imdbScore,
      trailerYoutubeUrl: dto.trailerYoutubeUrl,
      gameplayYoutubeUrl: dto.gameplayYoutubeUrl,
      generos: {
        connect: {
          name: dto.perfilNome,
        },
      },
    };
    return await this.prisma.jogos.create({ data, include: { generos: true } });
  }

  async update(id: string, dto: UpdateJogosDto) {
    const gameAtual = await this.findById(id);
    const data: Prisma.JogosUpdateInput = {
      title: dto.title,
      description: dto.description,
      coverImageUrl: dto.coverImageUrl,
      year: dto.year,
      imdbScore: dto.imdbScore,
      trailerYoutubeUrl: dto.trailerYoutubeUrl,
      gameplayYoutubeUrl: dto.gameplayYoutubeUrl,
      generos: {
        disconnect: {
          name: gameAtual.generos[0].name,
        },
        connect: {
          name: dto.perfilNome,
        },
      },
    };

    return await this.prisma.jogos
      .update({
        where: { id },
        data,
        include: { generos: true },
      })
      .catch(this.handleError);
  }
  async delete(id: string) {
    await this.findById(id);

    await this.prisma.jogos.delete({ where: { id } });
  }

  handleError(error: Error): undefined {
    const errorLines = error.message?.split('\n');
    const lastErrorLine = errorLines[errorLines.length - 1]?.trim();
    throw new UnprocessableEntityException(
      lastErrorLine || `Algum erro inesperado ocorreu`,
    );
  }
}
