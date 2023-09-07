import { Page } from "./Page.tsx";
import { AddonForm } from "./AddonForm.tsx";
import type { AddonProps } from "../types.ts";

export function AddonPage(
  { addon, editable }: AddonProps,
) {
  return (
    <Page>
      <section class="box">
        <h3>{addon ? "Addon" : "Register Addon"}</h3>
        <AddonForm
          addon={addon}
          editable={editable}
        />
      </section>
    </Page>
  );
}
