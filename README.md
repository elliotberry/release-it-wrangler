# release-it-wrangler
Simple plugin for Release-It, for Cloudflare Workers.

When you run `release-it` with this plugin, it will deploy your worker to Cloudflare Workers, and then update the release notes with the deployment ID, as well as tag the release with the deployment ID.

Make sure your wrangler.toml is up to spec, my peeps.

Goal is to create a record somewhere to tie cloudflare deployment IDs directly to release-it version for easy tracking.

Add release-it-wrangler to your project by installing it with npm:

```npm install -D release-it-wrangler```

Then add the plugin to your release-it configuration:

```json
...
{
  "plugins": {
    "release-it-wrangler": {}
  }
}
...
```