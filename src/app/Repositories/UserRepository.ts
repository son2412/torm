import { getRepository } from "typeorm";
import { User } from "@entity/index";
import { Auth } from "../Services/Auth";

export class UserRepository {
  userRepository: any;
  constructor() {
    this.userRepository = getRepository(User);
  }
  async getAll() {
    const users = await this.userRepository.find({
      relations: ["roles", "images"]
    });
    return users;
  }

  async getByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email: email } });
    return user;
  }

  async create(user) {
    const data = { ...user, ...{ password: Auth.hash(user.password) } };
    const newUser = await this.userRepository.save(data);
    return newUser;
  }

  async deleteById(id) {
    const user = await this.userRepository.findOne(id);
    await this.userRepository.remove(user);
    return true;
  }
}
