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
} from '@nestjs/common';
import { PerfilService } from './perfis.service';
import { CreatePerfilDto } from './dto/create-perfil.dto';
import { UpdatePerfilDto } from './dto/update-perfil.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Perfis')
@Controller('perfis')
export class PerfisController {
  constructor(private readonly perfisService: PerfilService) {}

  @Post()
  @ApiOperation({
    summary: 'Criar um perfil',
  })
  create(@Body() createPerfilDto: CreatePerfilDto) {
    return this.perfisService.create(createPerfilDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Lista todos Perfis',
  })
  findAll() {
    return this.perfisService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Lista um perfil',
  })
  findOne(@Param('id') id: string) {
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
