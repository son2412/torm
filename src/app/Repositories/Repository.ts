import * as _ from 'lodash';
import { Exception } from '@service/Exception';
export abstract class Repository {
  abstract repository: any;
  include: any;
  condition: any;
  constructor() {
    this.include = [];
    this.condition = [];
  }

  async get() {
    const param = { where: this.condition, relations: this.include };
    const result = await this.repository.find(param);
    return result;
  }

  relation(include = []) {
    this.include = include;
    return this;
  }

  where(key, value) {
    const query = {};
    query[key] = value;
    this.condition.push(query);
    return this;
  }

  andWhere(key, value) {
    const query = {};
    query[key] = value;
    if (_.isEmpty(this.condition)) {
      this.condition.push(query);
    } else {
      _.assign(this.condition[0], query);
    }
    return this;
  }

  orWhere(key, value) {
    const query = {};
    query[key] = value;
    this.condition.push(query);
    return this;
  }

  whereAlias(cb) {}

  whereIn(column, value) {
    if (!_.isArray(value)) {
      throw new Exception('Value must be array');
    }
    return this;
  }

  async findById(id) {
    const result = await this.repository.findOne({ where: { id: id }, relations: this.include });
    if (!result) {
      throw new Exception('Resource not found');
    }
    return result;
  }

  async first() {
    const param = { where: this.condition, relations: this.include };
    const result = await this.repository.findOne(param);
    return result;
  }

  async firstOrFail() {
    const result = await this.first();
    if (!result) {
      throw new Exception('Resource not found');
    }
    return result;
  }

  async count() {
    const param = { where: this.condition };
    const result = await this.repository.count(param);
    return result;
  }

  async paginate() {
    const param = { where: this.condition, relations: this.include };
    const result = await this.repository.findAndCount(param);
    return result;
  }
}
