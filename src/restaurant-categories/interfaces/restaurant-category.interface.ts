export interface RestaurantCategory {
  _id?: string;
  name: string;
  available?: boolean;
  order: number;
  createdAt?: Date;
  updatedAt?: Date;
}
