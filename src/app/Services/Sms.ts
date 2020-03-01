import Nexmo from 'nexmo';
import * as _ from 'lodash';
import { Exception } from './Exception';

export class SendSms {
  options: any;
  enabled: boolean;
  nexmo: any;
  constructor() {
    if ((process.env.NEXMO_ENABLED as any) === true || process.env.NEXMO_ENABLED === 'true') {
      this.enabled = true;
      if (_.isNil(process.env.NEXMO_API_KEY)) {
        throw new Exception('Missing configuration for NEXMO_API_KEY');
      }
      if (_.isNil(process.env.NEXMO_API_SECRET)) {
        throw new Exception('Missing configuration for NEXMO_API_SECRET');
      }
      this.options = {
        apiKey: process.env.NEXMO_API_KEY,
        apiSecret: process.env.NEXMO_API_SECRET,
      };
    } else {
      this.enabled = false;
    }
  }

  isEnabled() {
    return this.enabled;
  }

  getInstance() {
    if (this.isEnabled()) {
      if (_.isUndefined(this.nexmo)) {
        this.nexmo = new Nexmo(this.options);
      }
      return this.nexmo;
    }
  }

  send(receiver: string, text: string) {
    this.getInstance().message.sendSms(process.env.NEXMO_SENDER, receiver, text, { type: 'unicode' }, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        if (data.messages[0]['status'] === '0') {
          console.log('Message sent successfully.');
        } else {
          console.log(`Message failed with error: ${data.messages[0]['error-text']}`);
        }
      }
    });
  }
}