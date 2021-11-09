import { IMAGEABLE_TYPE_TOPIC, Topic } from '@entity/index';
import { TopicData } from 'types/types';
import { ImageRepository } from './ImageRepository';

export class TopicRepository {
  async index(params) {
    const page_index = params.page_index || 1;
    const page_size = params.page_size || 10;
    const topics = await Topic.createQueryBuilder('topic')
      .leftJoinAndSelect('topic.user', 'user')
      .leftJoinAndSelect('topic.images', 'images', 'images.imageable_type = :imageable_type', {
        imageable_type: IMAGEABLE_TYPE_TOPIC
      })
      .orderBy('topic.id', 'DESC')
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

  async store(data: TopicData) {
    const images = data.images;
    delete data['images'];
    const topic = await Topic.create(data).save();
    if (images && images.length) {
      await Promise.all([
        images.map((image) =>
          new ImageRepository().createImage({
            imageable_id: topic.id,
            imageable_type: IMAGEABLE_TYPE_TOPIC,
            url: image.url
          })
        )
      ]);
    }
    return topic;
  }
}
