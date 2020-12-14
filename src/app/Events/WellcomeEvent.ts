import { Event } from './Event';
import * as path from 'path';

export class WellcomeEvent extends Event {
  data: any;
  constructor(data) {
    super();
    this.data = data;
  }

  static getName() {
    return path.resolve(__dirname, __filename);
  }

  getName() {
    return path.resolve(__dirname, __filename);
  }
}
