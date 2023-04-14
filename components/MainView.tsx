import { listAddons, listCategories } from "@/lib/marketplace.ts";
import { AddonList } from "./AddonList.tsx";
import { CategoryList } from "./CategoryList.tsx";

type Props =
  & Parameters<typeof CategoryList>[0]
  & Parameters<typeof AddonList>[0];

export async function asMainProps(
  req: Request,
  info: URLPatternResult,
): Promise<Props> {
  const { marketId } = info.pathname.groups;

  const [addons, categories] = await Promise.all([
    listAddons(marketId),
    listCategories(marketId),
  ]);

  return {
    addons,
    categories,
    reqURL: req.headers.get("AHX-Req-URL") || undefined,
    navURL: req.headers.get("AHX-Nav-URL") || undefined,
  };
}

export function MainView(props: Props) {
  return (
    <article id="marketplace" class="marketplace-container">
      <div class="marketplace-main">
        <CategoryList {...props} />
        <AddonList {...props} />
      </div>
    </article>
  );
}
