import { Listener } from './Listener';

export class WellcomeListener extends Listener {
  handle(event) {
    const { result } = event;
    console.log('result', result);
  }
}
