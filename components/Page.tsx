interface Props {
  reqURL?: URL | string;
}

export function Page(props: Props) {
  return (
    <div class="marketplace-container">
      <article
        id="marketplace"
        hx-get={props.reqURL}
        hx-trigger="load once"
        hx-swap="outerHTML"
      >
        Loading...
      </article>
    </div>
  );
}
