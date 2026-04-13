import { useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";
import type { Movie, TVShow, TrendingItem } from "../../lib/tmdb";
import { getImageUrl } from "../../lib/tmdb";

const GENRE_MAP: Record<number, string> = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Sci-Fi",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
  10759: "Action & Adventure",
  10762: "Kids",
  10763: "News",
  10764: "Reality",
  10765: "Sci-Fi & Fantasy",
  10766: "Soap",
  10767: "Talk",
  10768: "War & Politics",
};

interface MovieCardProps {
  item: Movie | TVShow | TrendingItem;
  type: "movie" | "tv";
}

export function MovieCard({ item, type }: MovieCardProps) {
  const navigate = useNavigate();
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const title = "title" in item ? item.title : item.name;
  const rating = item.vote_average;
  const genres = (item.genre_ids ?? [])
    .slice(0, 2)
    .map((id) => GENRE_MAP[id])
    .filter(Boolean);
  const posterSrc = imgError
    ? "/assets/images/placeholder.svg"
    : getImageUrl(item.poster_path, "w342");

  function handleClick() {
    if (type === "movie") {
      navigate({ to: "/movie/$id", params: { id: String(item.id) } });
    } else {
      navigate({ to: "/tv/$id", params: { id: String(item.id) } });
    }
  }

  return (
    <motion.div
      className="relative flex flex-col cursor-pointer rounded-lg overflow-hidden bg-card group focus-visible:ring-0"
      whileHover={{ scale: 1.05, boxShadow: "0 0 18px rgba(226,177,89,0.35)" }}
      transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
      onClick={handleClick}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
      tabIndex={0}
      aria-label={`${title} — ${type === "movie" ? "Movie" : "TV Show"}`}
      data-ocid="movie-card"
    >
      {/* Poster */}
      <div className="relative aspect-[2/3] bg-muted overflow-hidden">
        {!imgLoaded && !imgError && (
          <div className="absolute inset-0 bg-muted animate-pulse" />
        )}
        <img
          src={posterSrc}
          alt={title}
          className={`w-full h-full object-cover transition-opacity duration-300 ${imgLoaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setImgLoaded(true)}
          onError={() => {
            setImgError(true);
            setImgLoaded(true);
          }}
          loading="lazy"
        />
        {/* Bottom gradient */}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent pointer-events-none" />

        {/* ⭐ Rating — top left */}
        <div className="absolute top-2 left-2 flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-[#050505]/80 backdrop-blur-sm">
          <span
            className="text-[10px] leading-none text-[#E2B159]"
            style={{ fontFamily: "Rubik Dirt, cursive" }}
          >
            ⭐
          </span>
          <span
            className="text-[11px] font-bold text-[#E2B159] leading-none"
            style={{ fontFamily: "Rubik Dirt, cursive" }}
            aria-label={`Rating: ${rating.toFixed(1)}`}
          >
            {rating.toFixed(1)}
          </span>
        </div>

        {/* WEB-DL badge — top right */}
        <div
          className="absolute top-2 right-2 px-1.5 py-0.5 rounded text-[9px] text-[#E2B159]/80 bg-[#050505]/80 border border-[#E2B159]/30 backdrop-blur-sm"
          style={{
            fontFamily: "Share Tech Mono, monospace",
            letterSpacing: "0.05em",
          }}
        >
          WEB-DL
        </div>

        {/* Genre tags — bottom inside poster */}
        {genres.length > 0 && (
          <div className="absolute bottom-2 left-2 right-2 flex flex-wrap gap-1 pointer-events-none">
            {genres.map((genre) => (
              <span
                key={genre}
                className="text-[9px] px-1.5 py-0.5 rounded-full bg-[#E2B159]/15 text-[#E2B159]/80 border border-[#E2B159]/20 leading-none"
                style={{ fontFamily: "Share Tech Mono, monospace" }}
              >
                {genre}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Title */}
      <div className="px-2 py-2 flex-1 flex items-start">
        <p
          className="text-[11px] font-medium text-foreground/90 leading-snug line-clamp-2 min-w-0"
          title={title}
        >
          {title}
        </p>
      </div>

      {/* TV focus ring for Android TV remote */}
      <span
        className="absolute inset-0 rounded-lg pointer-events-none opacity-0 group-focus-visible:opacity-100"
        style={{ outline: "2px solid #E2B159", outlineOffset: "2px" }}
        aria-hidden="true"
      />
    </motion.div>
  );
}
