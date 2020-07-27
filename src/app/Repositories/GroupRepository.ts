import { Group } from '@entity/index';
import { Exception } from '@service/Exception';
import { UserGroup } from '@entity/UserGroup';

export class GroupRepository {
  async listGroup(params) {
    const page_index = params.page_index || 1;
    const page_size = params.page_size || 10;
    const groups = await Group.createQueryBuilder('group')
      .leftJoinAndSelect('group.users', 'users')
      .where('users.id = :user_id', { user_id: params.user_id })
      .take(page_size)
      .skip((page_index - 1) * page_size)
      .getManyAndCount();
    return {
      data: groups[0],
      totalRow: groups[1],
      totalPage: Math.ceil(groups[1] / page_size),
      currentPage: page_index,
      perPage: page_size
    };
  }

  async create(data) {
    const group = await Group.create(data).save();
    await UserGroup.create({ user_id: data.creator_id, group_id: group.id }).save();
    return group;
  }

  async detail(group_id: number) {
    const group = await Group.findOne({ where: { id: group_id }, relations: ['users'] });
    if (!group) throw new Exception('Group not found !');
    return group;
  }

  async update(group_id: number, data) {
    const group = await Group.findOne({ where: { id: group_id } });
    if (!group) throw new Exception('Group not found !');
    Object.assign(group, data);
    await group.save();
    return group;
  }

  async leave(group_id: number, user_id: number) {
    const group = await Group.findOne({ where: { id: group_id } });
    if (!group) throw new Exception('Group not found !');
    const user_group = await UserGroup.findOne({ where: { user_id: user_id, group_id: group_id } });
    if (!user_group) throw new Exception('User not exist in group !');
    await user_group.remove();
    return true;
  }
}
