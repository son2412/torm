import { TopicRepository } from '@repository/index';
import { MessageData, messageGroup, TopicData } from 'types/types';

const repository = new TopicRepository();
export class TopicService {
  async index(params) {
    return await repository.index(params);
  }

  async store(data: TopicData) {
    return await repository.store(data);
  }
}
