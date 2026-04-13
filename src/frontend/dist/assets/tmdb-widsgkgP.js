const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "2bfd755c66d987fef1242a68307f2ddb";
const IMAGE_BASE = "https://image.tmdb.org/t/p/";
async function apiFetch(endpoint, params = {}) {
  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.set("api_key", API_KEY);
  for (const [k, v] of Object.entries(params)) {
    url.searchParams.set(k, v);
  }
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`TMDB ${res.status}: ${endpoint}`);
  return res.json();
}
async function getTrending(type = "all", timeWindow = "week") {
  const data = await apiFetch(
    `/trending/${type}/${timeWindow}`
  );
  return data.results;
}
async function getPopularMovies() {
  const data = await apiFetch("/movie/popular");
  return data.results;
}
async function getNowPlayingMovies() {
  const data = await apiFetch("/movie/now_playing");
  return data.results;
}
async function getTopRatedMovies() {
  const data = await apiFetch("/movie/top_rated");
  return data.results;
}
async function getPopularTVShows() {
  const data = await apiFetch("/tv/popular");
  return data.results;
}
async function getOnAirTVShows() {
  const data = await apiFetch("/tv/on_the_air");
  return data.results;
}
async function getMovieDetails(id) {
  return apiFetch(`/movie/${id}`, {
    append_to_response: "videos,credits"
  });
}
async function getTVDetails(id) {
  return apiFetch(`/tv/${id}`, {
    append_to_response: "videos,credits"
  });
}
async function getRecommendations(id, type) {
  const data = await apiFetch(
    `/${type}/${id}/recommendations`
  );
  return data.results;
}
async function searchMulti(query) {
  const data = await apiFetch("/search/multi", {
    query
  });
  return data.results.filter(
    (r) => r.media_type === "movie" || r.media_type === "tv"
  );
}
function getImageUrl(path, size = "w342") {
  if (!path) return "/assets/images/placeholder.svg";
  return `${IMAGE_BASE}${size}${path}`;
}
function getBackdropUrl(path, size = "w1280") {
  if (!path) return "/assets/images/placeholder.svg";
  return `${IMAGE_BASE}${size}${path}`;
}
function getMediaTitle(item) {
  return "title" in item ? item.title : item.name;
}
function getMediaDate(item) {
  return "release_date" in item ? item.release_date : item.first_air_date;
}
export {
  getBackdropUrl as a,
  getImageUrl as b,
  getMediaDate as c,
  getTrending as d,
  getPopularMovies as e,
  getNowPlayingMovies as f,
  getMediaTitle as g,
  getTopRatedMovies as h,
  getPopularTVShows as i,
  getOnAirTVShows as j,
  getMovieDetails as k,
  getTVDetails as l,
  getRecommendations as m,
  searchMulti as s
};
