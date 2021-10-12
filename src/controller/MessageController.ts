import { Request, Response } from 'express';
import { MessageService } from '@service/index';
import { ApiRespone } from '@util/ApiRespone';
import { App } from '@provider/App';
import * as Joi from '@hapi/joi';

export class MessageController {
  async create(req: Request, res: Response) {
    const { body, user_id } = req;
    const valid = Joi.object({
      group_id: Joi.number().required(),
      message: Joi.string().required()
    });
    const { error, value } = valid.validate(body);
    if (error) {
      res.status(400).json(ApiRespone.error({ message: error.details[0].message, errorCode: 400 }));
    }
    try {
      const result = await App.make(MessageService).store({ ...value, ...{ sender_id: user_id } });
      res.json(ApiRespone.item(result));
    } catch (err) {
      res.status(err.errorCode).json(ApiRespone.error(err));
    }
  }
}
