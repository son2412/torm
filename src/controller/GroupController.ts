import { Request, Response } from 'express';
import { GroupService, MessageService } from '@service/index';
import { ApiRespone } from '@util/ApiRespone';
import { App } from '@provider/App';
import * as Joi from 'joi';
import { StatusCodes } from 'http-status-codes';
import { InvalidInput } from '@const/error';

export class GroupController {
  async index(req: Request, res: Response) {
    const { query, user_id } = req;
    const valid = Joi.object({
      page_index: Joi.string(),
      page_size: Joi.string()
    });
    const { error, value } = valid.validate(query);
    if (error) return res.status(StatusCodes.BAD_REQUEST).json(ApiRespone.error(InvalidInput));

    try {
      const result = await App.make(GroupService).index({ ...value, ...{ user_id } });
      return res.json(ApiRespone.paginate(result));
    } catch (err) {
      return res.status(err.errorCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ApiRespone.error(err));
    }
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const result = await App.make(GroupService).show(Number(id));
      return res.json(ApiRespone.item(result));
    } catch (err) {
      return res.status(err.errorCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ApiRespone.error(err));
    }
  }

  async store(req: Request, res: Response) {
    const { body, user_id } = req;
    const valid = Joi.object({
      name: Joi.string(),
      avatar: Joi.string()
    });
    const { error, value } = valid.validate(body);
    if (error) return res.status(StatusCodes.BAD_REQUEST).json(ApiRespone.error(InvalidInput));

    try {
      const result = await App.make(GroupService).store({ ...value, ...{ creator_id: user_id } });
      return res.json(ApiRespone.item(result));
    } catch (err) {
      return res.status(err.errorCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ApiRespone.error(err));
    }
  }

  async update(req: Request, res: Response) {
    const { body } = req;
    const valid = Joi.object({
      name: Joi.string(),
      avatar: Joi.string()
    });
    const { error, value } = valid.validate(body);
    if (error) return res.status(StatusCodes.BAD_REQUEST).json(ApiRespone.error(InvalidInput));

    try {
      const result = await App.make(GroupService).update(Number(req.params.id), value);
      return res.json(ApiRespone.item(result));
    } catch (err) {
      return res.status(err.errorCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ApiRespone.error(err));
    }
  }

  async destroy(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await App.make(GroupService).destroy(id);
      return res.json(ApiRespone.success());
    } catch (err) {
      return res.status(err.errorCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ApiRespone.error(err));
    }
  }

  async list(req: Request, res: Response) {
    const { user_id } = req;
    try {
      const result = await App.make(GroupService).list(user_id);
      return res.json(ApiRespone.collection(result));
    } catch (err) {
      return res.status(err.errorCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ApiRespone.error(err));
    }
  }

  async messages(req: Request, res: Response) {
    const { query, params, user_id } = req;
    const valid = Joi.object({
      page_index: Joi.string(),
      page_size: Joi.string()
    });
    const { error, value } = valid.validate(query);
    if (error) return res.status(StatusCodes.BAD_REQUEST).json(ApiRespone.error(InvalidInput));

    try {
      const result = await App.make(MessageService).index({ ...value, ...{ user_id, group_id: params.id } });
      return res.json(ApiRespone.paginate(result));
    } catch (err) {
      return res.status(err.errorCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ApiRespone.error(err));
    }
  }
}
