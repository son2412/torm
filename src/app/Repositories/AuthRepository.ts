import { getRepository } from 'typeorm';
import { User } from '@entity/index';
import { Auth } from '@service/Auth';
import { Exception } from '@service/Exception';
import { UserRepository } from './UserRepository';
import { LoginData, SignUpData } from 'types/types';

export class AuthRepository {
  async login(data: LoginData) {
    const repository = new UserRepository();
    const user = await repository.getByEmail(data.email);
    if (!user) throw new Exception('User not found', 404);
    const isValidPassword = Auth.check(data.password, user.password);
    if (isValidPassword === false) throw new Exception('Password not match', 400);

    return { token: Auth.generateToken(user) };
  }

  async register(data: SignUpData) {
    const repository = new UserRepository();
    if (await repository.getByEmail(data.email)) throw new Exception('Email is existing', 404);

    const user = await repository.create(data);
    return { token: Auth.generateToken(user) };
  }
}
