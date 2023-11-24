import { autoInstantiate } from "@/decorators";
import { Controller } from "@/libs";

class ErrorController extends Controller {
  @autoInstantiate
  public async notFound() {
    this.sendNotFound();
  }
}

export default ErrorController;
