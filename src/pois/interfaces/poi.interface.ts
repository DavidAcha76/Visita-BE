export interface Ubicacion {
  direccion?: string;
  ciudad?: string;
  pais?: string;
  coordenadas?: {
    lat: number;
    lng: number;
  };
}

export interface Poi {
  _id?: string;
  id: string;
  slug?: string;
  nombre: string;
  descripcion: string;
  categorias?: string[];
  tags?: string[];
  ubicacion?: Ubicacion;
  horario: string;
  costo_entrada?: number;
  moneda?: string;
  gratis?: boolean;
  actividades?: string[];
  recomendaciones?: string[];
  disponible?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
