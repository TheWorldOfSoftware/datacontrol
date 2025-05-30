import DatabaseRoute from "./databases.js";
import Route from "./route.js";

export default class RootRoute extends Route {
  protected register(): void {
    this.instance.register((instance) => new DatabaseRoute(instance), {
      prefix: "/databases"
    });
  }
}
