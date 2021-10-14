import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {UsuarioJurado, UsuarioJuradoRelations, Jurado} from '../models';
import {JuradoRepository} from './jurado.repository';

export class UsuarioJuradoRepository extends DefaultCrudRepository<
  UsuarioJurado,
  typeof UsuarioJurado.prototype.id,
  UsuarioJuradoRelations
> {

  public readonly tiene: BelongsToAccessor<Jurado, typeof UsuarioJurado.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('JuradoRepository') protected juradoRepositoryGetter: Getter<JuradoRepository>,
  ) {
    super(UsuarioJurado, dataSource);
    this.tiene = this.createBelongsToAccessorFor('tiene', juradoRepositoryGetter,);
    this.registerInclusionResolver('tiene', this.tiene.inclusionResolver);
  }
}
