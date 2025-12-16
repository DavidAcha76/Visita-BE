export interface Location {
  address: string;
  place: string;
  coords?: {
    lng: string;
    lat: string;
  };
}

export interface Announcement {
  _id?: string;
  date: string;
  coverUrl?: string;
  color?: string;
  available?: boolean;
  description?: string;
  location: Location;
  type: string;
  title: string;
  order?: number;
  link?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
