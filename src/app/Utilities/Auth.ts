import * as bcrypt from 'bcryptjs';
import * as _ from 'lodash';
import * as jwt from 'jsonwebtoken';
export class Auth {
  static hash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  }
  static check(password, hash) {
    return bcrypt.compareSync(password, hash);
  }

  static generateToken(user) {
    const data = _.pick(user, ['id', 'email', 'status']);
    return jwt.sign({ data }, process.env.JWT_SECRET, { expiresIn: 20160000 });
  }
}
