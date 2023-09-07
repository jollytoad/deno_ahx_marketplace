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
  console.log(addonPatch);
  if (addonPatch && (addonPatch.id || addonPatch.newid)) {
    const newId: string = addonPatch.newid ?? addonPatch.id!;

    const addon: Addon =
      addonPatch.id && await getItem([STORE, addonPatch.id]) || {
        id: newId,
        title: addonPatch.title ?? "",
        description: addonPatch.description ?? "",
        augmentation: addonPatch.augmentation ?? "",
        categories: addonPatch.categories ?? [],
        markets: addonPatch.markets ?? [],
      };

    const oldId = addon.id;

    if (newId && newId !== oldId) {
      addon.id = newId;
    }

    await setItem([STORE, addon.id], addon);

    if (oldId && addon.id !== oldId) {
      await deleteAddon(oldId);
    }

    return addon;
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
