import { handle } from "$http_fns/handle.ts";
import auth from "./auth/handler.ts";
import admin from "./admin/handler.ts";
import addon from "./addon/handler.ts";
import { byPattern } from "$http_fns/pattern.ts";
import { seeOther } from "$http_fns/response/see_other.ts";

export default handle([
  byPattern("/", () => seeOther("/-/admin")),
  auth,
  admin,
  addon,
]);
