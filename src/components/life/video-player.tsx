"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

type VideoPlayerProps = {
  videoType: "local" | "youtube";
  videoUrl: string;
  thumbnail: string;
  title: string;
  youtubeId?: string;
};

export function VideoPlayer({ videoType, videoUrl, thumbnail, title, youtubeId }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  if (isPlaying) {
    if (videoType === "youtube" && youtubeId) {
      return (
        <div className="relative aspect-video overflow-hidden rounded-3xl">
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full"
          />
        </div>
      );
    }

    return (
      <div className="relative aspect-video overflow-hidden rounded-3xl bg-black">
        <video
          controls
          autoPlay
          className="h-full w-full"
          src={videoUrl}
        >
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }

  return (
    <button
      onClick={() => setIsPlaying(true)}
      className="group relative aspect-video w-full overflow-hidden rounded-3xl"
    >
      <Image
        src={thumbnail}
        alt={title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/20 to-transparent" />
      <div className="absolute inset-0 grid place-items-center">
        <div className="grid size-16 place-items-center rounded-full bg-white/90 text-brand-600 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:bg-white">
          <Play className="ml-1 size-8" fill="currentColor" />
        </div>
      </div>
    </button>
  );
}
