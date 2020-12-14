import { Event } from './Event';
import * as path from 'path';

export class WellcomeEvent extends Event {
  result: any;
  constructor(result) {
    super();
    this.result = result;
  }

  static getName() {
    return path.resolve(__dirname, __filename);
  }

  getName() {
    return path.resolve(__dirname, __filename);
  }
}
