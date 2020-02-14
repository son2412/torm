import { Notification, MAIL } from "./Notification";
import CustomEmail from "../Email/CustomEmail";

export class SendWelcomeEmailNotification {
  notifiable: any;
  constructor(notifiable) {
    this.notifiable = notifiable;
    this.via = this.via.bind(this);
    this.toMail = this.toMail.bind(this);
  }
  via() {
    return [MAIL];
  }

  toMail() {
    return new CustomEmail()
      .to(this.notifiable.email)
      .subject("wellcome")
      .greeting(`Hi ${this.notifiable.email}`)
      .line("hello !")
      .action("Button", "https://google.com")
      .line("At the end is a line of text");
  }

  sendMail() {
    new Notification(this.via, this.toMail).execute();
  }
}
