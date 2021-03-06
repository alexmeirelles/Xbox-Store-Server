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
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateJogosDto } from './dto/create-jogos.dto';
import { Jogos } from './entities/jogos.entity';
import { JogosService } from './jogos.service';
import { UpdateJogosDto } from './dto/update-jogos.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('jogos')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('jogos')
export class JogosController {
  constructor(private jogosService: JogosService) {}

  @Get()
  @ApiOperation({
    summary: 'Listar todos os jogos',
  })
  findAll(): Promise<Jogos[]> {
    return this.jogosService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Visualizar um jogo',
  })
  findOne(@Param('id') id: string): Promise<Jogos> {
    return this.jogosService.findById(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Editar um jogo pelo ID',
  })
  update(@Param('id') id: string, @Body() dto: UpdateJogosDto): Promise<Jogos> {
    return this.jogosService.update(id, dto);
  }

  @Post()
  @ApiOperation({
    summary: 'Criar um jogo',
  })
  create(@Body() createJogosDto: CreateJogosDto) {
    return this.jogosService.create(createJogosDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Remover um jogo pelo ID',
  })
  delete(@Param('id') id: string) {
    this.jogosService.delete(id);
  }
}
