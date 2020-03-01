import * as nodemailer from "nodemailer";
import Style from "./Style";
import * as _ from "lodash";
import { Exception } from "@service/Exception";

export default class CustomEmail {
  private content: string;
  private customGreetingStyle: any;
  private customSubjectStyle: any;
  public from_where: string;
  public from_name: string;
  public subject_email: string;
  public greeting_email: string;
  to_name: string;
  constructor() {
    this.content = "";
    this.customGreetingStyle = null;
    this.customSubjectStyle = null;
    this.from_where = process.env.DEFAULT_SENDER_EMAIL;
    this.from_name = process.env.DEFAULT_SENDER;
  }

  to(to, name = "") {
    if (_.isNil(to)) {
      throw new Exception("receiver's email is required");
    }
    this.to = to;
    this.to_name = name;
    return this;
  }

  from(from, name = "") {
    if (_.isNil(from)) {
      throw new Exception("sender's email is required");
    }
    this.from = from;
    this.from_name = name;
    return this;
  }

  subject(subject_email: string = "", customStyle: any = null) {
    this.customSubjectStyle = customStyle;
    this.subject_email = subject_email;
    return this;
  }

  greeting(greeting_email = "", customStyle = null) {
    this.customGreetingStyle = customStyle;
    this.greeting_email = greeting_email;
    return this;
  }

  line(text = "", customStyle = null) {
    this.content += _.isNil(customStyle)
      ? `<p style="${Style.paragraph}">${text}</p>`
      : `<p style="${Style.paragraph} ${customStyle}">${text}</p>`;
    return this;
  }

  section(data = "", customStyle = null) {
    this.content += _.isNil(customStyle)
      ? `<div>${data}</div>`
      : `<div style="${customStyle}">${data}</div>`;
    return this;
  }

  action(text = "", link = "#", type = "default") {
    this.content += `<div style="text-align:center">
            <a href="${link}">
                <button style="${Style.button} ${Style.button_default}" class="${type}">${text}</button>
            </a>    
        </div>`;
    return this;
  }

  buildContent() {
    let html = `<html><body style="${Style.body}">`;
    html += `<div style="${Style.header}">
                <div style="${Style.avt}">
                </div>
                <div style="${Style.logo}">
                  <img style="${Style.logo_img}" src="https://v2projectelearningdev.s3.ap-southeast-1.amazonaws.com/4/logo-1570181790575.png">
                </div>
              </div>`;
    html += _.isNil(this.customSubjectStyle)
      ? `<h1 style="${Style.subject}">${this.subject}</h1>`
      : `<h1 style="${Style.subject} ${this.customSubjectStyle}">${this.subject}</h1>`;
    html += _.isNil(this.customGreetingStyle)
      ? `<div style="${Style.greeting}">${this.greeting}</div>`
      : `<div style="${Style.greeting} ${this.customGreetingStyle}">${this.greeting}</div>`;
    html += `<div style="${Style.content}">${this.content}</div>`;
    html += `<p style="${Style.footer}">&copy; Copyright by Grass</p>`;
    html += "</body></html>";
    return html;
  }

  send() {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: process.env.EMAIL_SECURE === "ssl",
      // ignoreTLS: true,
      auth: {
        user: process.env.EMAIL_USER, // generated ethereal user
        pass: process.env.EMAIL_PASSWORD // generated ethereal password
      },
      tls: {
        rejectUnauthorized: true
      }
    });

    return transporter.sendMail(
      {
        from: process.env.EMAIL_USER,
        to: this.to,
        subject: this.subject,
        html: this.buildContent()
      },
      (err, info) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Message sent: " + info.messageId);
          transporter.close();
        }
      }
    );
  }
}
