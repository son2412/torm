import TestCommand from './Commands/TestCommand';

export class Kernel {
  commands() {
    return [
      TestCommand,
    ];
  }
}
