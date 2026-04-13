import { useQuery } from "@tanstack/react-query";
import {
  getMovieDetails,
  getNowPlayingMovies,
  getOnAirTVShows,
  getPopularMovies,
  getPopularTVShows,
  getRecommendations,
  getTVDetails,
  getTopRatedMovies,
  getTrending,
  searchMulti,
} from "../lib/tmdb";
import type { MediaType } from "../lib/tmdb";

const STALE_TIME = 5 * 60 * 1000; // 5 minutes

export function useTrending(
  type: "movie" | "tv" | "all" = "all",
  timeWindow: "day" | "week" = "week",
) {
  return useQuery({
    queryKey: ["trending", type, timeWindow],
    queryFn: () => getTrending(type, timeWindow),
    staleTime: STALE_TIME,
  });
}

export function usePopularMovies() {
  return useQuery({
    queryKey: ["movies", "popular"],
    queryFn: getPopularMovies,
    staleTime: STALE_TIME,
  });
}

export function useNowPlayingMovies() {
  return useQuery({
    queryKey: ["movies", "now_playing"],
    queryFn: getNowPlayingMovies,
    staleTime: STALE_TIME,
  });
}

export function useTopRatedMovies() {
  return useQuery({
    queryKey: ["movies", "top_rated"],
    queryFn: getTopRatedMovies,
    staleTime: STALE_TIME,
  });
}

export function usePopularTVShows() {
  return useQuery({
    queryKey: ["tv", "popular"],
    queryFn: getPopularTVShows,
    staleTime: STALE_TIME,
  });
}

export function useOnAirTVShows() {
  return useQuery({
    queryKey: ["tv", "on_air"],
    queryFn: getOnAirTVShows,
    staleTime: STALE_TIME,
  });
}

export function useMediaDetails(id: number | undefined, type: MediaType) {
  return useQuery({
    queryKey: ["details", type, id],
    queryFn: () => {
      if (!id) throw new Error("No ID");
      return type === "movie" ? getMovieDetails(id) : getTVDetails(id);
    },
    enabled: !!id,
    staleTime: STALE_TIME,
  });
}

export function useSearch(query: string) {
  return useQuery({
    queryKey: ["search", query],
    queryFn: () => searchMulti(query),
    enabled: query.trim().length > 1,
    staleTime: STALE_TIME,
  });
}

export function useRecommendations(id: number | undefined, type: MediaType) {
  return useQuery({
    queryKey: ["recommendations", type, id],
    queryFn: () => {
      if (!id) throw new Error("No ID");
      return getRecommendations(id, type);
    },
    enabled: !!id,
    staleTime: STALE_TIME,
  });
}
