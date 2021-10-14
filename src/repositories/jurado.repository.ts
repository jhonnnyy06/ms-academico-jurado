import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Jurado, JuradoRelations, UsuarioJurado, AreaInvestigacion, JuradosInvestigacion} from '../models';
import {UsuarioJuradoRepository} from './usuario-jurado.repository';
import {JuradosInvestigacionRepository} from './jurados-investigacion.repository';
import {AreaInvestigacionRepository} from './area-investigacion.repository';

export class JuradoRepository extends DefaultCrudRepository<
  Jurado,
  typeof Jurado.prototype.id,
  JuradoRelations
> {

  public readonly usuarioJurados: HasManyRepositoryFactory<UsuarioJurado, typeof Jurado.prototype.id>;

  public readonly areaInvestigacions: HasManyThroughRepositoryFactory<AreaInvestigacion, typeof AreaInvestigacion.prototype.id,
          JuradosInvestigacion,
          typeof Jurado.prototype.id
        >;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('UsuarioJuradoRepository') protected usuarioJuradoRepositoryGetter: Getter<UsuarioJuradoRepository>, @repository.getter('JuradosInvestigacionRepository') protected juradosInvestigacionRepositoryGetter: Getter<JuradosInvestigacionRepository>, @repository.getter('AreaInvestigacionRepository') protected areaInvestigacionRepositoryGetter: Getter<AreaInvestigacionRepository>,
  ) {
    super(Jurado, dataSource);
    this.areaInvestigacions = this.createHasManyThroughRepositoryFactoryFor('areaInvestigacions', areaInvestigacionRepositoryGetter, juradosInvestigacionRepositoryGetter,);
    this.registerInclusionResolver('areaInvestigacions', this.areaInvestigacions.inclusionResolver);
    this.usuarioJurados = this.createHasManyRepositoryFactoryFor('usuarioJurados', usuarioJuradoRepositoryGetter,);
    this.registerInclusionResolver('usuarioJurados', this.usuarioJurados.inclusionResolver);
  }
}
