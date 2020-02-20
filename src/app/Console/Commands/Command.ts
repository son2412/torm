export class Command {
  signature() {
    throw new Error("Method not implemented");
  }

  description() {
    return "";
  }

  options() {
    return [];
  }

  handle() {
    throw new Error("Method not implemented");
  }
}
