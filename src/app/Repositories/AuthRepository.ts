import { getRepository } from 'typeorm';
import { User } from '@entity/index';
import { Auth } from '@service/Auth';
import { Exception } from '@service/Exception';
import { UserRepository } from './UserRepository';

export class AuthRepository {
  async login(data: any) {
    const repository = new UserRepository();
    const user = await repository.getByEmail(data.email);
    if (!user) throw new Exception('User not found', 1001);
    const isValidPassword = Auth.check(data.password, user.password);
    if (isValidPassword === false) throw new Exception('Password not match', 1001);

    return { token: Auth.generateToken(user) };
  }

  async register(data) {
    const repository = new UserRepository();
    if (await repository.getByEmail(data.email)) throw new Exception('Email is existing', 1001);

    const user = await repository.create(data);
    return { token: Auth.generateToken(user) };
  }
}
