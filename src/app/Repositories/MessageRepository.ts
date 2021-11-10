import { Message } from '@entity/index';
import { MessageData, messageGroup } from 'types/types';

export class MessageRepository {
  async getMessageByGroup(params: messageGroup) {
    const { group_id, page_index, page_size } = params;
    const pageIndex = page_index || 1;
    const pageSize = page_size || 10;
    const groups = await Message.createQueryBuilder('message')
      .where('message.group_id = :group_id', { group_id: group_id })
      .orderBy('id', 'DESC')
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

  async create(data: MessageData) {
    const message = await Message.create({ ...data, ...{ created_at: new Date() } }).save();
    return message;
  }
}
