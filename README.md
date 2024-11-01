# release-it-wrangler
Simple plugin for Release-It, for Cloudflare Workers.

When you run `release-it` with this plugin, it will deploy your worker to Cloudflare Workers, and then update the release notes with the deployment ID, as well as tag the release with the deployment ID.

Goal is to create a record somewhere to tie cloudflare deployment IDs directly to release-it version for easy tracking.