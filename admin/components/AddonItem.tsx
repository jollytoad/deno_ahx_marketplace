import type { AddonProps } from "../types.ts";

export function AddonItem(props: AddonProps) {
  const { editable, addon } = props;
  if (!addon) {
    return null;
  }
  const { id, title, description, augmentation, categories, markets } = addon;
  const mode = editable ? "Edit" : "View";
  return (
    <li data-addon-id={id} class="item">
      <span class="id" title="Id">{id}</span>
      <span class="title" title="Title">{title}</span>
      <span class="url" title="Augmentation URL">
        <a href={augmentation} target="_blank">{augmentation}</a>
      </span>
      <span class="categories flow-gap" title="Categories">
        {categories.map(chip)}
      </span>
      <span class="markets flow-gap" title="Markets">{markets.map(chip)}</span>
      <span class="actions">
        <span class="tool-bar">
          <a href={`/-/admin/addon/${id}`} class="edit">{mode}</a>
          <a href={`/-/admin/addon/${id}.json`} class="data" target="_blank">
            Data
          </a>
          <button
            class="delete"
            hx-delete={`/-/admin/addon/${id}`}
            hx-confirm="Are you sure?"
            hx-target="closest .item"
            hx-swap="delete"
            disabled={!editable}
          >
            Delete
          </button>
        </span>
      </span>
    </li>
  );
}

function chip(name: string) {
  return <span class="chip">{name}</span>;
}
