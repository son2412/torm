import { Exception } from "@service/Exception";

export class ServiceProvider {
  register() {
    throw new Exception('Method is not implemented');
  }
  boot() {}
}
