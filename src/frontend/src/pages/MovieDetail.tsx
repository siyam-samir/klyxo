import { useNavigate, useParams } from "@tanstack/react-router";
import {
  Calendar,
  Check,
  ChevronLeft,
  Clock,
  Play,
  Plus,
  Star,
  Tv2,
} from "lucide-react";
import { motion } from "motion/react";
import { MovieCard } from "../components/shared/MovieCard";
import { TrailerModal } from "../components/shared/TrailerModal";
import { useMediaDetails, useRecommendations } from "../hooks/use-tmdb";
import { getBackdropUrl, getImageUrl } from "../lib/tmdb";
import { useKlyxoStore } from "../store";

const STREAM_URL = "http://pollyflix.cineplexbd.net/";

function formatRuntime(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

// ── Skeleton ──────────────────────────────────────────────────────────────────

function DetailSkeleton() {
  return (
    <div
      className="min-h-screen bg-background"
      data-ocid="movie-detail-loading"
    >
      {/* Hero skeleton */}
      <div className="w-full h-[50vh] bg-muted/20 animate-pulse" />
      <div className="px-4 md:px-8 -mt-20 relative z-10 pb-8 space-y-4">
        <div className="flex gap-4 md:gap-6 pt-2">
          <div className="hidden sm:block flex-shrink-0 w-28 md:w-40 aspect-[2/3] rounded-xl bg-muted/30 animate-pulse" />
          <div className="flex-1 space-y-3 pt-4">
            <div className="h-8 w-3/4 bg-muted/30 rounded animate-pulse" />
            <div className="h-4 w-1/2 bg-muted/20 rounded animate-pulse" />
            <div className="flex gap-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-6 w-16 bg-muted/20 rounded-full animate-pulse"
                />
              ))}
            </div>
            <div className="h-4 w-full bg-muted/20 rounded animate-pulse" />
            <div className="h-4 w-4/5 bg-muted/20 rounded animate-pulse" />
          </div>
        </div>
        {/* Cast skeletons */}
        <div className="mt-8 space-y-3">
          <div className="h-6 w-24 bg-muted/30 rounded animate-pulse" />
          <div className="flex gap-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="flex-shrink-0 flex flex-col items-center gap-1"
              >
                <div className="w-16 h-16 rounded-full bg-muted/30 animate-pulse" />
                <div className="w-14 h-2 bg-muted/20 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Error State ───────────────────────────────────────────────────────────────

function DetailError({ onBack }: { onBack: () => void }) {
  return (
    <div
      className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 px-4 text-center"
      data-ocid="movie-detail-error"
    >
      <Tv2 size={48} className="text-muted-foreground/40" />
      <h2 className="stencil-title text-xl text-foreground/70">
        FAILED TO LOAD
      </h2>
      <p className="text-sm text-muted-foreground max-w-xs">
        Could not fetch movie details. Please check your connection and try
        again.
      </p>
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold border border-primary/40 text-primary hover:bg-primary/10 transition-smooth"
      >
        <ChevronLeft size={16} /> Go Back
      </button>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function MovieDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams({ strict: false }) as { id: string };
  const movieId = Number(id);

  const { data: movie, isLoading, isError } = useMediaDetails(movieId, "movie");
  const { data: recommendations = [] } = useRecommendations(movieId, "movie");
  const { openTrailer, addToWatchlist, removeFromWatchlist, isInWatchlist } =
    useKlyxoStore();
  const inWatchlist = isInWatchlist(movieId, "movie");

  if (isLoading) return <DetailSkeleton />;
  if (isError || !movie)
    return <DetailError onBack={() => navigate({ to: "/" })} />;

  const trailer =
    movie.videos?.results?.find(
      (v) => v.site === "YouTube" && v.type === "Trailer",
    ) ?? movie.videos?.results?.find((v) => v.site === "YouTube");

  const toggleWatchlist = () => {
    if (inWatchlist) {
      removeFromWatchlist(movieId, "movie");
    } else {
      addToWatchlist({
        id: movieId,
        type: "movie",
        title: movie.title,
        posterPath: movie.poster_path,
      });
    }
  };

  return (
    <div className="bg-background min-h-screen" data-ocid="movie-detail-page">
      {/* ── Hero Backdrop ─────────────────────────────────────────────── */}
      <div className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden">
        <img
          src={getBackdropUrl(movie.backdrop_path, "original")}
          alt={movie.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Dark red cinema glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 90%, rgba(80,0,0,0.55) 0%, transparent 65%)",
          }}
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/20 to-transparent" />

        {/* Back button */}
        <button
          type="button"
          onClick={() => navigate({ to: -1 as never })}
          aria-label="Go back"
          data-ocid="back-btn"
          className="absolute top-4 left-4 z-20 flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#050505]/70 border border-border text-muted-foreground hover:text-primary hover:border-primary/50 transition-smooth text-sm font-mono backdrop-blur-sm focus-visible:outline-2 focus-visible:outline-primary"
        >
          <ChevronLeft size={16} />
          Back
        </button>

        {/* Hero overlay info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-10 pb-6 md:pb-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="tech-metadata text-primary uppercase">FILM</span>
              <span className="tech-metadata text-muted-foreground">·</span>
              <span className="tech-metadata text-muted-foreground">
                {movie.release_date?.slice(0, 4)}
              </span>
              {movie.status && (
                <>
                  <span className="tech-metadata text-muted-foreground">·</span>
                  <span className="tech-metadata text-muted-foreground uppercase">
                    {movie.status}
                  </span>
                </>
              )}
            </div>

            <h1
              className="text-3xl md:text-5xl lg:text-6xl font-bold uppercase leading-tight mb-3 text-foreground drop-shadow-lg"
              style={{
                fontFamily: "Oswald, sans-serif",
                letterSpacing: "0.15em",
                WebkitTextStroke: "0.5px rgba(226,177,89,0.6)",
              }}
            >
              {movie.title}
            </h1>

            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span
                className="flex items-center gap-1 text-primary text-sm"
                style={{ fontFamily: "Rubik Dirt, cursive" }}
              >
                <Star size={12} fill="currentColor" />
                {movie.vote_average.toFixed(1)}
                <span className="text-muted-foreground text-[10px] font-mono ml-0.5">
                  ({movie.vote_count.toLocaleString()})
                </span>
              </span>
              {movie.runtime && (
                <span className="tech-metadata flex items-center gap-1 text-muted-foreground">
                  <Clock size={11} />
                  {formatRuntime(movie.runtime)}
                </span>
              )}
              <span
                className="px-2 py-0.5 rounded text-xs border bg-primary/15 text-primary border-primary/30"
                style={{
                  fontFamily: "Share Tech Mono, monospace",
                  letterSpacing: "0.05em",
                }}
              >
                WEB-DL
              </span>
            </div>

            {/* CTA buttons in hero */}
            <div className="flex items-center flex-wrap gap-2">
              <a
                href={STREAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="watch-now-btn"
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-sm transition-smooth focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
                style={{
                  background: "oklch(var(--primary))",
                  color: "#050505",
                  boxShadow: "0 0 24px rgba(226,177,89,0.5)",
                }}
              >
                <Play size={16} fill="currentColor" />
                WATCH NOW
              </a>
              {trailer && (
                <button
                  type="button"
                  onClick={() => openTrailer(trailer.key)}
                  data-ocid="play-trailer-btn"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold border border-primary/50 text-primary hover:bg-primary/10 transition-smooth focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
                >
                  <Play size={16} />
                  PLAY TRAILER
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Info Section ──────────────────────────────────────────────── */}
      <div className="px-4 md:px-8 py-6 md:py-8" data-ocid="movie-info-section">
        <div className="flex gap-5 md:gap-8 max-w-5xl">
          {/* Poster */}
          <motion.div
            className="hidden sm:block flex-shrink-0 w-28 md:w-44 rounded-xl overflow-hidden self-start"
            style={{
              boxShadow:
                "0 0 30px rgba(0,0,0,0.7), 0 0 15px rgba(226,177,89,0.1)",
            }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <img
              src={getImageUrl(movie.poster_path, "w342")}
              alt={movie.title}
              className="w-full aspect-[2/3] object-cover"
            />
          </motion.div>

          {/* Details */}
          <motion.div
            className="flex-1 min-w-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-3">
              {movie.release_date && (
                <span className="tech-metadata flex items-center gap-1 text-muted-foreground">
                  <Calendar size={12} />
                  {new Date(movie.release_date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              )}
              {movie.runtime && (
                <span className="tech-metadata flex items-center gap-1 text-muted-foreground">
                  <Clock size={12} />
                  {formatRuntime(movie.runtime)}
                </span>
              )}
              {movie.status && (
                <span
                  className="text-[10px] px-2 py-0.5 rounded-full border font-mono"
                  style={{
                    borderColor:
                      movie.status === "Released"
                        ? "rgba(34,197,94,0.4)"
                        : "rgba(226,177,89,0.3)",
                    color:
                      movie.status === "Released"
                        ? "rgb(134,239,172)"
                        : "oklch(var(--primary))",
                    background:
                      movie.status === "Released"
                        ? "rgba(34,197,94,0.08)"
                        : "rgba(226,177,89,0.08)",
                  }}
                >
                  {movie.status}
                </span>
              )}
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {movie.genres?.map((g) => (
                <span
                  key={g.id}
                  className="text-xs px-2.5 py-1 rounded-full bg-muted/40 text-muted-foreground border border-border"
                  style={{ fontFamily: "Share Tech Mono, monospace" }}
                >
                  {g.name}
                </span>
              ))}
            </div>

            {/* Tagline */}
            {movie.tagline && (
              <p
                className="text-sm italic text-primary/70 mb-3"
                style={{ fontFamily: "Pacifico, cursive" }}
              >
                "{movie.tagline}"
              </p>
            )}

            {/* Overview */}
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl mb-5">
              {movie.overview}
            </p>

            {/* Action buttons */}
            <div className="flex items-center flex-wrap gap-2">
              <a
                href={STREAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="watch-now-btn-info"
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-sm transition-smooth focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
                style={{
                  background: "oklch(var(--primary))",
                  color: "#050505",
                  boxShadow: "0 0 20px rgba(226,177,89,0.4)",
                }}
              >
                <Play size={16} fill="currentColor" />
                WATCH NOW
              </a>
              {trailer && (
                <button
                  type="button"
                  onClick={() => openTrailer(trailer.key)}
                  data-ocid="play-trailer-btn-info"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold border border-primary/40 text-primary hover:bg-primary/10 transition-smooth focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
                >
                  <Play size={16} />
                  Trailer
                </button>
              )}
              <button
                type="button"
                onClick={toggleWatchlist}
                data-ocid="watchlist-btn"
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold border border-border text-muted-foreground hover:border-primary/50 hover:text-primary transition-smooth focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
              >
                {inWatchlist ? <Check size={16} /> : <Plus size={16} />}
                {inWatchlist ? "Saved" : "Watchlist"}
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Cast Section ──────────────────────────────────────────────── */}
      {(movie.credits?.cast?.length ?? 0) > 0 && (
        <section className="px-4 md:px-8 pb-8" data-ocid="cast-section">
          <h2 className="groovy-header text-xl md:text-2xl text-primary mb-4">
            Cast
          </h2>
          <motion.div
            className="flex gap-4 overflow-x-auto pb-3 scrollbar-hide"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            {movie.credits.cast.slice(0, 15).map((member, i) => (
              <motion.div
                key={member.id}
                className="flex-shrink-0 w-[72px] text-center group"
                data-ocid={`cast-member-${member.id}`}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + i * 0.05 }}
              >
                <div
                  className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-2 border-2 border-border group-hover:border-primary/60 transition-smooth"
                  style={{ boxShadow: "0 0 0 0 rgba(226,177,89,0)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow =
                      "0 0 12px rgba(226,177,89,0.35)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow =
                      "0 0 0 0 rgba(226,177,89,0)";
                  }}
                >
                  <img
                    src={getImageUrl(member.profile_path, "w185")}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        "/assets/images/placeholder.svg";
                    }}
                  />
                </div>
                <p className="text-[10px] font-semibold text-foreground/90 truncate leading-tight">
                  {member.name}
                </p>
                <p
                  className="text-[9px] text-muted-foreground truncate leading-tight mt-0.5"
                  style={{ fontFamily: "Share Tech Mono, monospace" }}
                >
                  {member.character}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </section>
      )}

      {/* ── Recommendations ───────────────────────────────────────────── */}
      {recommendations.length > 0 && (
        <section
          className="px-4 md:px-8 pb-10 bg-muted/10 pt-6"
          data-ocid="recommendations-section"
        >
          <h2 className="groovy-header text-xl md:text-2xl text-primary mb-4">
            More Like This
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {recommendations.slice(0, 10).map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
              >
                <MovieCard item={item} type="movie" />
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* ── Footer ────────────────────────────────────────────────────── */}
      <footer className="lg:hidden px-4 py-6 text-center border-t border-border bg-card">
        <p
          className="text-xs"
          style={{ color: "#E2B159", fontFamily: "Special Elite, cursive" }}
        >
          © 2026 KLYXO | Designed &amp; Developed by Alvee Noor Siyam
        </p>
      </footer>

      <TrailerModal />
    </div>
  );
}
