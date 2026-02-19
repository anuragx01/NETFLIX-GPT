import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTrailerVideo } from "../utlis/moviesSlice";
import { API_OPTIONS } from "../utlis/constants";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();
  const trailerVideo = useSelector((store) => store.movies.trailerVideo);

  const getMovieVideos = useCallback(async () => {
    if (!movieId) return;
    
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" +
        movieId +
        "/videos?language=en-US",
      API_OPTIONS
    );
    const json = await data.json();

    const filterData = json.results.filter((video) => video.type === "Trailer");
    const trailer = filterData.length ? filterData[0] : json.results[0];
    dispatch(addTrailerVideo(trailer));
  }, [movieId, dispatch]);

  useEffect(() => {
    if (!trailerVideo && movieId) {
      getMovieVideos();
    }
  }, [movieId, trailerVideo, getMovieVideos]);
};

export default useMovieTrailer;
