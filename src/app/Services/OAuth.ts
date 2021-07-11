import * as request from 'request-promise';
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_SECRET_ID);
export class OAuth {
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
        if (res.statusCode != 200) {
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
      const googleInfo = await client.verifyIdToken({ idToken: tokenId, audience: process.env.GOOGLE_CLIENT_ID });
      console.log(googleInfo);
      return googleInfo.getPayload();
    } catch (error) {
      console.log(error);
    }
  }
}
