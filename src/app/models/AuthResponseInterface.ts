import User from './User';

export interface AuthResponseInterface {
  user: User;
  access_token: string;
}
