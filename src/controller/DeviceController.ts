import { Request, Response } from 'express';
import { DeviceService } from '@service/index';
import { ApiRespone } from '@util/ApiRespone';
import { App } from '@provider/App';
import * as Joi from '@hapi/joi';

export class DeviceController {
  async store(req: Request, res: Response) {
    const valid = Joi.object({
      token: Joi.string().required(),
      platform: Joi.string().required()
    });
    const { error, value } = valid.validate(req.body);
    if (error) {
      res.status(400).json(ApiRespone.error({ message: error.details[0].message, errorCode: 400 }));
    }
    Object.assign(req.body, { user_id: req.user_id });
    try {
      const result = await App.make(DeviceService).store({ ...value, ...{ user_id: req.user_id } });
      res.json(ApiRespone.item(result));
    } catch (err) {
      res.status(err.errorCode).json(ApiRespone.error(err));
    }
  }

  async destroy(req: Request, res: Response) {
    try {
      await App.make(DeviceService).destroy(req.params.id);
      res.json(ApiRespone.success());
    } catch (err) {
      res.status(err.errorCode).json(ApiRespone.error(err));
    }
  }
}
