import { multiLingual, method, route, name } from "@/decorators";
import Controller from "@/libs/Controller";

class HomeController extends Controller {
  @method("all")
  @route("/home")
  @multiLingual()
  @name("home")
  public async index() {
    this.render("wip");
  }
}

export default HomeController;
