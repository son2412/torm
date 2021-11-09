import Nexmo from 'nexmo';
import * as AWS from 'aws-sdk';
// import { Twilio } from 'twilio';
import * as _ from 'lodash';
import { Exception } from './Exception';
import { StatusCodes } from 'http-status-codes';

export class SendSms {
  options: any;
  enabled: boolean;
  sms: any;
  constructor() {
    if ((process.env.SMS_ENABLED as any) === true || process.env.SMS_ENABLED === 'true') {
      this.enabled = true;
      if (_.isNil(process.env.SMS_ACCESS_KEY)) {
        throw new Exception('Missing configuration for SMS_ACCESS_KEY', StatusCodes.SERVICE_UNAVAILABLE);
      }
      if (_.isNil(process.env.SMS_SECRET_KEY)) {
        throw new Exception('Missing configuration for SMS_SECRET_KEY', StatusCodes.SERVICE_UNAVAILABLE);
      }
      if (process.env.SERVICE_SMS === 'nexmo') {
        this.options = {
          apiKey: process.env.SMS_ACCESS_KEY,
          apiSecret: process.env.SMS_SECRET_KEY
        };
      }
      if (process.env.SERVICE_SMS === 'sns') {
        this.options = {
          accessKeyId: process.env.SMS_ACCESS_KEY,
          secretAccessKey: process.env.SMS_SECRET_KEY,
          region: process.env.SNS_REGION
        };
      }
      if (process.env.SERVICE_SMS === 'twilio') {
        this.options = {
          accountSid: process.env.SMS_ACCESS_KEY,
          authToken: process.env.SMS_SECRET_KEY
        };
      }
    } else {
      this.enabled = false;
    }
  }

  isEnabled() {
    return this.enabled;
  }

  getInstance() {
    if (this.isEnabled()) {
      if (_.isUndefined(this.sms)) {
        if (process.env.SERVICE_SMS === 'nexmo') {
          this.sms = new Nexmo(this.options);
        }
        if (process.env.SERVICE_SMS === 'sns') {
          AWS.config.update(this.options);
          this.sms = new AWS.SNS();
        }
        // if (process.env.SERVICE_SMS === 'twilio') {
        //   this.sms = new Twilio(this.options.accountSid, this.options.authToken);
        // }
      }
      return this.sms;
    }
  }

  send(receiver: string, text: string) {
    switch (process.env.SERVICE_SMS) {
      case 'nexmo':
        this.executeNexmo(receiver, text);
        break;
      case 'sns':
        this.executeSns(receiver, text);
        break;
      case 'twilio':
        this.executeTwilio(receiver, text);
        break;
      default:
        break;
    }
  }

  executeNexmo(receiver: string, text: string) {
    this.getInstance().message.sendSms(process.env.SMS_SENDER, receiver, text, { type: 'unicode' }, (err, data) => {
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

  executeSns(receiver: string, text: string) {
    this.getInstance().publish({ Message: text, Subject: process.env.SMS_SENDER, PhoneNumber: receiver }, (error, result) => {
      if (error) {
        console.log(error);
      } else {
        console.log(result);
      }
    });
  }

  executeTwilio(receiver: string, text: string) {
    // this.getInstance()
    //   .messages.create({
    //     body: text,
    //     to: receiver,
    //     from: process.env.SMS_SENDER
    //   })
    //   .then(message => console.log(message));
  }
}
