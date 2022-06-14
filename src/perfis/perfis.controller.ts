import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { PerfilService } from './perfis.service';
import { CreatePerfilDto } from './dto/create-perfil.dto';
import { UpdatePerfilDto } from './dto/update-perfil.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { Usuarios } from '@prisma/client';
import { Perfil } from './entities/perfil.entity';

@ApiTags('Perfis')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('perfis')
export class PerfisController {
  constructor(private readonly perfisService: PerfilService) {}

  @Post()
  @ApiOperation({
    summary: 'Criar um perfil',
  })
  create(
    @LoggedUser() user: Usuarios,
    @Body() createPerfilDto: CreatePerfilDto,
  ) {
    return this.perfisService.create(user.id, createPerfilDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Lista todos Perfis',
  })
  findAll(): Promise<Perfil[]> {
    return this.perfisService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Lista um perfil',
  })
  findOne(@Param('id') id: string): Promise<Perfil> {
    return this.perfisService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Edita um perfil',
  })
  update(@Param('id') id: string, @Body() updatePerfilDto: UpdatePerfilDto) {
    return this.perfisService.update(id, updatePerfilDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Deleta um perfil',
  })
  delete(@Param('id') id: string) {
    return this.perfisService.delete(id);
  }
}
