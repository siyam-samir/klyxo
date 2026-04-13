import { useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useOnAirTVShows, usePopularTVShows } from "../hooks/use-tmdb";
import { getImageUrl, getMediaDate } from "../lib/tmdb";
import type { TVShow } from "../lib/tmdb";

function TVCard({ show }: { show: TVShow }) {
  const navigate = useNavigate();
  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      transition={{ duration: 0.2 }}
      className="relative group cursor-pointer rounded-lg overflow-hidden"
      style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.5)" }}
      onClick={() =>
        navigate({ to: "/tv/$id", params: { id: String(show.id) } })
      }
      data-ocid={`tv-card-${show.id}`}
    >
      <img
        src={getImageUrl(show.poster_path, "w342")}
        alt={show.name}
        className="w-full aspect-[2/3] object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-smooth flex flex-col justify-end p-2">
        <p className="text-xs font-medium text-foreground truncate">
          {show.name}
        </p>
        <p className="text-[10px] font-mono text-muted-foreground">
          {getMediaDate(show)?.slice(0, 4)}
        </p>
      </div>
      <div className="absolute top-2 left-2">
        <span className="distressed-rating text-primary text-xs drop-shadow-lg">
          ⭐ {show.vote_average.toFixed(1)}
        </span>
      </div>
      <div className="absolute top-2 right-2">
        <span className="tech-metadata bg-[#050505]/80 text-primary border border-primary/30 px-1.5 py-0.5 rounded text-[10px]">
          SERIES
        </span>
      </div>
    </motion.div>
  );
}

export default function TVShowsPage() {
  const { data: popular = [], isLoading: l1 } = usePopularTVShows();
  const { data: onAir = [], isLoading: l2 } = useOnAirTVShows();
  const isLoading = l1 || l2;

  return (
    <div
      className="bg-background min-h-screen px-4 md:px-6 py-6"
      data-ocid="tvshows-page"
    >
      <h1
        className="stencil-title text-3xl font-bold uppercase mb-6 text-foreground"
        style={{ textShadow: "0 0 20px rgba(226,177,89,0.2)" }}
      >
        TV Shows
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
          <section className="mb-8" data-ocid="on-air-section">
            <h2 className="groovy-header text-xl text-primary mb-3">
              On Air Now
            </h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 md:gap-3">
              {onAir.slice(0, 12).map((s) => (
                <TVCard key={s.id} show={s} />
              ))}
            </div>
          </section>

          <section
            className="mb-8 bg-muted/10 rounded-xl p-4 md:p-5"
            data-ocid="popular-tv-section"
          >
            <h2 className="groovy-header text-xl text-primary mb-3">Popular</h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 md:gap-3">
              {popular.slice(0, 18).map((s) => (
                <TVCard key={s.id} show={s} />
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
