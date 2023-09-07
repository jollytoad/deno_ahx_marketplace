import type { Addon } from "../../types.ts";
import { AddonCard } from "./AddonCard.tsx";

interface Props {
  addons: Addon[];
  reqURL?: URL | string;
  navURL?: URL | string;
}

export function AddonList({ addons, ...props }: Props) {
  return (
    <div class="marketplace-addon-list">
      <h4>Addons</h4>

      <ul>
        {addons.map((addon) => (
          <li>
            <AddonCard addon={addon} {...props} />
          </li>
        ))}
      </ul>
    </div>
  );
}
