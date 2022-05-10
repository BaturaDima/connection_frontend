import { City } from './city.interface';
import { Street } from './street.interface';

export interface GeoLocation {
  city: City;
  street: Street;
  home: number;
}
