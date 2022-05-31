import { Jogos } from '../../jogos/entities/jogos.entity';
import { Usuario } from './/../../usuarios/entities/usuario.entity';

export class Perfil {
  id?: string;
  title: string;
  imageUrl: string;
  user?: Usuario;
  jogos?: Jogos[];
}
