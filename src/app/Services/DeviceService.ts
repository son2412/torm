import { DeviceRepository } from '@repository/index';
import { paramDevice } from 'types/types';

const repository = new DeviceRepository();
export class DeviceService {
  async destroy(id: number) {
    return await repository.destroy(id);
  }

  async store(data: paramDevice) {
    return await repository.device(data);
  }
}
