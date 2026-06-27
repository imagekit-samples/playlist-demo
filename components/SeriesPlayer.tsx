"use client";

import { IKVideoPlayer } from "@imagekit/video-player/react";
import "@imagekit/video-player/styles.css";
import { WORKOUTS } from "@/lib/workouts";

const IMAGEKIT_ID = process.env.NEXT_PUBLIC_IMAGEKIT_ID ?? "ikmedia";

const ikOptions = {
  imagekitId: IMAGEKIT_ID,
};

const playlist = {
  sources: WORKOUTS,
  options: {
    autoAdvance: 3,
    presentUpcoming: 10,
    widgetProps: {
      direction: "vertical" as const,
    },
  },
};

export default function SeriesPlayer() {
  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-black shadow-sm">
      <IKVideoPlayer ikOptions={ikOptions} playlist={playlist} />
    </div>
  );
}
