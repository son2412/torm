import { Request, Response } from 'express';
import { DeviceRepository } from '@repository/index';
import { ApiRespone } from '@service/ApiRespone';
import { App } from '@provider/App';

export class DeviceController {
  async create(req: Request, res: Response) {
    Object.assign(req.body, { user_id: req.user_id });
    try {
      const result = await App.make(DeviceRepository).device(req.body);
      res.json(ApiRespone.item(result));
    } catch (err) {
      res.status(err.errorCode).json(ApiRespone.error(err));
    }
  }

  async deleteDevice(req: Request, res: Response) {
    try {
      await App.make(DeviceRepository).deleteDevice(req.params.id);
      res.json(ApiRespone.success());
    } catch (err) {
      res.status(err.errorCode).json(ApiRespone.error(err));
    }
  }
}
