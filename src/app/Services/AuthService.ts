import { Auth } from '@util/Auth';
import { Exception } from '@util/Exception';
import { UserRepository } from '@repository/index';
import { LoginData, LoginFacebook, SignUpData } from 'types/types';
import { OAuthClient, OAuthTwitter } from '@util/OAuthClient';
import { App } from '@provider/index';
import { WellcomeEvent } from '@event/WellcomeEvent';
import { LoginType } from '@const/enum';
import { EmailExited, PasswordNotMatch, UserNotFound } from '@const/error';
import { t } from 'i18next';

interface OAuthResponse {
  email: string;
  social_id: string;
  avatar: string;
  first_name: string;
}
export class AuthService {
  async login(data: LoginData) {
    const repository = new UserRepository();
    const user = await repository.getByEmail(data.email);
    if (!user) throw new Exception(UserNotFound.message, UserNotFound.errorCode, UserNotFound.errorText);
    const isValidPassword = Auth.check(data.password, user.password);
    if (isValidPassword === false) {
      throw new Exception(PasswordNotMatch.message, PasswordNotMatch.errorCode, PasswordNotMatch.errorText);
    }
    App.make('Emit').fire(new WellcomeEvent(user));
    return { token: Auth.generateToken(user) };
  }

  async register(data: SignUpData) {
    const repository = new UserRepository();
    if (await repository.getByEmail(data.email)) {
      throw new Exception(t(EmailExited.errorText), EmailExited.errorCode, EmailExited.errorText);
    }

    const user = await repository.create(data);
    return { token: Auth.generateToken(user) };
  }

  async signInFacebook(input: LoginFacebook) {
    const repository = new UserRepository();
    const facebookInfo = (await OAuthClient.getFacebookUser(input.id, input.token)) as OAuthResponse;
    if (!facebookInfo) {
      throw new Exception('Facebook info not truth!', 400);
    }
    let user = await repository.getByEmailSocial(facebookInfo.email, LoginType.FACEBOOK);
    if (!user) {
      user = await repository.create({ ...facebookInfo, ...{ login_type: LoginType.FACEBOOK } });
    }
    return { token: Auth.generateToken(user) };
  }

  async signInGoogle(token: string) {
    const repository = new UserRepository();
    const googleInfo = await OAuthClient.getGoogleUser(token);
    if (!googleInfo || !googleInfo.email_verified) {
      throw new Exception('Google info not truth!', 400);
    }
    let user = await repository.getByEmailSocial(googleInfo.email, LoginType.GOOGLE);
    if (!user) {
      user = await repository.create({
        email: googleInfo.email,
        first_name: googleInfo.family_name,
        last_name: googleInfo.given_name,
        avatar: googleInfo.picture,
        social_id: googleInfo.sub,
        login_type: LoginType.GOOGLE
      });
    }
    return { token: Auth.generateToken(user) };
  }

  async signInTwitter(data: OAuthTwitter) {
    const twitterInfo = await OAuthClient.getTwitterUser(data);

    return twitterInfo;
  }
}
