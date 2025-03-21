import DatabaseRoute from "./databases.js";
import Route from "./index.js";

export default class RootRoute extends Route {
  public register(): void {
    this.instance.register(
      (instance) => new DatabaseRoute(instance).register(),
      { prefix: "/databases" }
    );
  }
}
