import { Request, Response } from 'express';
import { DeviceService } from '@service/index';
import { ApiRespone } from '@util/ApiRespone';
import { App } from '@provider/App';
import * as Joi from 'joi';
import { StatusCodes } from 'http-status-codes';
import { InvalidInput } from '@const/error';

export class DeviceController {
  async store(req: Request, res: Response) {
    const { body, user_id } = req;
    const valid = Joi.object({
      token: Joi.string().required(),
      platform: Joi.string().required()
    });
    const { error, value } = valid.validate(body);
    if (error) return res.status(StatusCodes.BAD_REQUEST).json(ApiRespone.error(InvalidInput));

    try {
      const result = await App.make(DeviceService).store({ ...value, ...{ user_id } });
      return res.json(ApiRespone.item(result));
    } catch (err) {
      return res.status(err.errorCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ApiRespone.error(err));
    }
  }

  async destroy(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await App.make(DeviceService).destroy(id);
      return res.json(ApiRespone.success());
    } catch (err) {
      return res.status(err.errorCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ApiRespone.error(err));
    }
  }
}
