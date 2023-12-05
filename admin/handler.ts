import { renderHTML } from "$http_render_fns/render_html.tsx";
import { renderJSON } from "$http_render_fns/render_json.ts";
import { byPattern } from "$http_fns/by_pattern.ts";
import { byMethod } from "$http_fns/by_method.ts";
import { byMediaType } from "$http_fns/by_media_type.ts";
import { staticRoute } from "$http_fns/static_route.ts";
import { mapData } from "$http_fns/map_data.ts";
import { interceptResponse, skip } from "$http_fns/intercept.ts";
import type { AddonProps, AdminProps } from "../admin/types.ts";
import { AdminPage } from "./components/AdminPage.tsx";
import {
  deleteAddon,
  getAddon,
  listAddons,
  setAddon,
} from "../lib/marketplace.ts";
import { canEdit } from "./permission.ts";
import { cascade } from "$http_fns/cascade.ts";
import { AddonPage } from "./components/AddonPage.tsx";
import { notFound } from "$http_fns/response/not_found.ts";
import { forbidden } from "$http_fns/response/forbidden.ts";
import { getBodyAsObject } from "$http_fns/request/body_as_object.ts";
import { seeOther } from "$http_fns/response/see_other.ts";
import { badRequest } from "$http_fns/response/bad_request.ts";
import type { AddonPatch } from "../types.ts";

export default cascade(
  byPattern(
    "/-/admin",
    byMethod({
      GET: byMediaType({
        "text/html": mapData(asAdminProps, renderHTML(AdminPage)),
        "application/json": mapData(asAdminProps, renderJSON()),
      }),
    }),
  ),
  byPattern(
    "/-/admin/addon",
    byMethod({
      GET: byMediaType({
        "text/html": mapData(asAddonProps, renderHTML(AddonPage)),
      }),
      POST: handlePostAddon,
    }),
  ),
  byPattern(
    "/-/admin/addon/:addonId{.:ext}?",
    byMethod({
      GET: byMediaType({
        "text/html": mapData(asAddonProps, renderHTML(AddonPage)),
        "application/json": mapData(asAddonProps, renderJSON()),
      }),
      DELETE: handleDeleteAddon,
    }),
  ),
  interceptResponse(
    staticRoute("/-", import.meta.resolve("./static")),
    skip(404),
  ),
);

async function handlePostAddon(req: Request, _match: URLPatternResult) {
  if (await canEdit(req)) {
    const data = await getBodyAsObject<AddonPatch>(req, processForm);

    await setAddon(data);

    return seeOther(new URL("/-/admin", req.url));
  } else {
    return forbidden();
  }
}

async function handleDeleteAddon(req: Request, match: URLPatternResult) {
  const { addonId } = match.pathname.groups;

  if (!addonId) {
    return badRequest();
  }

  if (await canEdit(req)) {
    await deleteAddon(addonId);

    return seeOther(new URL("/-/admin", req.url));
  } else {
    return forbidden();
  }
}

async function asAdminProps(
  req: Request,
): Promise<AdminProps & { req: Request }> {
  const addons = await listAddons();
  const editable = await canEdit(req);

  return { req, addons, editable };
}

async function asAddonProps(
  req: Request,
  match: URLPatternResult,
): Promise<AddonProps & { req: Request }> {
  const { addonId } = match.pathname.groups;

  const editable = await canEdit(req);

  if (addonId) {
    const addon = await getAddon(addonId);

    if (!addon) {
      throw notFound();
    }

    return { req, addon, editable };
  } else {
    return { req, editable };
  }
}

function processForm(data: Record<string, unknown>): Partial<AddonPatch> {
  return {
    ...data,
    categories: splitLines(data.categories),
    markets: splitLines(data.markets),
  };
}

function splitLines(value: unknown): string[] | undefined {
  return typeof value === "string"
    ? value.split(/\s*\n\s*/)
    : Array.isArray(value)
    ? value
    : undefined;
}
