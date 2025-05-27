"use client";
import ReactPlayer from "react-player/youtube";

type VideoPlayerProps = {
  url: string;
};

export default function VideoPlayer({ url }: VideoPlayerProps) {
  return (
    <div className="my-4 w-full max-w-xl mx-auto aspect-video rounded-lg shadow-lg">
      <ReactPlayer url={url} controls width="100%" height="100%" />
    </div>
  );
}
