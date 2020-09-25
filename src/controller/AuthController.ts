import { Request, Response } from 'express';
import { AuthRepository } from '@repository/index';
import { ApiRespone } from '@service/ApiRespone';
import { App } from '@provider/index';
export class AuthController {
  async signIn(req: Request, res: Response) {
    const data = req.body;
    try {
      const result = await App.make(AuthRepository).login(data);
      res.json(ApiRespone.item(result));
    } catch (err) {
      res.json(ApiRespone.error(err));
    }
  }

  async signUp(req: Request, res: Response) {
    const data = Object.assign(req.body, { status: 1 });
    try {
      const result = await new AuthRepository().register(data);
      res.json(ApiRespone.item(result));
    } catch (err) {
      res.json(ApiRespone.error(err));
    }
  }
}
