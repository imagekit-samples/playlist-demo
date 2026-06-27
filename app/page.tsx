import SeriesPlayer from "@/components/SeriesPlayer";

const OPTIONS: Array<{ option: string; purpose: string }> = [
  {
    option: "autoAdvance",
    purpose:
      "Seconds to wait after a video ends before loading the next one. 0 advances immediately, false disables auto-advance (viewers click to continue). Default: false.",
  },
  {
    option: "repeat",
    purpose:
      "Loop the playlist back to the first video after the last one finishes. Useful for ambient or showcase reels. Default: false.",
  },
  {
    option: "presentUpcoming",
    purpose:
      "Show a thumbnail preview of the next video before the current one ends. true uses a 10-second lead time, or pass a number for a custom value in seconds. Default: off.",
  },
  {
    option: "widgetProps.direction",
    purpose:
      "'vertical' puts the playlist widget on the right side of the player; 'horizontal' puts it below. Default: 'vertical'.",
  },
];

export default function Page() {
  return (
    <main className="min-h-screen">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <span className="text-lg font-semibold tracking-tight">
            Pulse Fitness
          </span>
          <span className="text-xs uppercase tracking-widest text-zinc-500">
            Playlist demo
          </span>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-6">
          <p className="text-xs uppercase tracking-widest text-zinc-500">
            Series · 5 workouts · 1 week
          </p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">
            Five-day foundations
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-zinc-600">
            A full week of short, focused workouts. No equipment required.
          </p>
        </div>

        <div className="mb-8 rounded-2xl border border-zinc-200 bg-white p-5 text-sm text-zinc-700 sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
            What is a video playlist?
          </p>
          <p className="mt-2">
            A queue of related videos with a scrollable widget beside the
            player. Viewers move between them with one click, the player
            auto-advances when one finishes, and a &ldquo;next up&rdquo;
            preview appears before the current video ends. The player below is
            one{" "}
            <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs">
              IKVideoPlayer
            </code>{" "}
            wired entirely through ImageKit&rsquo;s{" "}
            <a
              className="underline decoration-zinc-300 hover:decoration-zinc-700"
              href="https://imagekit.io/docs/video-player/playlist-and-recommendations"
              target="_blank"
              rel="noreferrer"
            >
              playlist source option
            </a>
            .
          </p>
          <p className="mt-3 text-xs text-zinc-500">
            <span className="font-semibold text-zinc-700">Try this →</span>{" "}
            press play and let a video run to the end to watch the auto-advance
            and the &ldquo;next up&rdquo; preview, or click any row in the
            widget to jump straight to that workout. Let the last video finish
            to see the recommendations pane.
          </p>
        </div>

        <SeriesPlayer />

        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          <div>
            <h2 className="text-base font-semibold">The series</h2>
            <ul className="mt-3 space-y-1 text-sm text-zinc-700">
              <li>Day 1 — Mobility warm-up</li>
              <li>Day 2 — Core stability</li>
              <li>Day 3 — Lower body strength</li>
              <li>Day 4 — Conditioning intervals</li>
              <li>Day 5 — Recovery flow</li>
            </ul>
          </div>
          <div>
            <h2 className="text-base font-semibold">How this demo works</h2>
            <p className="mt-3 text-sm text-zinc-700">
              The player is a single <code>IKVideoPlayer</code> with the{" "}
              <code>playlist</code> prop. Five sources, per-video titles, one
              options object — see{" "}
              <code>components/SeriesPlayer.tsx</code> and{" "}
              <code>lib/workouts.ts</code> for the full wiring.
            </p>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-base font-semibold">Playlist options</h2>
          <p className="mt-2 text-sm text-zinc-600">
            Each option on <code>playlist.options</code> controls one aspect of
            playback flow.
          </p>
          <div className="mt-4 overflow-hidden rounded-xl border border-zinc-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-zinc-50 text-xs uppercase tracking-widest text-zinc-500">
                <tr>
                  <th className="px-4 py-3 font-semibold">Option</th>
                  <th className="px-4 py-3 font-semibold">Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 text-zinc-700">
                {OPTIONS.map((o) => (
                  <tr key={o.option}>
                    <td className="whitespace-nowrap px-4 py-3 align-top">
                      <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs">
                        {o.option}
                      </code>
                    </td>
                    <td className="px-4 py-3">{o.purpose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-12 rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
            Build it yourself
          </p>
          <h2 className="mt-1 text-xl font-semibold tracking-tight">
            Add video playlists to your site with ImageKit
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-zinc-700">
            Everything you saw above is one config object on the player&rsquo;s{" "}
            <code>playlist</code> prop. No custom queue manager, no thumbnail
            strip, no auto-advance timer — the widget, previews, and
            recommendations are all declarative.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <a
              className="inline-flex items-center rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700"
              href="https://imagekit.io/registration"
              target="_blank"
              rel="noreferrer"
            >
              Try ImageKit free
            </a>
            <a
              className="text-sm font-medium text-zinc-700 underline decoration-zinc-300 underline-offset-4 hover:decoration-zinc-700"
              href="https://imagekit.io/docs/video-player/playlist-and-recommendations"
              target="_blank"
              rel="noreferrer"
            >
              Playlist docs
            </a>
            <a
              className="text-sm font-medium text-zinc-700 underline decoration-zinc-300 underline-offset-4 hover:decoration-zinc-700"
              href="https://imagekit.io/docs/video-player/overview"
              target="_blank"
              rel="noreferrer"
            >
              Video Player overview
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-zinc-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-6 text-xs text-zinc-500">
          ImageKit video playlist demo · five-video series · no backend
        </div>
      </footer>
    </main>
  );
}
