import type { AdminProps } from "../types.ts";
import { Page } from "./Page.tsx";
import { AddonList } from "./AddonList.tsx";

export function AdminPage(props: AdminProps) {
  return (
    <Page>
      <section class="box">
        <h3>Addons</h3>

        <AddonList {...props} />

        <p>
          {props.editable
            ? <a href="/-/admin/addon">Create a new addon</a>
            : null}
        </p>
      </section>
    </Page>
  );
}
