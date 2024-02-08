import Controller from "@/libs/Controller";

class ErrorController extends Controller {
  public async notFound() {
    this.sendNotFound();
  }
}

export default ErrorController;
