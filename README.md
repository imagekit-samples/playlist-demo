# playlist-demo

How to add **video playlists** to your Next.js site using ImageKit.

A focused blog-companion demo: one Next.js page, one `IKVideoPlayer`, five
workout videos queued as a playlist, with auto-advance, a "next up" preview,
per-video metadata, and end-of-series recommendations wired end-to-end.
Nothing else.

> **Live demo at a glance.** Open `/`, press play, and let a workout run to the
> end to see the auto-advance and the "next up" preview. Click any row in the
> playlist widget to jump to that day. Let the last video finish to see the
> recommendations pane replace the widget.

---

## What's a video playlist?

A playlist is a queue of related videos with a scrollable widget beside the
player. Viewers move between them with one click, the player auto-advances
when one finishes, and a "next up" preview appears before the current video
ends. Once the series wraps up, a recommendations pane surfaces suggested next
videos.

Common use cases: course modules, workout series, episodic content, showcase
reels — anything where one video should pull viewers into the next.

## Why use ImageKit for it

- **No queue manager to build.** `@imagekit/video-player` ships playlists as a
  config option — the widget, auto-advance timer, "next up" preview, and
  recommendations pane are all declarative.
- **Per-video metadata is automatic.** Each source's `info` block (title +
  description) renders in the widget and the preview without extra markup.
- **Video delivery is handled.** The same player supports HLS adaptive
  streaming, optimized formats, and edge caching when you're ready to scale.

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS v4
- `@imagekit/video-player` (latest)

## Run it

```bash
cp .env.local.example .env.local   # optional — defaults to ikmedia
npm install
npm run dev
```

Open http://localhost:3000.

> **Why `.npmrc` exists in this folder.** `@imagekit/video-player` still
> declares React 17/18 in its `peerDependencies`, so npm 10 would otherwise
> reject a clean install on React 19 even though the player runs fine. We ship
> a single-line `.npmrc` with `legacy-peer-deps=true` so `npm install` Just
> Works. Delete it once a player release adds React 19 to its peer range.

## 1. Set up the ImageKit Video Player

Install the player package (already pinned in `package.json`):

```bash
npm install @imagekit/video-player --legacy-peer-deps
```

The React wrapper ships from a subpath. Import it together with the bundled
stylesheet so the controls look right:

```tsx
"use client";

import { IKVideoPlayer } from "@imagekit/video-player/react";
import "@imagekit/video-player/styles.css";

const ikOptions = {
  imagekitId: "ikmedia", // your ImageKit ID — find it in your dashboard
};
```

`imagekitId` tells the player which ImageKit URL endpoint to use. Set
`NEXT_PUBLIC_IMAGEKIT_ID` in `.env.local` to point at your own account; the
demo defaults to ImageKit's public `ikmedia` so it runs without any upload.

## 2. Define the playlist

Playlists live on a `playlist` prop, parallel to `source`. The shape is an
array of `sources` plus an `options` object. Keep the data in its own file so
the player component stays easy to scan — see
[`lib/workouts.ts`](./lib/workouts.ts):

```tsx
export const WORKOUTS = [
  {
    src: "https://ik.imagekit.io/ikmedia/sample-video.mp4",
    info: {
      title: "Day 1 — Mobility warm-up",
      description: "10 minutes of dynamic stretching to loosen up.",
    },
  },
  // …four more days
];
```

The `info` block on each source powers the widget: title and description
render in the scrollable list and in the "next up" preview.

## 3. Choose the right playlist options

Each option in `playlist.options` controls one aspect of playback flow:

| Option | Purpose |
| --- | --- |
| `autoAdvance` | Seconds to wait after a video ends before loading the next one. `0` advances immediately, `false` disables auto-advance. **Default:** `false`. |
| `repeat` | Loop the playlist back to the first video after the last one finishes. **Default:** `false`. |
| `presentUpcoming` | Show a thumbnail preview of the next video before the current one ends. `true` uses a 10-second lead time, or pass a number for a custom value in seconds. **Default:** off. |
| `widgetProps.direction` | `'vertical'` puts the widget on the right side of the player; `'horizontal'` puts it below. **Default:** `'vertical'`. |

This demo uses `autoAdvance: 3`, `presentUpcoming: 10`, and a vertical widget —
see [`components/SeriesPlayer.tsx`](./components/SeriesPlayer.tsx).

> The `as const` annotation on `direction` is intentional. The SDK uses
> string-literal union types for the option, so the value needs to be narrowed
> to `'vertical' | 'horizontal'`.

## 4. Surface recommendations at the end of the series

The `recommendations` property on a source surfaces a set of suggested next
videos when that video ends. Attach them to the **last** source so they appear
after the series wraps up:

```tsx
{
  src: "https://ik.imagekit.io/demo/sample-video.mp4",
  info: { title: "Day 5 — Recovery flow" },
  recommendations: [
    { src: "…/series-02-intro.mp4", info: { title: "Next: Five-day strength series" } },
    { src: "…/nutrition-basics.mp4", info: { title: "Watch: Eating for recovery" } },
  ],
}
```

When the final video ends, the player swaps the playlist widget for the
recommendations pane. Clicking a recommendation loads that video and exits the
playlist context.

## Files

```
playlist-demo/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   └── SeriesPlayer.tsx
├── lib/
│   └── workouts.ts
├── .env.local.example
├── .gitignore
├── .npmrc             ← legacy-peer-deps for React 19 (see "Run it")
├── BLOG.md            ← companion tutorial post
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── README.md
└── tsconfig.json
```

The companion tutorial — same configuration, written as a step-by-step blog
post — lives in [`BLOG.md`](./BLOG.md).

## Where to look first

- [`lib/workouts.ts`](./lib/workouts.ts) — the five workout sources, their
  per-video `info`, and the recommendations on the final day.
- [`components/SeriesPlayer.tsx`](./components/SeriesPlayer.tsx) — the only
  client component. Wires `WORKOUTS` into the player's `playlist` prop with
  auto-advance, upcoming preview, and a vertical widget.
- [`app/page.tsx`](./app/page.tsx) — page layout that wraps the player.

## Customizing

- Swap the `src` values in `lib/workouts.ts` for your own ImageKit-hosted
  videos. The demo uses ImageKit's public sample media as stand-ins so it runs
  with no upload.
- Edit each source's `info.title` / `info.description` — they render in the
  widget and the "next up" preview automatically.
- Change `autoAdvance`, `presentUpcoming`, `repeat`, or `widgetProps.direction`
  in `SeriesPlayer.tsx` to match your content — see the
  [playlist docs](https://imagekit.io/docs/video-player/playlist-and-recommendations)
  for the full option list.
- Add `recommendations` to any source (not just the last) to show suggestions
  when that specific video ends.

## Try ImageKit for video playlists

1. **[Create a free ImageKit account](https://imagekit.io/registration/)** — you
   get a URL endpoint and 20 GB of free CDN bandwidth a month.
2. Upload your videos, or point ImageKit at an existing bucket (S3, GCS, Azure,
   web folder).
3. Replace `imagekitId` and the `src` values in this demo with your own. That's
   it — the rest of the code stays the same.

### Learn more

- [Playlist and recommendations guide](https://imagekit.io/docs/video-player/playlist-and-recommendations)
  — full option reference for `sources`, `options`, and `recommendations`.
- [Video Player overview](https://imagekit.io/docs/video-player/overview) —
  setup, source options, and every other player feature (HLS, subtitles,
  chapters, shoppable, floating playback).
- [Video API & optimization](https://imagekit.io/docs/optimize-image-and-video-for-web-delivery)
  — how ImageKit serves the actual video bytes (formats, ABR, caching).

## Out of scope

This demo is intentionally small. If you want shoppable products, subtitles,
chapters, smart reframe, or AI thumbnails, see the other demos in this
workspace (`atlas-shoppable-demo`, `nextjs-video-optimization-new`,
`react-summit-demo`) — each is scoped to a different feature.
