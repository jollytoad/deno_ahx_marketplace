import type { AdminProps } from "../types.ts";
import { AddonItem } from "./AddonItem.tsx";

export function AddonList(props: AdminProps) {
  return (
    <ul id="addons" class="table rows">
      {props.addons.map((addon) => <AddonItem {...props} addon={addon} />)}
    </ul>
  );
}
