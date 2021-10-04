import { Emit } from '@util/Emit';
import { SendSms } from '@util/Sms';
import { App } from './App';
import { ServiceProvider } from './ServiceProvider';

export default class AppServiceProvider extends ServiceProvider {
  register() {
    App.singleton('SMS', SendSms);
    App.singleton('Emit', Emit);
  }
  boot() {}
}
