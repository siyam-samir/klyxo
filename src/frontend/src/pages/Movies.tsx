import { useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  useNowPlayingMovies,
  usePopularMovies,
  useTopRatedMovies,
} from "../hooks/use-tmdb";
import { getImageUrl, getMediaDate } from "../lib/tmdb";
import type { Movie } from "../lib/tmdb";

function MovieCard({ movie }: { movie: Movie }) {
  const navigate = useNavigate();
  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      transition={{ duration: 0.2 }}
      className="relative group cursor-pointer rounded-lg overflow-hidden"
      style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.5)" }}
      onClick={() =>
        navigate({ to: "/movie/$id", params: { id: String(movie.id) } })
      }
      data-ocid={`movie-card-${movie.id}`}
    >
      <img
        src={getImageUrl(movie.poster_path, "w342")}
        alt={movie.title}
        className="w-full aspect-[2/3] object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-smooth flex flex-col justify-end p-2">
        <p className="text-xs font-medium text-foreground truncate">
          {movie.title}
        </p>
        <p className="text-[10px] font-mono text-muted-foreground">
          {getMediaDate(movie)?.slice(0, 4)}
        </p>
      </div>
      <div className="absolute top-2 left-2">
        <span className="distressed-rating text-primary text-xs drop-shadow-lg">
          ⭐ {movie.vote_average.toFixed(1)}
        </span>
      </div>
      <div className="absolute top-2 right-2">
        <span className="tech-metadata bg-[#050505]/80 text-primary border border-primary/30 px-1.5 py-0.5 rounded text-[10px]">
          WEB-DL
        </span>
      </div>
    </motion.div>
  );
}

export default function MoviesPage() {
  const { data: popular = [], isLoading: l1 } = usePopularMovies();
  const { data: nowPlaying = [], isLoading: l2 } = useNowPlayingMovies();
  const { data: topRated = [], isLoading: l3 } = useTopRatedMovies();
  const isLoading = l1 || l2 || l3;

  return (
    <div
      className="bg-background min-h-screen px-4 md:px-6 py-6"
      data-ocid="movies-page"
    >
      <h1
        className="stencil-title text-3xl font-bold uppercase mb-6 text-foreground"
        style={{ textShadow: "0 0 20px rgba(226,177,89,0.2)" }}
      >
        Movies
      </h1>

      {isLoading && (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 md:gap-3">
          {Array.from({ length: 18 }).map((_, i) => (
            <div
              // biome-ignore lint/suspicious/noArrayIndexKey: intentional skeleton loader
              key={i}
              className="aspect-[2/3] rounded-lg bg-muted/30 animate-pulse"
            />
          ))}
        </div>
      )}

      {!isLoading && (
        <>
          <section className="mb-8" data-ocid="now-playing-section">
            <h2 className="groovy-header text-xl text-primary mb-3">
              Now Playing
            </h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 md:gap-3">
              {nowPlaying.slice(0, 12).map((m) => (
                <MovieCard key={m.id} movie={m} />
              ))}
            </div>
          </section>

          <section
            className="mb-8 bg-muted/10 rounded-xl p-4 md:p-5"
            data-ocid="popular-movies-section"
          >
            <h2 className="groovy-header text-xl text-primary mb-3">Popular</h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 md:gap-3">
              {popular.slice(0, 18).map((m) => (
                <MovieCard key={m.id} movie={m} />
              ))}
            </div>
          </section>

          <section className="mb-8" data-ocid="top-rated-movies-section">
            <h2 className="groovy-header text-xl text-primary mb-3">
              Top Rated
            </h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 md:gap-3">
              {topRated.slice(0, 18).map((m) => (
                <MovieCard key={m.id} movie={m} />
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
