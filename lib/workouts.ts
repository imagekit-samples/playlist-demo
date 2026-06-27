/**
 * Playlist data for the "Five-day foundations" workout series.
 *
 * `src` values point at workout footage hosted on ImageKit's `ikmedia` URL
 * endpoint. Swap them for your own ImageKit-hosted videos and the rest of the
 * code stays the same.
 *
 * The `info` block on each source powers the playlist widget: title and
 * description render in the scrollable list and in the "next up" preview that
 * appears before the current video ends.
 */

export type PlaylistSource = {
  src: string;
  info: {
    title: string;
    description?: string;
  };
  recommendations?: Array<{
    src: string;
    info: { title: string; description?: string };
  }>;
};

export const WORKOUTS: PlaylistSource[] = [
  {
    src: "https://ik.imagekit.io/ikmedia/example_images/playlist-demo/day1.mp4",
    info: {
      title: "Day 1 — Mobility warm-up",
      description: "10 minutes of dynamic stretching to loosen up.",
    },
  },
  {
    src: "https://ik.imagekit.io/ikmedia/example_images/playlist-demo/day2.mp4",
    info: {
      title: "Day 2 — Core stability",
      description: "Six core exercises, two rounds. No equipment.",
    },
  },
  {
    src: "https://ik.imagekit.io/ikmedia/example_images/playlist-demo/day3.mp4",
    info: {
      title: "Day 3 — Lower body strength",
      description: "Squat variations and posterior chain work.",
    },
  },
  {
    src: "https://ik.imagekit.io/ikmedia/example_images/playlist-demo/day4.mp4",
    info: {
      title: "Day 4 — Conditioning intervals",
      description: "20-minute HIIT with active recovery.",
    },
  },
  {
    src: "https://ik.imagekit.io/ikmedia/example_images/playlist-demo/day5.mp4",
    info: {
      title: "Day 5 — Recovery flow",
      description: "Slow stretching and breathwork to close the week.",
    },
    // Attached to the final source so the recommendations pane appears once
    // the series wraps up.
    recommendations: [
      {
        src: "https://ik.imagekit.io/ikmedia/example_images/playlist-demo/rec1.mp4",
        info: { title: "Next: Five-day strength series" },
      },
      {
        src: "https://ik.imagekit.io/ikmedia/example_images/playlist-demo/rec2.mp4",
        info: { title: "Watch: Eating for recovery" },
      },
    ],
  },
];
