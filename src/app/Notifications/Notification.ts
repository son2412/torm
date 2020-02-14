import * as _ from "lodash";

export const MAIL = "mail";
export const SMS = "sms";

export class Notification {
  private notifiable: any;
  private toMail: any;
  private via: any;
  constructor(via, toMail) {
    this.via = via;
    this.toMail = toMail;
  }
  setNotifiable(notifiable) {
    this.notifiable = notifiable;
  }

  async executeEmailTask() {
    if (process.env.QUEUE_DRIVER === "sync") {
      await this.toMail(this.notifiable).send();
    } else {
      this.toMail(this.notifiable).send();
    }
  }
  execute() {
    const methods = this.via();
    _.forEach(methods, method => {
      switch (method) {
        case MAIL:
          this.executeEmailTask();
          break;
        case SMS:
          break;
        default:
          break;
      }
    });
  }
}
