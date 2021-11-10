import { Device } from '@entity/index';
import { paramDevice } from 'types/types';

export class DeviceRepository {
  async destroy(id: number) {
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
