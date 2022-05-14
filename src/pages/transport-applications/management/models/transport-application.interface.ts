import { User } from '../../../../features/users/models/user.interface';

export interface TransportApplication {
  id: number;
  driver: User;
  documentPublicId: string;
}
