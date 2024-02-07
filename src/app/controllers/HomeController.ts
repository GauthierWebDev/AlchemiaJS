import { multiLingual, method, route } from "@/decorators";
import Controller from "@/libs/Controller";

class HomeController extends Controller {
  @method("get")
  @route("/home")
  @multiLingual("en", "es")
  public async index() {
    this.render("wip");
  }
}

export default HomeController;
