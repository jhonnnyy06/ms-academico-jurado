import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Jurado} from './jurado.model';

@model({
  settings: {
    foreignKeys: {
      fk_usuario_id_jurado: {
        name: 'fk_usuario_id_jurado',
        entity: 'Jurado',
        entityKey: 'id',
        foreignKey: 'id_jurado',
      }
    },
  },
})
export class UsuarioJurado extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  clave: string;

  @belongsTo(() => Jurado, {name: 'tiene'})
  id_jurado: number;

  constructor(data?: Partial<UsuarioJurado>) {
    super(data);
  }
}

export interface UsuarioJuradoRelations {
  // describe navigational properties here
}

export type UsuarioJuradoWithRelations = UsuarioJurado & UsuarioJuradoRelations;
