import { Request, Response } from 'express';
import { GroupService } from '@service/index';
import { ApiRespone } from '@util/ApiRespone';
import { App } from '@provider/App';
import * as Joi from '@hapi/joi';

export class GroupController {
  async index(req: Request, res: Response) {
    const { query, user_id } = req;
    const valid = Joi.object({
      page_index: Joi.string(),
      page_size: Joi.string()
    });
    const { error, value } = valid.validate(query);
    if (error) {
      res.status(400).json(ApiRespone.error({ message: error.details[0].message, errorCode: 400 }));
    }
    try {
      const result = await App.make(GroupService).index({ ...value, ...{ user_id } });
      res.json(ApiRespone.paginate(result));
    } catch (err) {
      res.status(err.errorCode).json(ApiRespone.error(err));
    }
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const result = await App.make(GroupService).show(Number(id));
      res.json(ApiRespone.item(result));
    } catch (err) {
      res.status(err.errorCode).json(ApiRespone.error(err));
    }
  }

  async store(req: Request, res: Response) {
    const { body, user_id } = req;
    const valid = Joi.object({
      name: Joi.string(),
      avatar: Joi.string()
    });
    const { error, value } = valid.validate(body);
    if (error) {
      res.status(400).json(ApiRespone.error({ message: error.details[0].message, errorCode: 400 }));
    }
    try {
      const result = await App.make(GroupService).store({ ...value, ...{ creator_id: user_id } });
      res.json(ApiRespone.item(result));
    } catch (err) {
      res.status(err.errorCode).json(ApiRespone.error(err));
    }
  }

  async update(req: Request, res: Response) {
    const { body } = req;
    const valid = Joi.object({
      name: Joi.string(),
      avatar: Joi.string()
    });
    const { error, value } = valid.validate(body);
    if (error) {
      res.status(400).json(ApiRespone.error({ message: error.details[0].message, errorCode: 400 }));
    }
    try {
      const result = await App.make(GroupService).update(Number(req.params.id), value);
      res.json(ApiRespone.item(result));
    } catch (err) {
      res.status(err.errorCode).json(ApiRespone.error(err));
    }
  }

  async destroy(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await App.make(GroupService).destroy(id);
      res.json(ApiRespone.success());
    } catch (err) {
      res.status(err.errorCode).json(ApiRespone.error(err));
    }
  }

  async list(req: Request, res: Response) {
    const { user_id } = req;
    try {
      const result = await App.make(GroupService).list(user_id);
      res.json(ApiRespone.collection(result));
    } catch (err) {
      res.status(err.errorCode).json(ApiRespone.error(err));
    }
  }
}
