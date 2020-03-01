import { Command } from './Command';

export default class TestCommand extends Command {
  signature() {
    return 'test';
  }

  description() {
    return 'Test command';
  }

  options() {
    return [];
  }

  async handle() {
    console.log('Hello Son handsome !');
    process.exit();
  }
}
