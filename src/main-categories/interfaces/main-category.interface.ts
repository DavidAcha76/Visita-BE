export interface MainCategory {
  _id?: string;
  name: string;
  isFeatured?: boolean;
  photoUrl?: string;
  icon?: string;
  available?: boolean;
  order: number;
  createdAt?: Date;
  updatedAt?: Date;
}
