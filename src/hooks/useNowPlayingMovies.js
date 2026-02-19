import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utlis/constants";
import { addNowPlayingMovies, setMoviesError } from "../utlis/moviesSlice";

const NOW_PLAYING_URL =
  "https://api.themoviedb.org/3/movie/now_playing?page=1";

export default function useNowPlayingMovies() {
  const dispatch = useDispatch();
  const nowPlayingMovies = useSelector(
    (store) => store.movies?.nowPlayingMovies
  );

  useEffect(() => {
    if (nowPlayingMovies) return;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const fetchNowPlaying = async () => {
      try {
        const res = await fetch(NOW_PLAYING_URL, {
          ...API_OPTIONS,
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error(`TMDB now_playing failed: ${res.status}`);
        }

        const json = await res.json();
        dispatch(addNowPlayingMovies(json?.results ?? []));
      } catch (e) {
        dispatch(setMoviesError(e?.message ?? "Failed to fetch now playing"));
      } finally {
        clearTimeout(timeoutId);
      }
    };

    fetchNowPlaying();

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [dispatch, nowPlayingMovies]);
}

