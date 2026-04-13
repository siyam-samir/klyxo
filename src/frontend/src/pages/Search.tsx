import { useNavigate } from "@tanstack/react-router";
import { Clock, Search as SearchIcon, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { FaMicrophone } from "react-icons/fa";
import { useSearch } from "../hooks/use-tmdb";
import { getImageUrl, getMediaDate, getMediaTitle } from "../lib/tmdb";
import type { TrendingItem } from "../lib/tmdb";
import type { SpeechResultEvent } from "../types/speech.d";

// ── Constants ─────────────────────────────────────────────────────────────────

type MediaFilter = "all" | "movie" | "tv";

const RECENT_KEY = "klyxo_recent_searches";
const MAX_RECENT = 8;

const POPULAR_SUGGESTIONS = [
  "Avengers",
  "Stranger Things",
  "Interstellar",
  "Breaking Bad",
  "Inception",
  "The Batman",
  "Squid Game",
  "Oppenheimer",
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function getRecent(): string[] {
  try {
    return JSON.parse(localStorage.getItem(RECENT_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function addRecent(term: string) {
  const existing = getRecent().filter((t) => t !== term);
  const next = [term, ...existing].slice(0, MAX_RECENT);
  localStorage.setItem(RECENT_KEY, JSON.stringify(next));
}

function clearRecent() {
  localStorage.removeItem(RECENT_KEY);
}

// ── Result Card ───────────────────────────────────────────────────────────────

function ResultCard({
  item,
  onClick,
}: {
  item: TrendingItem;
  onClick: () => void;
}) {
  const type = item.media_type ?? "movie";
  const title = getMediaTitle(item);
  const date = getMediaDate(item)?.slice(0, 4);

  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.18 }}
      className="relative group w-full cursor-pointer rounded-lg overflow-hidden focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 text-left"
      style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.6)" }}
      onClick={onClick}
      aria-label={`${title} (${type === "movie" ? "Movie" : "TV Show"})`}
      data-ocid={`search-result-${item.id}`}
    >
      {/* Poster */}
      <img
        src={getImageUrl(item.poster_path, "w342")}
        alt={title}
        className="w-full aspect-[2/3] object-cover bg-muted/20"
        loading="lazy"
      />

      {/* Rating badge */}
      {item.vote_average > 0 && (
        <div className="absolute top-1.5 left-1.5">
          <span
            className="distressed-rating text-[10px] leading-none px-1.5 py-0.5 rounded bg-black/70 backdrop-blur-sm text-primary"
            aria-label={`Rating ${item.vote_average.toFixed(1)}`}
          >
            ⭐ {item.vote_average.toFixed(1)}
          </span>
        </div>
      )}

      {/* Type badge */}
      <div className="absolute top-1.5 right-1.5">
        <span className="tech-metadata px-1.5 py-0.5 rounded bg-black/70 backdrop-blur-sm text-[9px] uppercase tracking-widest">
          {type === "movie" ? "FILM" : "SERIES"}
        </span>
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent opacity-0 group-hover:opacity-100 transition-smooth flex flex-col justify-end p-2 gap-0.5">
        <p className="text-xs font-semibold text-foreground truncate leading-snug">
          {title}
        </p>
        {date && (
          <p className="tech-metadata text-[10px] leading-none">{date}</p>
        )}
      </div>
    </motion.button>
  );
}

// ── Skeleton Grid ─────────────────────────────────────────────────────────────

function SkeletonGrid() {
  return (
    <div
      className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 md:gap-3"
      data-ocid="search-loading"
      aria-label="Loading results"
    >
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          // biome-ignore lint/suspicious/noArrayIndexKey: intentional skeleton loader
          key={i}
          className="aspect-[2/3] rounded-lg bg-muted/20 animate-pulse"
        />
      ))}
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function SearchPage() {
  const navigate = useNavigate();

  const [query, setQuery] = useState(() => {
    if (typeof window !== "undefined") {
      return new URLSearchParams(window.location.search).get("q") ?? "";
    }
    return "";
  });
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [filter, setFilter] = useState<MediaFilter>("all");
  const [isListening, setIsListening] = useState(false);
  const [voiceUnsupported, setVoiceUnsupported] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);
  const [recent, setRecent] = useState<string[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);

  // Debounce query
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query), 400);
    return () => clearTimeout(t);
  }, [query]);

  // Load recent on mount + focus
  useEffect(() => {
    inputRef.current?.focus();
    setRecent(getRecent());
  }, []);

  // Save to recent when search fires
  useEffect(() => {
    if (debouncedQuery.trim().length > 1) {
      addRecent(debouncedQuery.trim());
      setRecent(getRecent());
    }
  }, [debouncedQuery]);

  const {
    data: rawResults = [],
    isLoading,
    isFetching,
  } = useSearch(debouncedQuery);

  // Apply media type filter
  const results =
    filter === "all"
      ? rawResults
      : rawResults.filter((r) => r.media_type === filter);

  const handleVoice = useCallback(() => {
    const SpeechAPI =
      typeof window !== "undefined"
        ? (window.SpeechRecognition ?? window.webkitSpeechRecognition ?? null)
        : null;

    if (!SpeechAPI) {
      setVoiceUnsupported(true);
      setTimeout(() => setVoiceUnsupported(false), 3000);
      return;
    }

    const recognition = new SpeechAPI();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);
    recognition.onresult = (e: SpeechResultEvent) => {
      const transcript = e.results[0][0].transcript;
      setQuery(transcript);
      setDebouncedQuery(transcript);
    };
    recognition.start();
  }, []);

  const handleClear = () => {
    setQuery("");
    setDebouncedQuery("");
    inputRef.current?.focus();
  };

  const applyRecent = (term: string) => {
    setQuery(term);
    setDebouncedQuery(term);
    setInputFocused(false);
  };

  const handleClearHistory = () => {
    clearRecent();
    setRecent([]);
  };

  const navigateToItem = (item: TrendingItem) => {
    const type = item.media_type ?? "movie";
    navigate({ to: `/${type}/$id`, params: { id: String(item.id) } });
  };

  const showRecentPanel =
    inputFocused && query.trim().length === 0 && recent.length > 0;
  const showPopular = !showRecentPanel && query.trim().length === 0;
  const isSearching =
    (isLoading || isFetching) && debouncedQuery.trim().length > 1;
  const showResults =
    !isSearching && results.length > 0 && debouncedQuery.trim().length > 1;
  const showNoResults =
    !isSearching && debouncedQuery.trim().length > 1 && rawResults.length === 0;
  const showFilteredEmpty =
    !isSearching &&
    debouncedQuery.trim().length > 1 &&
    rawResults.length > 0 &&
    results.length === 0;

  const FILTER_TABS: { label: string; value: MediaFilter }[] = [
    { label: "All", value: "all" },
    { label: "Movies", value: "movie" },
    { label: "TV Shows", value: "tv" },
  ];

  return (
    <div
      className="bg-background min-h-screen pb-24 md:pb-8"
      data-ocid="search-page"
    >
      {/* ── Page Header ─────────────────────────────────────────────────── */}
      <div className="px-4 md:px-6 pt-6 pb-4 sticky top-0 z-30 bg-background/95 backdrop-blur-md border-b border-border/40">
        <h1 className="groovy-header text-3xl text-primary mb-4 leading-tight">
          Search
        </h1>

        {/* Search Input Row */}
        <div className="relative flex items-center gap-2">
          <div className="relative flex-1">
            <SearchIcon
              size={17}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
            />
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setInputFocused(true)}
              onBlur={() => setTimeout(() => setInputFocused(false), 150)}
              placeholder="Search movies, shows, actors..."
              aria-label="Search movies and TV shows"
              data-ocid="search-input"
              className="w-full pl-10 pr-10 py-3 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-smooth font-body text-sm caret-primary"
              style={{ background: "oklch(0.08 0 0)" }}
            />
            {query && (
              <button
                type="button"
                onClick={handleClear}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors p-0.5"
                data-ocid="search-clear-btn"
              >
                <X size={15} />
              </button>
            )}
          </div>

          {/* Mic Button */}
          <button
            type="button"
            onClick={handleVoice}
            aria-label={isListening ? "Listening…" : "Voice search"}
            aria-pressed={isListening}
            data-ocid="search-voice-btn"
            className={`relative w-11 h-11 flex-shrink-0 flex items-center justify-center rounded-xl transition-smooth focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 border ${
              isListening
                ? "bg-primary text-[#050505] border-primary"
                : "bg-card border-border text-primary hover:border-primary/60 hover:glow-gold"
            }`}
          >
            <FaMicrophone size={15} />
            {/* Pulse ring when listening */}
            {isListening && (
              <span className="absolute inset-0 rounded-xl animate-ping bg-primary/40 pointer-events-none" />
            )}
          </button>
        </div>

        {/* Voice unsupported toast */}
        <AnimatePresence>
          {voiceUnsupported && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="mt-2 text-xs text-destructive-foreground bg-destructive/20 border border-destructive/30 rounded-lg px-3 py-2"
              role="alert"
            >
              Voice search not supported in this browser.
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* ── Content Area ──────────────────────────────────────────────────── */}
      <div className="px-4 md:px-6 pt-4">
        {/* Filter Tabs — shown when query has results or is active */}
        {debouncedQuery.trim().length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-2 mb-5"
            role="tablist"
            aria-label="Filter by media type"
            data-ocid="search-filter-tabs"
          >
            {FILTER_TABS.map(({ label, value }) => (
              <button
                key={value}
                type="button"
                role="tab"
                aria-selected={filter === value}
                onClick={() => setFilter(value)}
                data-ocid={`filter-tab-${value}`}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-smooth focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 ${
                  filter === value
                    ? "bg-primary text-[#050505] border-primary"
                    : "bg-transparent text-primary border-primary/40 hover:border-primary/80"
                }`}
              >
                {label}
              </button>
            ))}
          </motion.div>
        )}

        {/* ── Recent Searches Panel ──────────────────────────────────────── */}
        <AnimatePresence>
          {showRecentPanel && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="bg-card border border-border rounded-xl overflow-hidden mb-4"
              data-ocid="search-recent-panel"
            >
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-border">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest tech-metadata">
                  Recent Searches
                </span>
                <button
                  type="button"
                  onClick={handleClearHistory}
                  className="text-xs text-primary hover:underline transition-colors"
                  data-ocid="search-clear-history"
                >
                  Clear history
                </button>
              </div>
              <ul>
                {recent.map((term) => (
                  <li key={term}>
                    <button
                      type="button"
                      onClick={() => applyRecent(term)}
                      className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-muted/30 transition-smooth group"
                      data-ocid={`recent-search-${term.replace(/\s+/g, "-").toLowerCase()}`}
                    >
                      <Clock
                        size={14}
                        className="text-muted-foreground flex-shrink-0"
                      />
                      <span className="text-sm text-foreground truncate group-hover:text-primary transition-colors">
                        {term}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Popular Suggestions (empty state) ─────────────────────────── */}
        {showPopular && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            data-ocid="search-empty"
          >
            {/* Hero icon */}
            <div className="flex flex-col items-center py-8 gap-3 mb-6">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{
                  background: "oklch(0.12 0.03 90 / 0.15)",
                  border: "1px solid oklch(0.67 0.15 90 / 0.25)",
                }}
              >
                <SearchIcon size={32} className="text-primary" />
              </div>
              <h2 className="groovy-header text-2xl text-primary text-center">
                Find Your Film
              </h2>
              <p className="text-muted-foreground text-sm text-center max-w-xs leading-relaxed">
                Search across thousands of movies and TV shows. Try a title,
                actor, or genre.
              </p>
            </div>

            {/* Popular suggestions chips */}
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest tech-metadata mb-3">
              Popular Searches
            </p>
            <div
              className="flex flex-wrap gap-2"
              data-ocid="search-suggestions"
            >
              {POPULAR_SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => {
                    setQuery(s);
                    setDebouncedQuery(s);
                  }}
                  className="px-4 py-2 rounded-full bg-card border border-border text-sm text-foreground hover:border-primary hover:text-primary hover:glow-gold transition-smooth focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
                  data-ocid={`suggestion-${s.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── Loading Skeleton ───────────────────────────────────────────── */}
        {isSearching && <SkeletonGrid />}

        {/* ── Results Grid ──────────────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          {showResults && (
            <motion.div
              key={`results-${debouncedQuery}-${filter}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {/* Count */}
              <p
                className="tech-metadata text-xs text-muted-foreground mb-3"
                aria-live="polite"
              >
                {results.length} result{results.length !== 1 ? "s" : ""} for{" "}
                <span className="text-primary">"{debouncedQuery}"</span>
              </p>

              <div
                className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 md:gap-3"
                data-ocid="search-results"
              >
                {results.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(index * 0.04, 0.4) }}
                  >
                    <ResultCard
                      item={item}
                      onClick={() => navigateToItem(item)}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── No Results ────────────────────────────────────────────────── */}
        {(showNoResults || showFilteredEmpty) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-16 text-center gap-4"
            data-ocid="search-no-results"
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{
                background: "oklch(0.12 0 0)",
                border: "1px solid oklch(0.2 0 0)",
              }}
            >
              <SearchIcon size={24} className="text-muted-foreground" />
            </div>
            <div>
              <p className="text-foreground font-semibold mb-1">
                No results for{" "}
                <span className="text-primary">"{debouncedQuery}"</span>
              </p>
              {showFilteredEmpty && (
                <p className="text-muted-foreground text-sm">
                  Try switching to "All" to see more results.
                </p>
              )}
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleClear}
                className="px-4 py-2 rounded-lg bg-card border border-border text-sm text-foreground hover:border-primary hover:text-primary transition-smooth"
                data-ocid="no-results-clear-btn"
              >
                Clear search
              </button>
              {showFilteredEmpty && filter !== "all" && (
                <button
                  type="button"
                  onClick={() => setFilter("all")}
                  className="px-4 py-2 rounded-lg bg-primary text-[#050505] text-sm font-semibold hover:bg-primary/80 transition-smooth"
                  data-ocid="no-results-show-all-btn"
                >
                  Show all types
                </button>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
