import { Request, Response } from 'express';
import { GroupRepository } from '@repository/index';
import { ApiRespone } from '@util/ApiRespone';

export class GroupController {
  async all(req: Request, res: Response) {
    Object.assign(req.query, { user_id: req.user_id });
    try {
      const result = await new GroupRepository().listGroup(req.query);
      res.json(ApiRespone.paginate(result));
    } catch (err) {
      res.status(err.errorCode).json(ApiRespone.error(err));
    }
  }

  async detail(req: Request, res: Response) {
    try {
      const result = await new GroupRepository().detail(Number(req.params.id));
      res.json(ApiRespone.item(result));
    } catch (err) {
      res.status(err.errorCode).json(ApiRespone.error(err));
    }
  }

  async create(req: Request, res: Response) {
    Object.assign(req.body, { creator_id: req.user_id });
    try {
      const result = await new GroupRepository().create(req.body);
      res.json(ApiRespone.item(result));
    } catch (err) {
      res.status(err.errorCode).json(ApiRespone.error(err));
    }
  }

  async update(req: Request, res: Response) {
    try {
      const result = await new GroupRepository().update(Number(req.params.id), req.body);
      res.json(ApiRespone.item(result));
    } catch (err) {
      res.status(err.errorCode).json(ApiRespone.error(err));
    }
  }

  async leave(req: Request, res: Response) {
    try {
      await new GroupRepository().leave(Number(req.params.id), req.user_id);
      res.json(ApiRespone.success());
    } catch (err) {
      res.status(err.errorCode).json(ApiRespone.error(err));
    }
  }

  async createChatWith(req: Request, res: Response) {
    try {
      const result = await new GroupRepository().createChatWith(req.user_id, req.body.target_id);
      res.json(ApiRespone.item(result));
    } catch (err) {
      res.status(err.errorCode).json(ApiRespone.error(err));
    }
  }

  async deleteGroup(req: Request, res: Response) {
    try {
      const result = await new GroupRepository().delete(req.params.id);
      res.json(ApiRespone.success());
    } catch (err) {
      res.status(err.errorCode).json(ApiRespone.error(err));
    }
  }

  async addUserToGroup(req: Request, res: Response) {
    const user_id = req.body.user_id;
    try {
      await new GroupRepository().addUserToGroup(req.params.id, user_id);
      res.json(ApiRespone.success());
    } catch (err) {
      res.status(err.errorCode).json(ApiRespone.error(err));
    }
  }

  async listAllGroup(req: Request, res: Response) {
    try {
      const result = await new GroupRepository().listAllGroup(req.user_id);
      res.json(ApiRespone.collection(result));
    } catch (err) {
      res.status(err.errorCode).json(ApiRespone.error(err));
    }
  }
}
