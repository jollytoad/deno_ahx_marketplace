import { notFound } from "$http_fns/response/not_found.ts";
import { badRequest } from "$http_fns/response/bad_request.ts";
import { getAddon } from "@/lib/marketplace.ts";
import { AddonCard } from "./AddonCard.tsx";

type Props = Parameters<typeof AddonCard>[0];

export async function asAddonProps(
  req: Request,
  info: URLPatternResult,
): Promise<Props> {
  const { marketId, addonId } = info.pathname.groups;

  if (!marketId || !addonId) {
    throw badRequest();
  }

  const addon = await getAddon(marketId, addonId);

  if (!addon) {
    throw notFound(`Unknown addon: ${addonId}`);
  }

  return {
    addon,
    reqURL: req.headers.get("AHX-Req-URL") || undefined,
    navURL: req.headers.get("AHX-Nav-URL") || undefined,
  };
}

export function AddonView({ addon }: Props) {
  return (
    <article id="marketplace" class="marketplace-container">
      <div class="marketplace-addon">
        <AddonCard addon={addon} />
      </div>
    </article>
  );
}
