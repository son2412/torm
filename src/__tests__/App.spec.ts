import { App } from '../app/Providers/index';
import * as _ from 'lodash';
import Container from '../app/Providers/Contracts/Container';
class Test {
  test() {
    return true;
  }
}

class Singleton {
  data: any[];
  constructor() {
    this.data = [];
  }
  add(d) {
    this.data.push(d);
  }
  get() {
    return this.data;
  }
}

describe('App', () => {
  it('bind function should return an instance of container', () => {
    App.bind('test', Test);
    const container = Container.getInstance();
    expect(_.isArray(container.bindings)).toBeTruthy();
  });

  it('make function should return an correct instance', () => {
    const t = App.make('test');
    expect(t).toBeInstanceOf(Test);
  });

  it('can make a singleton', () => {
    App.singleton(Singleton, Singleton);

    const s1 = App.make(Singleton);
    s1.add('x');
    const s2 = App.make(Singleton);
    s2.add('y');
    expect(s2.get()).toHaveLength(2);
  });
});
