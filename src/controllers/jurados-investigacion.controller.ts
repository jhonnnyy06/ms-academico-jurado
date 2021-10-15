import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {JuradosInvestigacion} from '../models';
import {JuradosInvestigacionRepository} from '../repositories';

export class JuradosInvestigacionController {
  constructor(
    @repository(JuradosInvestigacionRepository)
    public juradosInvestigacionRepository : JuradosInvestigacionRepository,
  ) {}

  @post('/jurados-investigacions')
  @response(200, {
    description: 'JuradosInvestigacion model instance',
    content: {'application/json': {schema: getModelSchemaRef(JuradosInvestigacion)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(JuradosInvestigacion, {
            title: 'NewJuradosInvestigacion',
            exclude: ['id'],
          }),
        },
      },
    })
    juradosInvestigacion: Omit<JuradosInvestigacion, 'id'>,
  ): Promise<JuradosInvestigacion> {
    return this.juradosInvestigacionRepository.create(juradosInvestigacion);
  }

  @get('/jurados-investigacions/count')
  @response(200, {
    description: 'JuradosInvestigacion model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(JuradosInvestigacion) where?: Where<JuradosInvestigacion>,
  ): Promise<Count> {
    return this.juradosInvestigacionRepository.count(where);
  }

  @get('/jurados-investigacions')
  @response(200, {
    description: 'Array of JuradosInvestigacion model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(JuradosInvestigacion, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(JuradosInvestigacion) filter?: Filter<JuradosInvestigacion>,
  ): Promise<JuradosInvestigacion[]> {
    return this.juradosInvestigacionRepository.find(filter);
  }

  @patch('/jurados-investigacions')
  @response(200, {
    description: 'JuradosInvestigacion PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(JuradosInvestigacion, {partial: true}),
        },
      },
    })
    juradosInvestigacion: JuradosInvestigacion,
    @param.where(JuradosInvestigacion) where?: Where<JuradosInvestigacion>,
  ): Promise<Count> {
    return this.juradosInvestigacionRepository.updateAll(juradosInvestigacion, where);
  }

  @get('/jurados-investigacions/{id}')
  @response(200, {
    description: 'JuradosInvestigacion model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(JuradosInvestigacion, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(JuradosInvestigacion, {exclude: 'where'}) filter?: FilterExcludingWhere<JuradosInvestigacion>
  ): Promise<JuradosInvestigacion> {
    return this.juradosInvestigacionRepository.findById(id, filter);
  }

  @patch('/jurados-investigacions/{id}')
  @response(204, {
    description: 'JuradosInvestigacion PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(JuradosInvestigacion, {partial: true}),
        },
      },
    })
    juradosInvestigacion: JuradosInvestigacion,
  ): Promise<void> {
    await this.juradosInvestigacionRepository.updateById(id, juradosInvestigacion);
  }

  @put('/jurados-investigacions/{id}')
  @response(204, {
    description: 'JuradosInvestigacion PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() juradosInvestigacion: JuradosInvestigacion,
  ): Promise<void> {
    await this.juradosInvestigacionRepository.replaceById(id, juradosInvestigacion);
  }

  @del('/jurados-investigacions/{id}')
  @response(204, {
    description: 'JuradosInvestigacion DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.juradosInvestigacionRepository.deleteById(id);
  }
}
