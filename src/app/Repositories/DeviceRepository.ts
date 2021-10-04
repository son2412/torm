import { Device } from '@entity/index';
import { Exception } from '@util/Exception';

export class DeviceRepository {
  async deleteDevice(id: number) {
    const device = await Device.findOne({ id });
    await device.remove();
    return true;
  }

  async device(params: paramDevice) {
    const { user_id, token, platform } = params;
    const device = await Device.findOne({ user_id, token, platform });
    if (!device) {
      return await Device.create(params).save();
    }
    return device;
  }
}

type paramDevice = {
  user_id?: number;
  token?: string;
  platform?: string;
};
