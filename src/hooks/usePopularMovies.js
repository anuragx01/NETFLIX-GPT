import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utlis/constants";
import { addPopularMovies, setMoviesError } from "../utlis/moviesSlice";

const POPULAR_URL = "https://api.themoviedb.org/3/movie/popular?page=1";

export default function usePopularMovies() {
  const dispatch = useDispatch();
  const popularMovies = useSelector((store) => store.movies?.popularMovies);

  useEffect(() => {
    if (popularMovies) return;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const fetchPopular = async () => {
      try {
        const res = await fetch(POPULAR_URL, {
          ...API_OPTIONS,
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error(`TMDB popular failed: ${res.status}`);
        }

        const json = await res.json();
        dispatch(addPopularMovies(json?.results ?? []));
      } catch (e) {
        dispatch(setMoviesError(e?.message ?? "Failed to fetch popular"));
      } finally {
        clearTimeout(timeoutId);
      }
    };

    fetchPopular();

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [dispatch, popularMovies]);
}

