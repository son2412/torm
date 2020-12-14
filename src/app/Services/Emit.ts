import { EventEmitter } from 'events';

export class Emit {
  eventEmitter: EventEmitter;
  constructor() {
    this.eventEmitter = new EventEmitter();
  }
  static getInstance() {
    return new EventEmitter();
  }

  fire(event, ...rest) {
    this.eventEmitter.emit.apply(this.eventEmitter, [event.getName(), event, ...rest]);
  }
}
