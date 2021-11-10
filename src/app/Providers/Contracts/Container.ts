import { Exception } from '../../Utilities/Exception';
import * as crypto from 'crypto';

export default class Container {
  private bindings: any;
  public parameters: any;
  static instance: any;
  constructor() {
    this.bindings = [];
    this.parameters = [];
  }

  /**
   * Register a binding with the container.
   *
   * @param string|class abstract
   * @param class concrete
   * @param  bool isSingleton
   *
   * @return void
   */
  bind(abstract, concrete, isSingleton = false) {
    const resolved_abstract = this.resolveAbstract(abstract);
    const f = this.bindings.find((item, key) => key === resolved_abstract);
    if (f !== undefined) {
      throw new Exception('can not bind instance', 1001);
    }
    this.bindings[resolved_abstract] = { abstract, concrete, isSingleton };
  }

  /**
   * Register a binding with value.
   *
   * @param string|class abstract
   * @param any
   *
   * @return void
   */
  useValue(abstract, value) {
    const resolved_abstract = this.resolveAbstract(abstract);
    const f = this.bindings.find((item, key) => key === resolved_abstract);
    if (f !== undefined) {
      throw new Exception('can not bind instance', 1001);
    }
    this.bindings[resolved_abstract] = { abstract, value, useValue: true };
  }

  /**
   * Resolve the given type from the container.
   *
   * @param string|class abstract
   * @param parameters
   * @return mixed
   */
  make(abstract, parameters = []) {
    const resolved_abstract = this.resolveAbstract(abstract);
    this.parameters = parameters;
    if (this.bindings === undefined) {
      this.bindings = [];
    }
    if (this.bindings[resolved_abstract] === undefined) {
      if (typeof abstract === 'string') {
        return 'null';
      } else {
        return new abstract();
      }
    } else {
      if (this.bindings[resolved_abstract].useValue === true) {
        return this.bindings[resolved_abstract].value;
      } else if (this.bindings[resolved_abstract].isSingleton === true) {
        if (this.bindings[resolved_abstract].instance === undefined) {
          this.bindings[resolved_abstract].instance = new this.bindings[resolved_abstract].concrete();
        }
        return this.bindings[resolved_abstract].instance;
      } else {
        return new this.bindings[resolved_abstract].concrete();
      }
    }
  }

  resolveAbstract(abstract) {
    const md5sum = crypto.createHash('sha256');
    return md5sum.update(abstract.toString()).digest('hex');
  }

  static getInstance() {
    if (this.instance === undefined) {
      this.instance = new this();
    }
    return this.instance;
  }

  /**
   * Check the abstract is bound.
   *
   * @param string|class abstract
   * @return bool
   */
  check(abstract) {
    const resolved_abstract = this.resolveAbstract(abstract);
    if (this.bindings[resolved_abstract] === undefined) {
      return false;
    } else {
      return true;
    }
  }
}
