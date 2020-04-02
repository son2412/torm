import * as _ from 'lodash';
import { Exception } from '@service/Exception';
import { In, Not } from 'typeorm';
export abstract class Repository {
  abstract repository: any;
  include: any;
  condition: any;
  order: any;
  constructor() {
    this.include = [];
    this.condition = [];
    this.order = {};
  }

  async get() {
    const param = { where: this.condition, relations: this.include, order: this.order };
    const result = await this.repository.find(param);
    return result;
  }

  relation(include = []) {
    this.include = include;
    return this;
  }

  where(column, value) {
    const query = {};
    query[column] = value;
    this.condition.push(query);
    return this;
  }

  andWhere(column, value) {
    const query = {};
    query[column] = value;
    if (_.isEmpty(this.condition)) {
      this.condition.push(query);
    } else {
      _.assign(this.condition[0], query);
    }
    return this;
  }

  orWhere(column, value) {
    const query = {};
    query[column] = value;
    this.condition.push(query);
    return this;
  }

  whereAlias(cb) {}

  whereIn(column, value) {
    if (!_.isArray(value)) {
      throw new Exception('Value must be array');
    }
    const query = {};
    query[column] = In(value);
    if (_.isEmpty(this.condition)) {
      this.condition.push(query);
    } else {
      _.assign(this.condition[0], query);
    }
    return this;
  }

  orWhereIn(column, value) {
    if (!_.isArray(value)) {
      throw new Exception('Value must be array');
    }
    const query = {};
    query[column] = In(value);
    this.condition.push(query);
    return this;
  }

  whereNotIn(column, value) {
    if (!_.isArray(value)) {
      throw new Exception('Value must be array');
    }
    const query = {};
    query[column] = Not(In(value));
    if (_.isEmpty(this.condition)) {
      this.condition.push(query);
    } else {
      _.assign(this.condition[0], query);
    }
    return this;
  }

  orWhereNotIn(column, value) {
    if (!_.isArray(value)) {
      throw new Exception('Value must be array');
    }
    const query = {};
    query[column] = Not(In(value));
    this.condition.push(query);
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

  async paginate(query?: any) {
    let page = 1;
    let per_page = 20;
    if (!_.isEmpty(query)) {
      if (query.pageIndex) {
        page = query.pageIndex;
      }
      if (query.pageSize) {
        per_page = query.pageSize;
      }
    }
    const param = { where: this.condition, relations: this.include, take: per_page, skip: (page - 1) * per_page, order: this.order };
    const result = await this.repository.findAndCount(param);
    return { data: result[0], totalRow: result[1], totalPage: Math.ceil(result[1] / per_page), currentPage: page, perPage: per_page };
  }

  orderBy(column, direction) {
    const query = {};
    query[column] = direction;
    this.order = query;
    return this;
  }

  async modify(id, data) {
    await this.findById(id);
    await this.repository.update(id, data);
    const result = await this.findById(id);
    return result;
  }

  async remove(id) {
    await this.findById(id);
    await this.repository.delete(id);
    return true;
  }
}
