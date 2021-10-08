import { GroupRepository, UserGroupRepository } from '@repository/index';
import { GroupData, paramGroup } from 'types/types';

const userGroupRepository = new UserGroupRepository();
const repository = new GroupRepository();
export class GroupService {
  async index(params: paramGroup) {
    const { user_id } = params;
    const userGroups = await userGroupRepository.getByUser(user_id);
    const groupIds = userGroups.map((x) => x.group_id);
    const groups = await repository.getGroupByIds({ ...params, ...{ groupIds } });
    return groups;
  }

  async store(data: GroupData) {
    const { creator_id, name, avatar } = data;
    const group = await repository.store({ name, avatar, creator_id });
    await userGroupRepository.store({ user_id: creator_id, group_id: group.id });
    // new FirebaseService().createChildConversation(group.id);
    return group;
  }

  async show(id: number) {
    return await repository.show(id);
  }

  async update(id: number, data: GroupData) {
    const group = await repository.update(id, data);
    await group.reload();
    return group;
  }

  async destroy(id: number) {
    return await repository.destroy(id);
  }

  async list(user_id: number) {
    const userGroups = await userGroupRepository.getByUser(user_id);
    const groupIds = userGroups.map((x) => x.group_id);
    const groups = await repository.listGroupByIds(groupIds);
    return groups;
  }
}
