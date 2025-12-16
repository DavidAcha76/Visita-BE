export interface Review {
  _id?: string;
  id: string;
  entidad_id: string;
  entidad_tipo: string;
  usuario: string;
  rating: number;
  titulo: string;
  comentario: string;
  fecha: string;
  viaje_tipo?: string;
  aspectos_positivos?: string[];
  aspectos_negativos?: string[];
  recomendado?: boolean;
  verificado?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
