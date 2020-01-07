import { Request, Response } from "express";
import UserRepository from "../app/Repositories/UserRepository";
import { User } from "../entity/User";
export default class AuthController {
    async register(req: Request, res: Response) {
      let user: User;
      const data = Object.assign(req.body, {status: 1});
      const repository = new UserRepository();
      const check = await repository.getByEmail(data.email);
      if (check) {
        throw new Error('Email is existing');
      }
      user = await repository.create(data);
      res.json({ token: user.generateToken() });
    }
}