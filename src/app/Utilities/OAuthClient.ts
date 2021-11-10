import * as request from 'request-promise';
import { OAuth2Client } from 'google-auth-library';
import Twitter from 'node-twitter-api';
import OAuth from 'oauth';

export type OAuthTwitter = {
  oauth_token: string;
  oauth_token_secret: string;
  oauth_verifier: string;
};
export class OAuthClient {
  static async getFacebookUser(id: string, token: string) {
    return new Promise((resolve, reject) => {
      const userFieldSet = 'id, name, email, picture';
      const options = {
        method: 'GET',
        uri: process.env.FACEBOOK_URL + id,
        qs: {
          access_token: token,
          fields: userFieldSet
        }
      };
      request(options, (err, res, body) => {
        if (err) reject(err);
        if (res.statusCode !== 200) {
          body = JSON.parse(body);
          return reject(body.error.message);
        }
        body = JSON.parse(body);
        const data = {
          social_id: body.id,
          first_name: body.name || '',
          birthday: body.birthday || null,
          email: body.email || '',
          avatar: body.picture.data.url
        };
        return resolve(data);
      });
    });
  }

  static async getGoogleUser(tokenId: string) {
    // const googleInfo = client
    //   .verifyIdToken({ idToken: tokenId, audience: process.env.GOOGLE_CLIENT_ID })
    //   .then((res) => console.log(res.getPayload()))
    //   .catch((e) => console.log(e));
    try {
      const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_SECRET_ID);
      const googleInfo = await client.verifyIdToken({ idToken: tokenId, audience: process.env.GOOGLE_CLIENT_ID });
      return googleInfo.getPayload();
    } catch (error) {
      console.log(error);
    }
  }

  static async getTwitterUser(data: OAuthTwitter) {
    const twitter = new Twitter({
      consumerKey: process.env.TWITTER_API_KEY,
      consumerSecret: process.env.TWITTER_SECRET_KEY,
      callback: process.env.TWITTER_CALLBACK
    });
    const oauthService = new OAuth.OAuth(
      process.env.TWITTER_REQUEST_TOKEN,
      process.env.TWITTER_ACCESS_TOKEN,
      process.env.TWITTER_API_KEY,
      process.env.TWITTER_SECRET_KEY,
      '1.0A',
      null,
      'HMAC-SHA1'
    );

    return new Promise((resolve, reject) => {
      oauthService.getOAuthAccessToken(
        data.oauth_token,
        data.oauth_token_secret,
        data.oauth_verifier,
        function (error, oauth_access_token, oauth_access_token_secret, results) {
          if (error) return reject(error);
          twitter.verifyCredentials(oauth_access_token, oauth_access_token_secret, function (err, user) {
            if (err) return reject(err);
            return resolve({
              social_id: user.id || '',
              first_name: user.name || '',
              avatar: user.profile_image_url || ''
            });
          });
        }
      );
    });
  }
}
