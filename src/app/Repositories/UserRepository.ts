import { User } from '@entity/index';
import { Auth } from '@service/Auth';
import { Repository } from './Repository';
import { getRepository } from 'typeorm';

export class UserRepository extends Repository {
  repository: any;
  constructor() {
    super();
    this.repository = getRepository(User);
  }
  async getAll() {
    const users = await this.relation(['roles', 'images']).get();
    return users;
  }

  async getById(id: number) {
    const users = await this.relation(['roles', 'images']).findById(id);
    return users;
  }

  async getByEmail(email: string) {
    const user = await this.where('email', email).first();
    return user;
  }

  async create(user) {
    const data = { ...user, ...{ password: Auth.hash(user.password) } };
    const newUser = await this.repository.save(data);
    return newUser;
  }
}
