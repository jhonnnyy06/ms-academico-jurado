import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  UsuarioJurado,
  Jurado,
} from '../models';
import {UsuarioJuradoRepository} from '../repositories';

export class UsuarioJuradoJuradoController {
  constructor(
    @repository(UsuarioJuradoRepository)
    public usuarioJuradoRepository: UsuarioJuradoRepository,
  ) { }

  @get('/usuario-jurados/{id}/jurado', {
    responses: {
      '200': {
        description: 'Jurado belonging to UsuarioJurado',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Jurado)},
          },
        },
      },
    },
  })
  async getJurado(
    @param.path.number('id') id: typeof UsuarioJurado.prototype.id,
  ): Promise<Jurado> {
    return this.usuarioJuradoRepository.tiene(id);
  }
}
