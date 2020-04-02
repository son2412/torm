import { User } from '@entity/index';
import { Auth } from '@service/Auth';
import { Repository } from './Repository';
import { getRepository } from 'typeorm';
import { Exception } from '@service/Exception';

export class UserRepository extends Repository {
  repository: any;
  constructor() {
    super();
    this.repository = getRepository(User);
  }
  async getAll() {
    const users = await this.relation(['roles', 'image']).paginate();
    return users;
  }

  async getById(id: number) {
    const user = await this.relation(['roles', 'image']).findById(id);
    return user;
  }

  async getByEmail(email: string) {
    const user = await this.where('email', email).first();
    return user;
  }

  async create(user) {
    if (await this.getByEmail(user.email)) {
      throw new Exception('Email is existing', 1001);
    }
    const data = { ...user, ...{ password: Auth.hash(user.password), created_at: new Date(), updated_at: new Date() } };
    const newUser = await this.repository.save(data);
    return newUser;
  }

  async update(id: number, data) {
    if (await this.getByEmail(data.email)) {
      throw new Exception('Email is existing', 1001);
    }
    const newUser = await this.modify(id, data);
    return newUser;
  }

  async delete(id: number) {
    const result = await this.remove(id);
    return result;
  }
}
