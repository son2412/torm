import { Request, Response } from 'express';
import { TopicRepository } from '@repository/index';
import { ApiRespone } from '@util/ApiRespone';

export class TopicController {
  async all(req: Request, res: Response) {
    try {
      const result = await new TopicRepository().listTopic(req.query);
      res.json(ApiRespone.paginate(result));
    } catch (err) {
      res.status(err.errorCode).json(ApiRespone.error(err));
    }
  }

  async create(req: Request, res: Response) {
    Object.assign(req.body, { user_id: req.user_id });
    try {
      const result = await new TopicRepository().create(req.body);
      res.json(ApiRespone.item(result));
    } catch (err) {
      res.status(err.errorCode).json(ApiRespone.error(err));
    }
  }
}
