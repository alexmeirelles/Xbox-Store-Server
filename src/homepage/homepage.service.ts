import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class HomepageService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(id: string) {
    const profileData = await this.prisma.perfis.findUnique({
      where: { id },
      select: {
        title: true,
        imageUrl: true,
        user: {
          select: {
            name: true,
            isAdmin: true,
          },
        },
        jogos: {
          select: {
            title: true,
            coverImageUrl: true,
            description: true,
            imdbScore: true,
            generos: {
              select: {
                name: true,
              },
            },
          },
        },
        favoritos: {
          select: {
            jogos: true,
          },
        },
      },
    });

    const allGenres = await this.prisma.generos.findMany({
      select: {
        name: true,
        jogos: {
          select: {
            title: true,
            coverImageUrl: true,
          },
        },
      },
    });

    return {
      profileData,
      allGenres,
    };
  }
}
