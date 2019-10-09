import { Resource } from "rest-hooks";

export default class PageResource extends Resource {
  _id = null;
  user_id = null;
  title = "";
  slug = "";
  created_at = null;

  pk() {
    return this._id;
  }

  static urlRoot = `${process.env.API_URL}/pages`;
  static fetchPlugin = request =>
    request.withCredentials().set("Content-Type", "application/json");
}
