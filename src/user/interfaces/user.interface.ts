export interface User {
  _id?: string;
  id: string;
  email: string;
  nombre: string;
  rol: string;
  password?: string;
  debe_cambiar_password?: boolean;
  estado?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
