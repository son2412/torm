import { SendSms } from '@service/Sms';
import { App } from './App';
import { ServiceProvider } from './ServiceProvider';

export default class AppServiceProvider extends ServiceProvider {
  register() {
    App.singleton('SMS', SendSms);
  }
  boot() {}
}
