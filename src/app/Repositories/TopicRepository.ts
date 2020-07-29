import { Topic } from '@entity/index';
import { Exception } from '@service/Exception';

export class TopicRepository {
  async listTopic(params) {
    const page_index = params.page_index || 1;
    const page_size = params.page_size || 10;
    const topics = await Topic.createQueryBuilder('topic')
      .orderBy('id', 'DESC')
      .take(page_size)
      .skip((page_index - 1) * page_size)
      .getManyAndCount();
    return {
      data: topics[0],
      totalRow: topics[1],
      totalPage: Math.ceil(topics[1] / page_size),
      currentPage: page_index,
      perPage: page_size
    };
  }

  async create(data) {
    const topic = await Topic.create(data).save();
    return topic;
  }
}
