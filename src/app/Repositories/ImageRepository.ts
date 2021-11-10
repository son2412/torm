import { Image } from '@entity/index';
import { ImageData } from 'types/types';

export class ImageRepository {
  async getImage() {}

  async createImage(data: ImageData) {
    const image = await Image.create({
      imageable_id: data.imageable_id,
      imageable_type: data.imageable_type,
      url: data.url,
      type: 1
    }).save();
    return image;
  }
}
