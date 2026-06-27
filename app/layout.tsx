import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Five-day foundations — ImageKit video playlist demo",
  description:
    "ImageKit Video Player SDK demo: a five-video workout series wired as a playlist with auto-advance, upcoming previews, and end-of-series recommendations.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
