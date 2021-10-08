import { UserGroup } from '@entity/index';

export class UserGroupRepository {
  async getByUser(id: number) {
    const result = await UserGroup.find({ where: { user_id: id } });
    return result;
  }

  async store(data: { user_id: number; group_id: number }) {
    return await UserGroup.create(data).save();
  }
}
