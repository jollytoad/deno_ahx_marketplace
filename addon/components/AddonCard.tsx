import type { Addon } from "../../types.ts";

interface Props {
  addon: Addon;
  reqURL?: URL | string;
  navURL?: URL | string;
}

export function AddonCard(
  { addon, navURL, reqURL }: Props,
) {
  return (
    <div id={`addon-${addon.id}`} class="addon-card" data-addon-id={addon.id}>
      <div class="addon-title">
        <a
          hx-push-url={`${navURL ?? reqURL}/${addon.id}`}
          hx-get={`${reqURL}/${addon.id}`}
          hx-target="closest .marketplace-container"
          hx-swap="outerHTML"
        >
          {addon.title}
        </a>
      </div>
      <div class="addon-desc">{addon.description}</div>
      <ul class="addon-categories">
        {addon.categories.map((category) => (
          <li class="addon-category">{category}</li>
        ))}
      </ul>
      <form class="addon-actions">
        <input type="hidden" name="id" value={addon.id} />
        <input type="hidden" name="augmentation" value={addon.augmentation} />
      </form>
    </div>
  );
}
