import { Request, Response } from "express";
import { UserRepository } from "../app/Repositories";
import { SendWelcomeEmailNotification } from "../app/Notifications/SendWelcomeEmailNotification";
import Auth from "../app/Services/Auth";

export class UserController {
  async all(request: Request, response: Response) {
    const result = await new UserRepository().getAll();
    // new SendWelcomeEmailNotification(result[0]).sendMail();
    response.json(result);
  }
}
