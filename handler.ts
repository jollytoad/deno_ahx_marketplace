import { renderHTML } from "$http_render_fns/render_html.tsx";
import { renderJSON } from "$http_render_fns/render_json.ts";
import { byPattern } from "$http_fns/pattern.ts";
import { byMethod } from "$http_fns/method.ts";
import { byMediaType } from "$http_fns/media_type.ts";
import { staticRoute } from "$http_fns/static.ts";
import { asMainProps, MainView } from "@/components/MainView.tsx";
import { AddonView, asAddonProps } from "@/components/AddonView.tsx";
import { appendHeaders } from "$http_fns/response/append_headers.ts";
import { mapData } from "$http_fns/map.ts";
import { interceptResponse, skip } from "$http_fns/intercept.ts";
import { handle } from "$http_fns/handle.ts";

export default handle([
  byPattern(
    "/:marketId{/}?",
    byMethod({
      GET: interceptResponse(
        mapData(asMainProps, renderHTML(MainView)),
        fullPageHeaders,
      ),
    }),
  ),
  byPattern(
    "/:marketId/data.json",
    byMethod({
      GET: byMediaType({
        "application/json": mapData(asMainProps, renderJSON()),
      }),
    }),
  ),
  interceptResponse(
    staticRoute("/:marketId", import.meta.resolve("./static")),
    skip(404),
  ),
  byPattern(
    "/:marketId/:addonId",
    byMethod({
      GET: interceptResponse(
        mapData(asAddonProps, renderHTML(AddonView)),
        fullPageHeaders,
      ),
    }),
  ),
]);

function fullPageHeaders(req: Request, res: Response | null) {
  if (res && !req.headers.has("HX-Request")) {
    return appendHeaders(res, {
      "X-GitLab-Layout": "dashboard",
      "AHX-Full-Page": "true",
    });
  }
}
