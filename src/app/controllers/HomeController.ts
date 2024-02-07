import { multiLingual, method, route } from "@/decorators";
import Controller from "@/libs/Controller";

class HomeController extends Controller {
  @method("get")
  @route("/home")
  @multiLingual("fr")
  public async index() {
    this.render("wip");
  }
}

export default HomeController;
