import { Message } from '@entity/index';
import { Exception } from '@service/Exception';

export class MessageRepository {
  async listMessageByGroup(params) {
    const page_index = params.page_index || 1;
    const page_size = params.page_size || 10;
    const groups = await Message.createQueryBuilder('message')
      .where('message.group_id = :group_id', { group_id: params.group_id })
      .orderBy('id', 'DESC')
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
    const message = await Message.create(data).save();
    return message;
  }
}
