import { WellcomeEvent } from '@event/WellcomeEvent';
import { WellcomeListener } from '@listener/WellcomeListener';
import * as _ from 'lodash';
import { App } from './App';
import { ServiceProvider } from './ServiceProvider';

export default class EventServiceProvider extends ServiceProvider {
  register() {
    const eventEmitter = App.make('Emit').eventEmitter;

    const listen = [
      {
        event: WellcomeEvent,
        listeners: [WellcomeListener]
      }
    ];
    _.forEach(listen, (item) => {
      item.listeners.forEach((listener) => {
        new listener().handle();
        eventEmitter.on(item.event.getName(), new listener().handle);
      });
    });
  }
}
