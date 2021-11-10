import { Group, Message } from '@entity/index';
import { Exception } from '@util/Exception';
import { UserGroup } from '@entity/UserGroup';
import { In } from 'typeorm';
import { GroupType, MessageType } from '@const/enum';
import { GroupData, paramGroup } from 'types/types';

export class GroupRepository {
  async getGroupByIds(params: paramGroup) {
    const { page_size, page_index, groupIds } = params;
    const pageIndex = page_index || 1;
    const pageSize = page_size || 10;
    if (!groupIds.length) {
      return {
        data: [],
        totalRow: 0,
        totalPage: 0,
        currentPage: pageIndex,
        perPage: pageSize
      };
    }
    const groups = await Group.createQueryBuilder('group')
      .leftJoinAndSelect('group.users', 'users')
      .leftJoinAndSelect('users.image', 'image')
      .where('group.id IN(:...groupIds)', { groupIds: groupIds })
      .take(pageSize)
      .skip((pageIndex - 1) * pageSize)
      .getManyAndCount();
    return {
      data: groups[0],
      totalRow: groups[1],
      totalPage: Math.ceil(groups[1] / pageSize),
      currentPage: pageIndex,
      perPage: pageSize
    };
  }

  async store(data: GroupData) {
    const group = await Group.create({ ...data, ...{ type: GroupType.GROUP } }).save();
    return group;
  }

  async show(group_id: number) {
    const group = await Group.findOne({ where: { id: group_id }, relations: ['users', 'users.image'] });
    if (!group) throw new Exception('Group not found !', 404);
    return group;
  }

  async update(id: number, data: GroupData) {
    const group = await Group.findOne({ where: { id: id } });
    if (!group) throw new Exception('Group not found !', 404);
    Object.assign(group, data);
    await group.save();
    return group;
  }

  async leave(group_id: number, user_id: number) {
    const group = await Group.findOne({ where: { id: group_id } });
    if (!group) throw new Exception('Group not found !', 404);
    const user_group = await UserGroup.findOne({ where: { user_id: user_id, group_id: group_id } });
    if (!user_group) throw new Exception('User not exist in group !', 404);
    await user_group.remove();
    return true;
  }

  async createChatWith(user_id: number, target_id: number) {
    const user_group = await UserGroup.find({ where: { user_id: user_id }, select: ['group_id'] });
    const groupIds = user_group.map((x) => x.group_id);
    if (groupIds.length > 0) {
      const groups = await Group.find({
        where: { type: GroupType.SINGLE, id: In(groupIds) },
        relations: ['users', 'users.image']
      });
      const find = groups.filter((g) => g.users.find((u) => u.id === target_id));
      if (find.length > 0) {
        return find[0];
      }
    }
    const group = await Group.create({ creator_id: user_id }).save();
    await Promise.all([
      UserGroup.create({ user_id: user_id, group_id: group.id }).save(),
      UserGroup.create({ user_id: target_id, group_id: group.id }).save(),
      Message.create({
        sender_id: user_id,
        group_id: group.id,
        message: 'Hello !',
        type: MessageType.TEXT,
        created_at: new Date()
      }).save()
    ]);
    // new FirebaseService().createChildMessage(group.id, Object.assign(message, { created_at: `${message.created_at}` }));
    const result = await this.show(group.id);
    return result;
  }

  async destroy(id: number) {
    const group = await Group.findOne({ where: { id: id } });
    if (!group) throw new Exception('Group Not Found !', 404);
    await group.remove();
    return true;
  }

  async addUserToGroup(group_id: number, user_id: number) {
    const group = await Group.findOne({ where: { id: group_id } });
    if (!group) throw new Exception('Group Not Found !');
    const user_group = await UserGroup.findOne({ where: { group_id: group_id, user_id: user_id } });
    if (user_group) throw new Exception('User is existing tin group');
    await UserGroup.create({ user_id: user_id, group_id: group.id }).save();
    return true;
  }

  async listGroupByIds(groupIds: number[]) {
    if (!groupIds.length) {
      return [];
    }
    const groups = await Group.createQueryBuilder('group')
      .where('group.id IN(:...groupIds)', { groupIds: groupIds })
      .getMany();
    return groups;
  }
}
