export interface Precio {
  check_in: string;
  check_out: string;
}

export interface Ubicacion {
  direccion?: string;
  ciudad?: string;
  pais?: string;
  coordenadas?: {
    lat: number;
    lng: number;
  };
}

export interface Contacto {
  telefono?: string;
  email?: string;
  sitio_web?: string;
}

export interface Hotel {
  _id?: string;
  id: string;
  slug?: string;
  nombre: string;
  descripcion: string;
  estrellas: number;
  rating?: number;
  categorias?: string[];
  amenidades?: string[];
  tipos_habitacion?: string[];
  precio: Precio;
  ubicacion?: Ubicacion;
  contacto?: Contacto;
  disponible?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
