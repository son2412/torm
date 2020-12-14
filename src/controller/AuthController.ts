import { Request, Response } from 'express';
import { AuthRepository } from '@repository/index';
import { ApiRespone } from '@service/ApiRespone';
import { App } from '@provider/index';
import * as Joi from '@hapi/joi';
import { Emit } from '@service/Emit';
import { WellcomeEvent } from '@event/WellcomeEvent';
export class AuthController {
  async signIn(req: Request, res: Response) {
    const valid = Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required()
    });
    const { error, value } = valid.validate(req.body);
    if (error) {
      res.status(400).json(ApiRespone.error({ message: error.details[0].message, errorCode: 400 }));
    }
    try {
      const result = await App.make(AuthRepository).login(value);
      new Emit().fire(new WellcomeEvent(result));
      res.json(ApiRespone.item(result));
    } catch (err) {
      res.status(err.errorCode).json(ApiRespone.error(err));
    }
  }

  async signUp(req: Request, res: Response) {
    const data = Object.assign(req.body, { status: 1 });
    try {
      const result = await new AuthRepository().register(data);
      res.json(ApiRespone.item(result));
    } catch (err) {
      res.status(err.errorCode).json(ApiRespone.error(err));
    }
  }
}
