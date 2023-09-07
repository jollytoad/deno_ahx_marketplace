import { getItem, isWritable, listItems, removeItem, setItem } from "$store";
import type { Addon, AddonPatch } from "../types.ts";

const STORE = "marketplace";

export async function isReadonly(): Promise<boolean> {
  return !await isWritable([STORE]);
}

export async function getAddon(
  addonId: string,
  marketId?: string,
): Promise<Addon | undefined> {
  const addon = await getItem<Addon>([STORE, addonId]);
  if (inMarket(marketId, addon)) {
    return addon;
  }
}

export async function setAddon(
  addonPatch?: AddonPatch,
): Promise<Addon | undefined> {
  if (addonPatch && (addonPatch.id || addonPatch.newid)) {
    const newId: string = addonPatch.newid ?? addonPatch.id!;

    const oldAddon = addonPatch.id
      ? await getItem<Addon>([STORE, addonPatch.id])
      : undefined;

    const newAddon: Addon = {
      id: newId,
      title: addonPatch.title ?? oldAddon?.title ?? "(add a titled)",
      description: addonPatch.description ?? oldAddon?.description ??
        "(add a description)",
      augmentation: addonPatch.augmentation ?? oldAddon?.description ??
        "https://add.an.augmentation.url/addon.css",
      categories: addonPatch.categories ?? oldAddon?.categories ?? [],
      markets: addonPatch.markets ?? oldAddon?.markets ?? [],
    };

    await setItem([STORE, newAddon.id], newAddon);

    if (oldAddon && newAddon.id !== oldAddon.id) {
      await deleteAddon(oldAddon.id);
    }

    return newAddon;
  }
}

export async function deleteAddon(
  addonId: string,
): Promise<void> {
  await removeItem([STORE, addonId]);
}

export async function listAddons(
  marketId?: string,
): Promise<Addon[]> {
  const addons: Addon[] = [];

  for await (const [, addon] of listItems<Addon>([STORE])) {
    if (inMarket(marketId, addon)) {
      addons.push(addon);
    }
  }

  return addons;
}

export async function listCategories(
  marketId?: string,
): Promise<string[]> {
  const cats = new Set<string>();

  for await (const [, addon] of listItems<Addon>([STORE])) {
    if (inMarket(marketId, addon)) {
      addon.categories.forEach((c) => cats.add(c));
    }
  }

  return [...cats];
}

export async function listMarkets(): Promise<string[]> {
  const markets = new Set<string>();

  for await (const [, addon] of listItems<Addon>([STORE])) {
    addon.markets?.forEach((m) => markets.add(m));
  }

  return [...markets];
}

function inMarket(marketId?: string, addon?: Addon) {
  return addon &&
    (!marketId || !addon.markets || addon.markets.includes(marketId));
}
