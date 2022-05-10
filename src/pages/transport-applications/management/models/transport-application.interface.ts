import { User } from '../../../users/managemnt/models/user.interface';

export interface TransportApplication {
  id: number;
  driver: User;
  documentPublicId: string;
}
