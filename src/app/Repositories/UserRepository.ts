import { User, UserRole } from '@entity/index';
import { Auth } from '@service/Auth';
import { Exception } from '@service/Exception';

export class UserRepository {
  async getAll(params) {
    const page_index = params.page_index || 1;
    const page_size = params.page_size || 10;
    const users = await User.createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'roles')
      .take(page_size)
      .skip((page_index - 1) * page_size)
      .getManyAndCount();
    return {
      data: users[0],
      totalRow: users[1],
      totalPage: Math.ceil(users[1] / page_size),
      currentPage: page_index,
      perPage: page_size
    };
  }

  async getById(id: number) {
    const user = await User.createQueryBuilder('user').where('user.id = :id', { id: id }).getOne();
    return user;
  }

  async getByEmail(email: string) {
    const user = await User.createQueryBuilder('user').where('user.email = :email', { email: email }).getOne();
    return user;
  }

  async create(data) {
    if (await this.getByEmail(data.email)) {
      throw new Exception('Email is existing', 1001);
    }
    const user = { ...data, ...{ password: Auth.hash(data.password) } };
    const result = await User.create(user).save();
    await UserRole.create({ user_id: result.id, role_id: 2 }).save();
    return result;
  }

  async update(id: number, data) {
    const user = await this.getById(id);
    if (!user) throw new Exception('User Not Found !');
    if (await this.getByEmail(data.email)) throw new Exception('Email is existing', 1001);
    if (data.password) data.password = Auth.hash(data.password);
    Object.assign(user, data);
    await user.save();
    return user;
  }

  async delete(id: number) {
    const user = await User.findOne({ id });
    if (!user) throw new Exception('User Not Found !');
    await user.remove();
    return true;
  }
}
