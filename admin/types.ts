import type { Addon } from "../types.ts";

export interface AdminProps {
  addons: Addon[];
  editable?: boolean;
}

export interface AddonProps {
  addon?: Addon;
  editable?: boolean;
}
