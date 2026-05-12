# Sanity CMS Setup

This project can now use Sanity as the website backend.

## What Was Added

- Embedded Sanity Studio at `/studio`
- `siteSettings` schema for all editable homepage content
- Sanity content fetch in `src/lib/site-content.ts`
- JSON fallback through `src/content/site-content.json`
- Seed script to copy current local content into Sanity

## Environment Variables

Add these to `.env.local` for local development and to Vercel for production:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-sanity-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-05-01
SANITY_API_TOKEN=your-sanity-write-token-for-seeding
```

Keep the admin protection variables too:

```env
ADMIN_USERNAME=admin
ADMIN_PASSWORD=replace-with-a-long-random-password
```

## Seed Existing Content

After the Sanity project exists and the env vars are set:

```bash
npm run sanity:seed
```

This creates or replaces one document with `_id: siteSettings`.

## Editing Content

Open:

```text
http://127.0.0.1:3000/studio
```

Then edit the `Website Content` document.

Production Studio URL:

```text
https://website-fawn-nine-35.vercel.app/studio
```

## Production Notes

- Add the same Sanity env vars in Vercel.
- Add `https://website-fawn-nine-35.vercel.app` to Sanity CORS origins.
- Add `https://website-fawn-nine-35.vercel.app/studio` as a Studio host in Sanity.
- The site reads Sanity first. If Sanity is not configured or no document exists, it falls back to local JSON.
