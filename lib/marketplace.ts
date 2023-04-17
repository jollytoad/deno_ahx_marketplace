import { getItem, listItems } from "$store";

export interface Addon {
  id: string;
  title: string;
  description: string;
  augmentation: string;
  categories: string[];
  markets?: string[];
}

const STORE = "marketplace";

export async function listAddons(
  marketId: string,
): Promise<Addon[]> {
  const addons: Addon[] = [];

  for await (const [, addon] of listItems<Addon>([STORE])) {
    if (inMarket(marketId, addon)) {
      addons.push(addon);
    }
  }

  return addons;
}

export async function getAddon(
  marketId: string,
  addonId: string,
): Promise<Addon | undefined> {
  const addon = await getItem<Addon>([STORE, addonId]);
  if (inMarket(marketId, addon)) {
    return addon;
  }
}

export async function listCategories(
  marketId: string,
): Promise<string[]> {
  const cats = new Set<string>();

  for await (const [, addon] of listItems<Addon>([STORE])) {
    if (inMarket(marketId, addon)) {
      addon.categories.forEach((c) => cats.add(c));
    }
  }

  return [...cats];
}

function inMarket(marketId: string, addon?: Addon) {
  return addon && (!addon.markets || addon.markets.includes(marketId));
}
