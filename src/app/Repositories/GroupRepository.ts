import { Group, Message, MESSAGE_TYPE_TEXT, TYPE_GROUP, TYPE_SINGLE } from '@entity/index';
import { Exception } from '@service/Exception';
import { UserGroup } from '@entity/UserGroup';
import { In } from 'typeorm';
import { FirebaseService } from '@service/Firebase';

export class GroupRepository {
  async listGroup(params) {
    const page_index = params.page_index || 1;
    const page_size = params.page_size || 10;
    const user_group = await UserGroup.find({ where: { user_id: params.user_id }, select: ['group_id'] });
    const groupIds = user_group.map((x) => x.group_id);
    if (!groupIds.length) {
      return {
        data: [],
        totalRow: 0,
        totalPage: 0,
        currentPage: page_index,
        perPage: page_size
      };
    }
    const groups = await Group.createQueryBuilder('group')
      .leftJoinAndSelect('group.users', 'users')
      .leftJoinAndSelect('users.image', 'image')
      .where('group.id IN(:...groupIds)', { groupIds: groupIds })
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
    Object.assign(data, { type: TYPE_GROUP });
    const group = await Group.create(data).save();
    await UserGroup.create({ user_id: data.creator_id, group_id: group.id }).save();
    new FirebaseService().createChildConversation(group.id);
    return group;
  }

  async detail(group_id: number) {
    const group = await Group.findOne({ where: { id: group_id }, relations: ['users', 'users.image'] });
    if (!group) throw new Exception('Group not found !', 404);
    return group;
  }

  async update(group_id: number, data) {
    const group = await Group.findOne({ where: { id: group_id } });
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
      const groups = await Group.find({ where: { type: TYPE_SINGLE, id: In(groupIds) }, relations: ['users'] });
      const find = groups.filter((g) => g.users.find((u) => u.id === target_id));
      if (find.length > 0) {
        return find[0];
      }
    }
    const group = await Group.create({ creator_id: user_id }).save();
    const [me, target, message] = await Promise.all([
      UserGroup.create({ user_id: user_id, group_id: group.id }).save(),
      UserGroup.create({ user_id: target_id, group_id: group.id }).save(),
      Message.create({
        sender_id: user_id,
        group_id: group.id,
        message: 'Hello !',
        type: MESSAGE_TYPE_TEXT,
        created_at: new Date()
      }).save()
    ]);
    new FirebaseService().createChildMessage(group.id, Object.assign(message, { created_at: `${message.created_at}` }));
    const result = await this.detail(group.id);
    return result;
  }

  async delete(id: number) {
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

  async listAllGroup(user_id: number) {
    const user_group = await UserGroup.find({ where: { user_id: user_id }, select: ['group_id'] });
    const groupIds = user_group.map((x) => x.group_id);
    if (!groupIds.length) {
      return [];
    }
    const groups = await Group.createQueryBuilder('group')
      .where('group.id IN(:...groupIds)', { groupIds: groupIds })
      .getMany();
    return groups;
  }
}
