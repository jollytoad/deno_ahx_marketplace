# Augmented Hypermedia Reference Marketplace (Addon)

This is an app that provides a Marketplace for addons as an addon.

It's purpose is to allow a user to browse addons available for the app in which
the Marketplace is embedded.

It's designed to be used in conjunction with a _Registrar_ addon that will
inject the appropriate actions into the Marketplace UI.

It's a TypeScript/JSX application that can run via
[Deno Runtime](https://deno.land/) or be easily deployed via
[Deno Deploy](https://deno.com/deploy).

## Local usage

You'll need to
[install Deno](https://deno.com/manual/getting_started/installation) first.

Then you can run this app locally using:

```sh
PORT=8100 deno task start
```

## Deploying

This app is designed primarily to be deploy via
[Deno Deploy](https://deno.com/deploy), so you'll need to create an account on
there and obtain a token.

You'll need to set the `DENO_DEPLOY_TOKEN` env var, update the project name in
the `deploy` task within the `deno.json` file, and then run:

```sh
deno task deploy
```

This will deploy a staging version of the addon, which you'll need to promote to
production manually in the Deploy UI.

## Registering the addon

The addon will need to be registered in an Augmented Hypermedia Registry.

You need to include the specific market id in the path of the URL:
`<base_url>/<market_id>/addon.css`

For example: `http://localhost:8100/ref/addon.css`

The `market_id` determines the type of the target host app, currently supported:

- `ref`
- `gitlab`
- `backstage`
