import { User } from '../models/user.model';

export interface RequestBackpack {
  token?: string | null;
  authUser?: User;
}
