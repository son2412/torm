import { Request, Response } from 'express';
import { GroupRepository } from '@repository/index';
import { ApiRespone } from '@service/ApiRespone';

export class GroupController {
  async all(req: Request, res: Response) {
    Object.assign(req.query, { user_id: req.user_id });
    try {
      const result = await new GroupRepository().listGroup(req.query);
      res.json(ApiRespone.paginate(result));
    } catch (err) {
      res.json(ApiRespone.error(err));
    }
  }

  async detail(req: Request, res: Response) {
    try {
      const result = await new GroupRepository().detail(Number(req.params.id));
      res.json(ApiRespone.item(result));
    } catch (err) {
      res.json(ApiRespone.error(err));
    }
  }

  async create(req: Request, res: Response) {
    Object.assign(req.body, { creator_id: req.user_id });
    try {
      const result = await new GroupRepository().create(req.body);
      res.json(ApiRespone.item(result));
    } catch (err) {
      res.json(ApiRespone.error(err));
    }
  }

  async update(req: Request, res: Response) {
    try {
      const result = await new GroupRepository().update(Number(req.params.id), req.body);
      res.json(ApiRespone.item(result));
    } catch (err) {
      res.json(ApiRespone.error(err));
    }
  }

  async leave(req: Request, res: Response) {
    try {
      await new GroupRepository().leave(Number(req.params.id), req.user_id);
      res.json(ApiRespone.success());
    } catch (err) {
      res.json(ApiRespone.error(err));
    }
  }
}