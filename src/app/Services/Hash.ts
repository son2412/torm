import * as bcrypt from 'bcryptjs';
export default class Hash {
  hash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  }
  check(password, hash) {
    return bcrypt.compareSync(password, hash);
  }
}