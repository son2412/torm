import { MessageRepository } from '@repository/index';
import { FirebaseService } from '@util/Firebase';
import { MessageData, messageGroup } from 'types/types';


const repository = new MessageRepository();
export class MessageService {
  async index(params: messageGroup) {
    return await repository.getMessageByGroup(params);
  }

  async store(data: MessageData) {
    const message = await repository.create(data);
    // new FirebaseService().createChildMessage(data.group_id, { ...message, ...{ created_at: `${message.created_at}` } });
    return message;
  }
}
