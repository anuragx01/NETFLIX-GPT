import React from "react";
import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";
import useMovieTrailer from "../hooks/useMovieTrailer";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  const mainMovie = movies?.[0];
  const movieId = mainMovie?.id;

  useMovieTrailer(movieId);

  if (!movies || movies.length === 0) return null;

  return (
    <div className="pt-[30%] bg-black md:pt-0">
      <VideoTitle title={mainMovie?.title} overview={mainMovie?.overview} />
      <VideoBackground />
    </div>
  );
};

export default MainContainer;

