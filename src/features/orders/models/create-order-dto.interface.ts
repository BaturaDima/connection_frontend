import { GeoLocation } from './location.interface';
import { Cargo } from './cargo.interface';

export interface CreateOrderDto {
  userId: number;
  toLocation: GeoLocation;
  fromLocation: GeoLocation;
  cargos: Cargo[];
}