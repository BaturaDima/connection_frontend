import { User } from '../../../users/managemnt/models/user.interface';
import { OrderStatus } from './order-status.interface';
import { GeoLocation } from './location.interface';

export interface Order {
  id: number;
  createdAt: string;
  updatedAt: string;
  user: User;
  fromLocation: GeoLocation;
  toLocation: GeoLocation;
  status: OrderStatus;
}
