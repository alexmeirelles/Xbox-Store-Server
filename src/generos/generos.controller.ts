import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateGenerosDto } from './dto/create-generos.dto';
import { Generos } from './entities/generos.entity';
import { GenerosService } from './generos.service';
import { UpdateGenerosDto } from './dto/update-generos.dto';

@ApiTags('generos')
@Controller('generos')
export class GenerosController {
  constructor(private generosService: GenerosService) {}

  @Get()
  @ApiOperation({
    summary: 'Listar todos os generos',
  })
  findAll(): Promise<Generos[]> {
    return this.generosService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Visualizar uma mesa',
  })
  findOne(@Param('id') id: string): Promise<Generos> {
    return this.generosService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Editar um genero pelo ID',
  })
  update(@Param('id') id: string, @Body() dto: UpdateGenerosDto): Promise<Genero> {
    return this.generosService.update(id, dto);
  }

  @Post()
  @ApiOperation({
    summary: 'Criar uma mesa',
  })
  create(@Body() createGenerosDto: CreateGenerosDto) {
    return this.generosService.create(createGenerosDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Remover um genero pelo ID',
  })
  delete(@Param('id') id: string) {
    this.generosService.delete(id);
  }

}
