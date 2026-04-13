const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "2bfd755c66d987fef1242a68307f2ddb";
const IMAGE_BASE = "https://image.tmdb.org/t/p/";

// ── Types ─────────────────────────────────────────────────────────────────────

export type MediaType = "movie" | "tv";

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  popularity: number;
  adult: boolean;
  media_type?: "movie";
}

export interface TVShow {
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  popularity: number;
  media_type?: "tv";
}

export type TrendingItem =
  | (Movie & { media_type: "movie" })
  | (TVShow & { media_type: "tv" });

export interface Genre {
  id: number;
  name: string;
}

export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
  published_at: string;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
}

export interface MediaDetails {
  id: number;
  // Movie fields
  title: string;
  release_date: string;
  runtime?: number;
  // TV fields
  name: string;
  first_air_date: string;
  episode_run_time?: number[];
  number_of_seasons?: number;
  number_of_episodes?: number;
  // Shared fields
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  vote_count: number;
  genre_ids?: number[];
  popularity: number;
  adult?: boolean;
  media_type?: MediaType;
  genres: Genre[];
  tagline?: string;
  status: string;
  homepage?: string;
  videos: { results: Video[] };
  credits: { cast: CastMember[]; crew: CastMember[] };
}

// ── Fetcher ───────────────────────────────────────────────────────────────────

async function apiFetch<T>(
  endpoint: string,
  params: Record<string, string> = {},
): Promise<T> {
  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.set("api_key", API_KEY);
  for (const [k, v] of Object.entries(params)) {
    url.searchParams.set(k, v);
  }
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`TMDB ${res.status}: ${endpoint}`);
  return res.json() as Promise<T>;
}

interface ListResponse<T> {
  results: T[];
  total_pages: number;
  total_results: number;
  page: number;
}

// ── API Functions ─────────────────────────────────────────────────────────────

export async function getTrending(
  type: "movie" | "tv" | "all" = "all",
  timeWindow: "day" | "week" = "week",
): Promise<TrendingItem[]> {
  const data = await apiFetch<ListResponse<TrendingItem>>(
    `/trending/${type}/${timeWindow}`,
  );
  return data.results;
}

export async function getPopularMovies(): Promise<Movie[]> {
  const data = await apiFetch<ListResponse<Movie>>("/movie/popular");
  return data.results;
}

export async function getNowPlayingMovies(): Promise<Movie[]> {
  const data = await apiFetch<ListResponse<Movie>>("/movie/now_playing");
  return data.results;
}

export async function getTopRatedMovies(): Promise<Movie[]> {
  const data = await apiFetch<ListResponse<Movie>>("/movie/top_rated");
  return data.results;
}

export async function getPopularTVShows(): Promise<TVShow[]> {
  const data = await apiFetch<ListResponse<TVShow>>("/tv/popular");
  return data.results;
}

export async function getOnAirTVShows(): Promise<TVShow[]> {
  const data = await apiFetch<ListResponse<TVShow>>("/tv/on_the_air");
  return data.results;
}

export async function getMovieDetails(id: number): Promise<MediaDetails> {
  return apiFetch<MediaDetails>(`/movie/${id}`, {
    append_to_response: "videos,credits",
  });
}

export async function getTVDetails(id: number): Promise<MediaDetails> {
  return apiFetch<MediaDetails>(`/tv/${id}`, {
    append_to_response: "videos,credits",
  });
}

export async function getRecommendations(
  id: number,
  type: MediaType,
): Promise<(Movie | TVShow)[]> {
  const data = await apiFetch<ListResponse<Movie | TVShow>>(
    `/${type}/${id}/recommendations`,
  );
  return data.results;
}

export async function searchMulti(query: string): Promise<TrendingItem[]> {
  const data = await apiFetch<ListResponse<TrendingItem>>("/search/multi", {
    query,
  });
  return data.results.filter(
    (r) => r.media_type === "movie" || r.media_type === "tv",
  );
}

export function getImageUrl(
  path: string | null,
  size: "w185" | "w342" | "w500" | "w780" | "original" = "w342",
): string {
  if (!path) return "/assets/images/placeholder.svg";
  return `${IMAGE_BASE}${size}${path}`;
}

export function getBackdropUrl(
  path: string | null,
  size: "w780" | "w1280" | "original" = "w1280",
): string {
  if (!path) return "/assets/images/placeholder.svg";
  return `${IMAGE_BASE}${size}${path}`;
}

export function getMediaTitle(item: Movie | TVShow | TrendingItem): string {
  return "title" in item ? item.title : item.name;
}

export function getMediaDate(item: Movie | TVShow | TrendingItem): string {
  return "release_date" in item ? item.release_date : item.first_air_date;
}
