import { Request, Response } from 'express';
import { TopicService } from '@service/index';
import { ApiRespone } from '@util/ApiRespone';
import * as Joi from 'joi';
import { StatusCodes } from 'http-status-codes';
import { InvalidInput } from '@const/error';
import { App } from '@provider/App';

export class TopicController {
  async index(req: Request, res: Response) {
    const { query, user_id } = req;
    const valid = Joi.object({
      page_index: Joi.string(),
      page_size: Joi.string()
    });
    const { error, value } = valid.validate(query);
    if (error) return res.status(StatusCodes.BAD_REQUEST).json(ApiRespone.error(InvalidInput));
    try {
      const result = await App.make(TopicService).index(value);
      return res.json(ApiRespone.paginate(result));
    } catch (err) {
      return res.status(err.errorCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ApiRespone.error(err));
    }
  }

  async store(req: Request, res: Response) {
    const { body, user_id } = req;
    const valid = Joi.object({});
    const { error, value } = valid.validate(body);
    if (error) return res.status(StatusCodes.BAD_REQUEST).json(ApiRespone.error(InvalidInput));
    try {
      const result = await App.make(TopicService).store({ ...value, ...{ user_id } });
      return res.json(ApiRespone.item(result));
    } catch (err) {
      return res.status(err.errorCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ApiRespone.error(err));
    }
  }
}
