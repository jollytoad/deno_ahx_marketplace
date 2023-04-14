// deno-lint-ignore-file require-await

export interface Addon {
  id: string;
  title: string;
  description: string;
  augmentation: string;
  categories: string[];
  markets?: string[];
}

export const config = {
  addonBaseUrl: new URL("http://localhost:8100"),
};

export async function listAddons(
  marketId: string,
): Promise<Addon[]> {
  return hardcodedAddons()
    .filter(({ markets }) => !markets || markets.includes(marketId));
}

export async function getAddon(
  marketId: string,
  addonId: string,
): Promise<Addon | undefined> {
  return hardcodedAddons()
    .find(({ id, markets }) =>
      id === addonId && (!markets || markets.includes(marketId))
    );
}

export async function listCategories(
  marketId: string,
): Promise<string[]> {
  const cats = new Set<string>();
  for (const { markets, categories } of hardcodedAddons()) {
    if (!markets || markets.includes(marketId)) {
      categories.forEach((c) => cats.add(c));
    }
  }
  return [...cats];
}

function url(path: string) {
  return new URL(path, config.addonBaseUrl).href;
}

// TODO: Move $store modules from hyper-hub into public deno.land/x space, and use it here

function hardcodedAddons(): Addon[] {
  return [
    {
      id: "quiz",
      title: "Quiz",
      description: "A fun embeddable Quiz using the Trivia API",
      augmentation: url("/quiz/addon.css"),
      categories: ["Fun", "Example", "Games"],
      markets: ["ref", "gitlab", "backstage"],
    },
    {
      id: "splats",
      title: "Project Splats",
      description: "Display version/tag/commit next to each project",
      augmentation: url("/splats/addon.css"),
      categories: ["Example", "Projects", "Git"],
      markets: ["gitlab"],
    },
  ];
}
