# playlist-demo

How to add **video playlists** to your Next.js site using ImageKit.

One Next.js page, one `IKVideoPlayer`: five workout videos queued as a playlist
with auto-advance, a "next up" preview, per-video metadata, and end-of-series
recommendations — wired entirely through the player's `playlist` prop.

> **Live demo at a glance.** Open `/`, press play, and let a workout run to the
> end to see the auto-advance and "next up" preview. Click any row in the
> playlist widget to jump to that day. Let the last video finish to see the
> recommendations pane replace the widget.

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

> `@imagekit/video-player` still lists React 17/18 in its peer deps, so the
> bundled `.npmrc` sets `legacy-peer-deps=true` to let `npm install` run clean
> on React 19. Delete it once a release adds React 19 to its peer range.

## How it works

A playlist is an array of `sources` plus an `options` object on the player's
`playlist` prop. The data lives in [`lib/workouts.ts`](./lib/workouts.ts) and
the wiring in [`components/SeriesPlayer.tsx`](./components/SeriesPlayer.tsx):

```tsx
const playlist = {
  sources: WORKOUTS, // each: { src, info: { title, description } }
  options: {
    autoAdvance: 3,       // seconds to wait before loading the next video
    presentUpcoming: 10,  // "next up" preview lead time, in seconds
    widgetProps: { direction: "vertical" }, // widget on the right
  },
};
```

- Each source's `info` block renders in the widget and the "next up" preview.
- `recommendations` on the final source surfaces suggested videos once the
  series ends, replacing the widget.

## Customizing

- Swap the `src` values in `lib/workouts.ts` for your own ImageKit-hosted videos.
- Edit each `info.title` / `info.description` — they render in the widget and
  preview automatically.
- Change `autoAdvance`, `presentUpcoming`, `repeat`, or `widgetProps.direction`
  in `SeriesPlayer.tsx`.
- Add `recommendations` to any source to show suggestions when that video ends.

## Learn more

- [Playlist and recommendations guide](https://imagekit.io/docs/video-player/playlist-and-recommendations)
- [Video Player overview](https://imagekit.io/docs/video-player/overview)
- [Create a free ImageKit account](https://imagekit.io/registration/)
