import * as request from 'request-promise';
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
}
