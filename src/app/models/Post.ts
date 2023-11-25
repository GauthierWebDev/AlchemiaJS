import Model from "@/libs/Model";

class Post extends Model {
  protected static tableName = "post";

  public static author() {
    // return this.belongsTo(User);
  }
}

export default Post;
