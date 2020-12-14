import { Listener } from './Listener';

export class WellcomeListener extends Listener {
  handle(event: any) {
    console.log(event);
    return event;
  }
}
