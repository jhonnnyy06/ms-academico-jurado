import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Jurado} from './jurado.model';

@model()
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
