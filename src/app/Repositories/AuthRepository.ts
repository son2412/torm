import { getRepository } from 'typeorm';
import { LOGIN_TYPE_FACEBOOK, LOGIN_TYPE_GOOGLE } from '@entity/index';
import { Auth } from '@service/Auth';
import { Exception } from '@service/Exception';
import { UserRepository } from './UserRepository';
import { LoginData, LoginFacebook, SignUpData } from 'types/types';
import { OAuth } from '@service/OAuth';

interface OAuthResponse {
  email: string;
  social_id: string;
  avatar: string;
  first_name: string;
}
export class AuthRepository {
  async login(data: LoginData) {
    const repository = new UserRepository();
    const user = await repository.getByEmail(data.email);
    if (!user) throw new Exception('User not found', 404);
    const isValidPassword = Auth.check(data.password, user.password);
    if (isValidPassword === false) throw new Exception('Password not match', 400);

    return { token: Auth.generateToken(user) };
  }

  async register(data: SignUpData) {
    const repository = new UserRepository();
    if (await repository.getByEmail(data.email)) throw new Exception('Email is existing', 404);

    const user = await repository.create(data);
    return { token: Auth.generateToken(user) };
  }

  async signInFacebook(input: LoginFacebook) {
    const repository = new UserRepository();
    const facebookInfo = (await OAuth.getFacebookUser(input.id, input.token)) as OAuthResponse;
    if (!facebookInfo) {
      throw new Exception('Facebook info not truth!', 400);
    }
    let user = await repository.getByEmailSocial(facebookInfo.email, LOGIN_TYPE_FACEBOOK);
    if (!user) {
      user = await repository.create({ ...facebookInfo, ...{ login_type: LOGIN_TYPE_FACEBOOK } });
    }
    return { token: Auth.generateToken(user) };
  }

  async signInGoogle(token: string) {
    const repository = new UserRepository();
    const googleInfo = await OAuth.getGoogleUser(token);
    if (!googleInfo || !googleInfo.email_verified) {
      throw new Exception('Google info not truth!', 400);
    }
    let user = await repository.getByEmailSocial(googleInfo.email, LOGIN_TYPE_GOOGLE);
    if (!user) {
      user = await repository.create({
        email: googleInfo.email,
        first_name: googleInfo.family_name,
        last_name: googleInfo.given_name,
        avatar: googleInfo.picture,
        social_id: googleInfo.sub,
        login_type: LOGIN_TYPE_GOOGLE
      });
    }
    return { token: Auth.generateToken(user) };
  }
}
