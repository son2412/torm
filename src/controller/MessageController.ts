import { Request, Response } from 'express';
import { MessageService } from '@service/index';
import { ApiRespone } from '@util/ApiRespone';
import { App } from '@provider/App';
import * as Joi from 'joi';
import { StatusCodes } from 'http-status-codes';
import { InvalidInput } from '@const/error';

export class MessageController {
  async create(req: Request, res: Response) {
    const { body, user_id } = req;
    const valid = Joi.object({
      group_id: Joi.number().required(),
      message: Joi.string().required()
    });
    const { error, value } = valid.validate(body);
    if (error) return res.status(StatusCodes.BAD_REQUEST).json(ApiRespone.error(InvalidInput));

    try {
      const result = await App.make(MessageService).store({ ...value, ...{ sender_id: user_id } });
      return res.json(ApiRespone.item(result));
    } catch (err) {
      return res.status(err.errorCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ApiRespone.error(err));
    }
  }
}
