import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { MovieCard } from "../components/shared/MovieCard";
import { Skeleton } from "../components/ui/skeleton";
import {
  useNowPlayingMovies,
  usePopularMovies,
  usePopularTVShows,
  useTrending,
} from "../hooks/use-tmdb";
import { getBackdropUrl, getImageUrl, getMediaTitle } from "../lib/tmdb";
import type { Movie, TVShow, TrendingItem } from "../lib/tmdb";
import { useKlyxoStore } from "../store";

// ── Hero Carousel ─────────────────────────────────────────────────────────────

function HeroCarousel({ items }: { items: TrendingItem[] }) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const { openTrailer } = useKlyxoStore();
  const heroes = items.slice(0, 5);

  const goTo = useCallback((index: number, dir: 1 | -1) => {
    setDirection(dir);
    setCurrent(index);
  }, []);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((c) => (c + 1) % heroes.length);
  }, [heroes.length]);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + heroes.length) % heroes.length);
  }, [heroes.length]);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(next, 5000);
  }, [next]);

  useEffect(() => {
    if (heroes.length === 0) return;
    timerRef.current = setInterval(next, 5000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [next, heroes.length]);

  if (heroes.length === 0) return <HeroSkeleton />;

  const hero = heroes[current];
  const title = getMediaTitle(hero);
  const rating = hero.vote_average;
  const yearStr =
    "release_date" in hero
      ? hero.release_date?.slice(0, 4)
      : hero.first_air_date?.slice(0, 4);

  const heroVideos = (
    hero as TrendingItem & {
      videos?: { results: Array<{ key: string; type: string; site: string }> };
    }
  ).videos;
  const trailerKey =
    heroVideos?.results.find(
      (v) => v.type === "Trailer" && v.site === "YouTube",
    )?.key ?? null;

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: "clamp(60vh, 70vh, 80vh)" }}
      aria-label="Featured content carousel"
      data-ocid="hero-carousel"
    >
      {/* Animated backdrop */}
      <AnimatePresence mode="wait" initial={false} custom={direction}>
        <motion.div
          key={current}
          className="absolute inset-0"
          custom={direction}
          initial={{ opacity: 0, x: direction * 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -50 }}
          transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
        >
          <img
            src={getBackdropUrl(hero.backdrop_path, "original")}
            alt={title}
            className="w-full h-full object-cover object-top"
          />
          {/* Dark red ambient glow from bottom */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center bottom, rgba(80,0,0,0.5) 0%, transparent 60%)",
            }}
          />
          {/* Bottom + side fades */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[#050505] to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-[#050505] to-transparent pointer-events-none" />
        </motion.div>
      </AnimatePresence>

      {/* Hero content */}
      <div className="relative h-full flex flex-col justify-end px-5 pb-14 md:px-10 md:pb-20 lg:px-14 max-w-4xl">
        {/* Title */}
        <motion.h1
          key={`title-${current}`}
          className="stencil-title text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold uppercase leading-tight mb-3 text-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.5 }}
          style={{ textShadow: "0 2px 24px rgba(0,0,0,0.9)" }}
        >
          {title}
        </motion.h1>

        {/* Rating + meta row */}
        <motion.div
          key={`meta-${current}`}
          className="flex items-center gap-3 mb-5"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.4 }}
        >
          <span
            className="text-base text-[#E2B159]"
            style={{ fontFamily: "Rubik Dirt, cursive" }}
            aria-label={`Rating ${rating.toFixed(1)}`}
          >
            ⭐ {rating.toFixed(1)}
          </span>
          <span className="w-px h-4 bg-foreground/20" aria-hidden="true" />
          <span
            className="text-xs text-[#E2B159]/70 px-1.5 py-0.5 bg-[#050505]/70 border border-[#E2B159]/30 rounded"
            style={{ fontFamily: "Share Tech Mono, monospace" }}
          >
            WEB-DL
          </span>
          {yearStr && (
            <span
              className="text-xs text-muted-foreground"
              style={{ fontFamily: "Share Tech Mono, monospace" }}
            >
              {yearStr}
            </span>
          )}
        </motion.div>

        {/* Action buttons */}
        <motion.div
          key={`btns-${current}`}
          className="flex flex-wrap gap-3"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28, duration: 0.4 }}
        >
          <a
            href="http://pollyflix.cineplexbd.net/"
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="hero-watch-now-btn"
            className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#E2B159] text-[#050505] font-bold text-sm uppercase tracking-widest transition-all duration-200 hover:bg-[#E2B159]/90 hover:shadow-[0_0_20px_rgba(226,177,89,0.5)] focus-visible:outline-2 focus-visible:outline-[#E2B159] focus-visible:outline-offset-2"
            style={{ fontFamily: "Share Tech Mono, monospace" }}
          >
            <Play size={15} fill="currentColor" />
            WATCH NOW
          </a>

          {trailerKey && (
            <button
              type="button"
              onClick={() => openTrailer(trailerKey)}
              data-ocid="hero-trailer-btn"
              className="flex items-center gap-2 px-6 py-2.5 rounded-lg border border-[#E2B159]/60 text-[#E2B159] font-bold text-sm uppercase tracking-widest bg-transparent transition-all duration-200 hover:bg-[#E2B159]/10 hover:border-[#E2B159] focus-visible:outline-2 focus-visible:outline-[#E2B159] focus-visible:outline-offset-2"
              style={{ fontFamily: "Share Tech Mono, monospace" }}
            >
              <Play size={15} />
              TRAILER
            </button>
          )}
        </motion.div>
      </div>

      {/* Prev / Next arrows (desktop) */}
      <button
        type="button"
        onClick={() => {
          prev();
          resetTimer();
        }}
        aria-label="Previous slide"
        data-ocid="hero-prev-btn"
        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 hidden md:flex items-center justify-center rounded-full bg-[#050505]/60 border border-[#E2B159]/30 text-[#E2B159]/80 hover:border-[#E2B159] hover:text-[#E2B159] hover:bg-[#050505]/80 transition-smooth focus-visible:outline-2 focus-visible:outline-[#E2B159]"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        type="button"
        onClick={() => {
          next();
          resetTimer();
        }}
        aria-label="Next slide"
        data-ocid="hero-next-btn"
        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 hidden md:flex items-center justify-center rounded-full bg-[#050505]/60 border border-[#E2B159]/30 text-[#E2B159]/80 hover:border-[#E2B159] hover:text-[#E2B159] hover:bg-[#050505]/80 transition-smooth focus-visible:outline-2 focus-visible:outline-[#E2B159]"
      >
        <ChevronRight size={18} />
      </button>

      {/* Pagination dots */}
      <div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5"
        role="tablist"
        aria-label="Slide indicators"
      >
        {heroes.map((heroItem, i) => (
          <button
            key={heroItem.id}
            type="button"
            role="tab"
            onClick={() => {
              goTo(i, i > current ? 1 : -1);
              resetTimer();
            }}
            aria-label={`Go to slide ${i + 1}`}
            aria-selected={i === current}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current
                ? "w-6 bg-[#E2B159]"
                : "w-1.5 bg-foreground/30 hover:bg-[#E2B159]/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

function HeroSkeleton() {
  return (
    <div
      className="relative w-full bg-card animate-pulse"
      style={{ height: "clamp(60vh, 70vh, 80vh)" }}
    >
      <div className="absolute bottom-20 left-8 space-y-3">
        <Skeleton className="h-10 w-72" />
        <Skeleton className="h-4 w-44" />
        <div className="flex gap-3 pt-1">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-28" />
        </div>
      </div>
    </div>
  );
}

// ── Recently Watched ──────────────────────────────────────────────────────────

function RecentlyWatchedSection() {
  const { recentlyWatched } = useKlyxoStore();
  const items = recentlyWatched.slice(0, 12);
  if (items.length === 0) return null;

  return (
    <section
      className="px-4 md:px-8 lg:px-12"
      data-ocid="recently-watched-section"
    >
      <h2
        className="text-2xl text-[#E2B159] mb-4"
        style={{ fontFamily: "Pacifico, cursive" }}
      >
        Recently Watched
      </h2>
      <div
        className="flex gap-3 overflow-x-auto pb-3"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {items.map((item) => {
          const posterSrc = item.posterPath
            ? getImageUrl(item.posterPath, "w185")
            : "/assets/images/placeholder.svg";
          return (
            <motion.div
              key={`${item.type}-${item.id}`}
              className="flex-shrink-0 w-[120px] rounded-lg overflow-hidden bg-card cursor-pointer group"
              style={{ scrollSnapAlign: "start" }}
              whileHover={{ boxShadow: "0 0 15px rgba(226,177,89,0.3)" }}
              transition={{ duration: 0.2 }}
              data-ocid="recently-watched-card"
              tabIndex={0}
            >
              <div className="relative aspect-[2/3] overflow-hidden">
                <img
                  src={posterSrc}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 to-transparent" />
              </div>
              <div className="p-2">
                <p
                  className="text-[10px] font-medium text-foreground/90 truncate mb-0.5"
                  title={item.title}
                >
                  {item.title}
                </p>
                {item.episodeInfo && (
                  <p
                    className="text-[9px] text-muted-foreground mb-1.5 truncate"
                    style={{ fontFamily: "Share Tech Mono, monospace" }}
                  >
                    {item.episodeInfo}
                  </p>
                )}
                <div
                  className="w-full h-1 rounded-full bg-[#E2B159]/20 overflow-hidden"
                  title={`${item.progress}% watched`}
                >
                  <div
                    className="h-full rounded-full bg-[#E2B159]"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

// ── Section Header ─────────────────────────────────────────────────────────────

function SectionHeader({ title }: { title: string }) {
  return (
    <h2
      className="text-2xl text-[#E2B159] mb-4"
      style={{ fontFamily: "Pacifico, cursive" }}
    >
      {title}
    </h2>
  );
}

// ── Card Grid ─────────────────────────────────────────────────────────────────

function CardGrid({
  items,
  type,
  isLoading,
}: {
  items: (Movie | TVShow | TrendingItem)[];
  type: "movie" | "tv";
  isLoading: boolean;
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
      {isLoading
        ? Array.from({ length: 10 }).map((_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholders indexed intentionally
            <div key={i} className="aspect-[2/3] rounded-lg overflow-hidden">
              <Skeleton className="w-full h-full" />
            </div>
          ))
        : items
            .slice(0, 20)
            .map((item) => (
              <MovieCard key={`${type}-${item.id}`} item={item} type={type} />
            ))}
    </div>
  );
}

// ── Media Section ─────────────────────────────────────────────────────────────

function MediaSection({
  title,
  items,
  type,
  isLoading,
}: {
  title: string;
  items: (Movie | TVShow | TrendingItem)[] | undefined;
  type: "movie" | "tv";
  isLoading: boolean;
}) {
  return (
    <motion.section
      className="px-4 md:px-8 lg:px-12"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      data-ocid={`section-${title.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <SectionHeader title={title} />
      <CardGrid items={items ?? []} type={type} isLoading={isLoading} />
    </motion.section>
  );
}

// ── Trending Section (mixed types) ────────────────────────────────────────────

function TrendingSection({
  items,
  isLoading,
}: {
  items: TrendingItem[] | undefined;
  isLoading: boolean;
}) {
  return (
    <motion.section
      className="px-4 md:px-8 lg:px-12"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      data-ocid="section-trending-now"
    >
      <SectionHeader title="Trending Now" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
        {isLoading
          ? Array.from({ length: 10 }).map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: skeleton placeholders indexed intentionally
              <div key={i} className="aspect-[2/3] rounded-lg overflow-hidden">
                <Skeleton className="w-full h-full" />
              </div>
            ))
          : (items ?? [])
              .slice(0, 20)
              .map((item) => (
                <MovieCard
                  key={`trend-${item.media_type}-${item.id}`}
                  item={item}
                  type={item.media_type === "tv" ? "tv" : "movie"}
                />
              ))}
      </div>
    </motion.section>
  );
}

// ── Home Page ─────────────────────────────────────────────────────────────────

export default function HomePage() {
  const trendingQuery = useTrending("all", "week");
  const popularMoviesQuery = usePopularMovies();
  const nowPlayingQuery = useNowPlayingMovies();
  const popularTVQuery = usePopularTVShows();

  const trendingItems = (trendingQuery.data ?? []) as TrendingItem[];

  return (
    <div
      className="flex flex-col gap-10 pb-24 md:pb-10 bg-background min-h-screen"
      data-ocid="home-page"
    >
      {/* Hero Carousel */}
      <HeroCarousel items={trendingItems} />

      {/* Recently Watched */}
      <RecentlyWatchedSection />

      {/* Trending Now */}
      <TrendingSection
        items={trendingQuery.data}
        isLoading={trendingQuery.isLoading}
      />

      {/* Popular Movies */}
      <MediaSection
        title="Popular Movies"
        items={popularMoviesQuery.data}
        type="movie"
        isLoading={popularMoviesQuery.isLoading}
      />

      {/* Now Playing */}
      <MediaSection
        title="Now Playing"
        items={nowPlayingQuery.data}
        type="movie"
        isLoading={nowPlayingQuery.isLoading}
      />

      {/* Popular TV Shows */}
      <MediaSection
        title="Popular TV Shows"
        items={popularTVQuery.data}
        type="tv"
        isLoading={popularTVQuery.isLoading}
      />
    </div>
  );
}
