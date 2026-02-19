import React from "react";
import { useSelector } from "react-redux";
import { YOUTUBE_EMBED_URL } from "../utlis/constants";

const VideoBackground = () => {
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);

  if (!trailerVideo) return null;

  return (
    <div className="w-screen">
      <iframe
        className="w-screen aspect-video"
        src={
          YOUTUBE_EMBED_URL + trailerVideo?.key + "?&autoplay=1&mute=1"
        }
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
    </div>
  );
};

export default VideoBackground;
