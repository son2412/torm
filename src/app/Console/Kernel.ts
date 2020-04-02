import MakeSeederCommand from './Commands/MakeSeederCommand';

export class Kernel {
  commands() {
    return [MakeSeederCommand];
  }
}
