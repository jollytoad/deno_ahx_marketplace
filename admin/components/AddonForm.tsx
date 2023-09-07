import type { Addon } from "../../types.ts";

interface Props {
  action?: string;
  addon?: Addon;
  editable?: boolean;
}

export function AddonForm(
  { action = "", addon, editable }: Props,
) {
  return (
    <form
      id="addon"
      class="table rows"
      action="/-/admin/addon"
      method="post"
    >
      <p>
        <label for="id">Id</label>
        <input
          id="id"
          name="newid"
          type="text"
          value={addon?.id}
          readonly={!editable}
          autocomplete="off"
        />
        <input
          name="id"
          type="hidden"
          value={addon?.id}
        />
      </p>
      <p>
        <label for="augmentation">Augmentation URL</label>
        <input
          id="augmentation"
          name="augmentation"
          type="url"
          value={addon?.augmentation}
          readonly={!editable}
        />
      </p>
      <p>
        <label for="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          value={addon?.title}
          readonly={!editable}
        />
      </p>
      <p>
        <label for="description">Description</label>
        <textarea
          id="description"
          name="description"
          readonly={!editable}
          required
        >
          {addon?.description}
        </textarea>
      </p>
      <p>
        <label for="categories">Categories</label>
        <textarea
          id="categories"
          name="categories"
          readonly={!editable}
        >
          {addon?.categories?.join("\n")}
        </textarea>
      </p>
      <p>
        <label for="markets">Markets</label>
        <textarea
          id="markets"
          name="markets"
          readonly={!editable}
        >
          {addon?.markets?.join("\n")}
        </textarea>
      </p>
      <p>
        <div class="tool-bar">
          <button
            disabled={!editable}
            title={!editable ? "Sign in to edit" : undefined}
          >
            Save
          </button>
        </div>
      </p>
    </form>
  );
}
