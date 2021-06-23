import { User, UserRole, IMAGEABLE_TYPE_USER, Image } from '@entity/index';
import { Auth } from '@service/Auth';
import { Exception } from '@service/Exception';

export class UserRepository {
  async getAll(params) {
    const page_index = params.page_index || 1;
    const page_size = params.page_size || 10;
    const users = await User.createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'roles')
      .leftJoinAndSelect('user.image', 'image', 'image.imageable_type = :imageable_type', {
        imageable_type: IMAGEABLE_TYPE_USER
      })
      .orderBy('user.id', 'DESC')
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
    const user = await User.createQueryBuilder('user')
      .leftJoinAndSelect('user.image', 'image', 'image.imageable_type = :imageable_type', {
        imageable_type: IMAGEABLE_TYPE_USER
      })
      .where('user.id = :id', { id: id })
      .getOne();
    return user;
  }

  async getByEmail(email: string) {
    const user = await User.createQueryBuilder('user').where('user.email = :email', { email: email }).getOne();
    return user;
  }

  async create(data) {
    if (await this.getByEmail(data.email)) {
      throw new Exception('Email is existing', 404);
    }
    const user = { ...data, ...{ password: Auth.hash(data.password) } };
    const result = await User.create(user).save();
    await UserRole.create({ user_id: result.id, role_id: 2 }).save();
    if (data.avatar) {
      await Image.create({
        imageable_id: result.id,
        imageable_type: IMAGEABLE_TYPE_USER,
        url: data.avatar,
        type: 1
      }).save();
    }
    return result;
  }

  async update(id: number, data) {
    const user = await this.getById(id);
    if (!user) throw new Exception('User Not Found !', 404);
    if (await this.getByEmail(data.email)) throw new Exception('Email is existing', 404);
    if (data.password) data.password = Auth.hash(data.password);
    Object.assign(user, data);
    await user.save();
    if (data.avatar) {
      const avatar = await Image.findOne({ where: { imageable_id: user.id, imageable_type: IMAGEABLE_TYPE_USER } });
      if (!avatar) {
        await Image.create({
          imageable_id: user.id,
          imageable_type: IMAGEABLE_TYPE_USER,
          url: data.avatar,
          type: 1
        }).save();
      } else {
        avatar.url = data.avatar;
        await avatar.save();
      }
    }
    return user;
  }

  async delete(id: number) {
    const user = await User.findOne({ id });
    if (!user) throw new Exception('User Not Found !', 404);
    await user.remove();
    return true;
  }
}
