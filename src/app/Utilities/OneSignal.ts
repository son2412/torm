import { Client } from 'onesignal-node';
import { CreateNotificationBody } from 'onesignal-node/lib/types';
import { HTTPError } from 'onesignal-node/lib/errors';

export class OneSignalService {
  service: any;
  getInstance() {
    this.service = new Client(process.env.APP_ID, process.env.API_KEY);
    return this.service;
  }

  async pushNotification(ids: number[], params: { tag: string; title: string; content: string }, data: any) {
    const filters = [];
    ids.map((x) => {
      if (filters.length > 0) {
        filters.push({ operator: 'OR' });
        filters.push({ field: 'tag', key: params.tag, relation: '=', value: x });
      } else {
        filters.push({ field: 'tag', key: params.tag, relation: '=', value: x });
      }
      return true;
    });
    const notification: CreateNotificationBody = {
      headings: { en: params.title, ja: params.title, vi: params.title },
      contents: { en: params.content, ja: params.content, vi: params.content },
      data,
      android_group: `${process.env.APP_NAME}_${data.anyId}`,
      adm_group: `${process.env.APP_NAME}_${data.anyId}`,
      thread_id: `${process.env.APP_NAME}_${data.anyId}`,
      filters
    };
    try {
      const response = await this.getInstance().createNotification(notification);
      console.log(response.body);
      return response;
    } catch (e) {
      if (e instanceof HTTPError) {
        console.log(e.statusCode, e.body);
      }
    }
  }
}
