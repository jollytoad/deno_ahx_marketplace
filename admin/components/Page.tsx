import type { Children } from "$jsx/types.ts";
import { UserWidget } from "./UserWidget.tsx";
import css from "./css.ts";

interface Props {
  children?: Children;
}

export function Page({ children }: Props) {
  return (
    <html>
      <head>
        <title>Registry - Ahh!</title>
        <link
          rel="stylesheet"
          href="https://unpkg.com/missing.css@1.1.0/dist/missing.min.css"
        />
        <style dangerouslySetInnerHTML={{ __html: css }}></style>

        <script
          src="https://unpkg.com/htmx.org@1.8.5"
          integrity="sha384-7aHh9lqPYGYZ7sTHvzP1t3BAfLhYSTy9ArHdP3Xsr9/3TlGurYgcPBoFmXX2TX/w"
          crossOrigin="anonymous"
        />
        <script>htmx.logAll();</script>
      </head>
      <body>
        <main>
          <header>
            <h1>Marketplace Admin</h1>
            <UserWidget />
          </header>

          <>
            {children}
          </>
        </main>
      </body>
    </html>
  );
}
