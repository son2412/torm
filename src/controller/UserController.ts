import { Request, Response } from 'express';
import { UserRepository } from '@repository/index';
import { ApiRespone } from '@service/ApiRespone';

export class UserController {
  async all(req: Request, res: Response) {
    try {
      const result = await new UserRepository().getAll(req.query);
      res.json(ApiRespone.paginate(result));
    } catch (err) {
      res.status(err.errorCode).json(ApiRespone.error(err));
    }
  }

  async detail(req: Request, res: Response) {
    try {
      const result = await new UserRepository().getById(Number(req.params.id));
      res.json(ApiRespone.item(result));
    } catch (err) {
      res.json(ApiRespone.error(err));
    }
  }

  async me(req: Request, res: Response) {
    try {
      const result = await new UserRepository().getById(req.user_id);
      res.json(ApiRespone.item(result));
    } catch (err) {
      res.status(err.errorCode).json(ApiRespone.error(err));
    }
  }

  async updateMe(req: Request, res: Response) {
    try {
      const result = await new UserRepository().update(req.user_id, req.body);
      res.json(ApiRespone.item(result));
    } catch (err) {
      res.status(err.errorCode).json(ApiRespone.error(err));
    }
  }

  async addUser(req: Request, res: Response) {
    try {
      const result = await new UserRepository().create(req.body);
      res.json(ApiRespone.item(result));
    } catch (err) {
      res.status(err.errorCode).json(ApiRespone.error(err));
    }
  }

  async remove(req: Request, res: Response) {
    try {
      await new UserRepository().delete(req.params.id);
      res.json(ApiRespone.success());
    } catch (err) {
      res.status(err.errorCode).json(ApiRespone.error(err));
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const result = await new UserRepository().update(req.params.id, req.body);
      res.json(ApiRespone.item(result));
    } catch (err) {
      res.status(err.errorCode).json(ApiRespone.error(err));
    }
  }

  async listUserOnline(req: Request, res: Response) {
    try {
      const result = await new UserRepository().listUserOnline(req.query);
      res.json(ApiRespone.paginate(result));
    } catch (err) {
      res.status(err.errorCode).json(ApiRespone.error(err));
    }
  }
}
