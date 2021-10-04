import { Request, Response } from 'express';
import { MessageRepository } from '@repository/index';
import { ApiRespone } from '@util/ApiRespone';

export class MessageController {
  async all(req: Request, res: Response) {
    Object.assign(req.query, { group_id: req.params.group_id });
    try {
      const result = await new MessageRepository().listMessageByGroup(req.query);
      res.json(ApiRespone.paginate(result));
    } catch (err) {
      res.status(err.errorCode).json(ApiRespone.error(err));
    }
  }

  async create(req: Request, res: Response) {
    Object.assign(req.body, { sender_id: req.user_id });
    try {
      const result = await new MessageRepository().create(req.body);
      res.json(ApiRespone.item(result));
    } catch (err) {
      res.status(err.errorCode).json(ApiRespone.error(err));
    }
  }
}
