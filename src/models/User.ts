import Model from "@/libs/Model";
import Post from "./Post";

class User extends Model {
  protected static tableName = "user";

  public static posts() {
    return this.hasMany(Post);
  }
}

export default User;
