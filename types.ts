export interface Addon {
  id: string;
  title: string;
  description: string;
  augmentation: string;
  categories: string[];
  markets: string[];
}

export type AddonPatch = Partial<Addon> & {
  newid?: string;
};
