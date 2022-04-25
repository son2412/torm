import { User } from '@entity/index';

declare namespace Express {
  interface Request {
    user_id?: number;
    user?: User;
    language?: string;
  }
}
