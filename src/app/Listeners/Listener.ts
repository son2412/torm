import { Exception } from '@service/Exception';
import path from 'path';
export class Listener {
  static getName() {
    return path.resolve(__dirname, __filename);
  }

  handle(event: any = null) {
    throw new Exception('method is not implemented', event);
  }
}
