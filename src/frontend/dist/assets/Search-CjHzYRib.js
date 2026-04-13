import { c as createLucideIcon, a as useNavigate, r as reactExports, j as jsxRuntimeExports, X, F as FaMicrophone, A as AnimatePresence, m as motion } from "./index-C8yyXDgB.js";
import { f as useSearch } from "./use-tmdb-BZZdlqsi.js";
import { g as getMediaTitle, c as getMediaDate, b as getImageUrl } from "./tmdb-widsgkgP.js";
import { C as Clock } from "./clock-CdADxQY4.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode);
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
  "Oppenheimer"
];
function getRecent() {
  try {
    return JSON.parse(localStorage.getItem(RECENT_KEY) ?? "[]");
  } catch {
    return [];
  }
}
function addRecent(term) {
  const existing = getRecent().filter((t) => t !== term);
  const next = [term, ...existing].slice(0, MAX_RECENT);
  localStorage.setItem(RECENT_KEY, JSON.stringify(next));
}
function clearRecent() {
  localStorage.removeItem(RECENT_KEY);
}
function ResultCard({
  item,
  onClick
}) {
  var _a;
  const type = item.media_type ?? "movie";
  const title = getMediaTitle(item);
  const date = (_a = getMediaDate(item)) == null ? void 0 : _a.slice(0, 4);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.button,
    {
      type: "button",
      whileHover: { scale: 1.04 },
      whileTap: { scale: 0.97 },
      transition: { duration: 0.18 },
      className: "relative group w-full cursor-pointer rounded-lg overflow-hidden focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 text-left",
      style: { boxShadow: "0 4px 24px rgba(0,0,0,0.6)" },
      onClick,
      "aria-label": `${title} (${type === "movie" ? "Movie" : "TV Show"})`,
      "data-ocid": `search-result-${item.id}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: getImageUrl(item.poster_path, "w342"),
            alt: title,
            className: "w-full aspect-[2/3] object-cover bg-muted/20",
            loading: "lazy"
          }
        ),
        item.vote_average > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1.5 left-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "span",
          {
            className: "distressed-rating text-[10px] leading-none px-1.5 py-0.5 rounded bg-black/70 backdrop-blur-sm text-primary",
            "aria-label": `Rating ${item.vote_average.toFixed(1)}`,
            children: [
              "⭐ ",
              item.vote_average.toFixed(1)
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1.5 right-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tech-metadata px-1.5 py-0.5 rounded bg-black/70 backdrop-blur-sm text-[9px] uppercase tracking-widest", children: type === "movie" ? "FILM" : "SERIES" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent opacity-0 group-hover:opacity-100 transition-smooth flex flex-col justify-end p-2 gap-0.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground truncate leading-snug", children: title }),
          date && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "tech-metadata text-[10px] leading-none", children: date })
        ] })
      ]
    }
  );
}
function SkeletonGrid() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 md:gap-3",
      "data-ocid": "search-loading",
      "aria-label": "Loading results",
      children: Array.from({ length: 10 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "aspect-[2/3] rounded-lg bg-muted/20 animate-pulse"
        },
        i
      ))
    }
  );
}
function SearchPage() {
  const navigate = useNavigate();
  const [query, setQuery] = reactExports.useState(() => {
    if (typeof window !== "undefined") {
      return new URLSearchParams(window.location.search).get("q") ?? "";
    }
    return "";
  });
  const [debouncedQuery, setDebouncedQuery] = reactExports.useState(query);
  const [filter, setFilter] = reactExports.useState("all");
  const [isListening, setIsListening] = reactExports.useState(false);
  const [voiceUnsupported, setVoiceUnsupported] = reactExports.useState(false);
  const [inputFocused, setInputFocused] = reactExports.useState(false);
  const [recent, setRecent] = reactExports.useState([]);
  const inputRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query), 400);
    return () => clearTimeout(t);
  }, [query]);
  reactExports.useEffect(() => {
    var _a;
    (_a = inputRef.current) == null ? void 0 : _a.focus();
    setRecent(getRecent());
  }, []);
  reactExports.useEffect(() => {
    if (debouncedQuery.trim().length > 1) {
      addRecent(debouncedQuery.trim());
      setRecent(getRecent());
    }
  }, [debouncedQuery]);
  const {
    data: rawResults = [],
    isLoading,
    isFetching
  } = useSearch(debouncedQuery);
  const results = filter === "all" ? rawResults : rawResults.filter((r) => r.media_type === filter);
  const handleVoice = reactExports.useCallback(() => {
    const SpeechAPI = typeof window !== "undefined" ? window.SpeechRecognition ?? window.webkitSpeechRecognition ?? null : null;
    if (!SpeechAPI) {
      setVoiceUnsupported(true);
      setTimeout(() => setVoiceUnsupported(false), 3e3);
      return;
    }
    const recognition = new SpeechAPI();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);
    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setQuery(transcript);
      setDebouncedQuery(transcript);
    };
    recognition.start();
  }, []);
  const handleClear = () => {
    var _a;
    setQuery("");
    setDebouncedQuery("");
    (_a = inputRef.current) == null ? void 0 : _a.focus();
  };
  const applyRecent = (term) => {
    setQuery(term);
    setDebouncedQuery(term);
    setInputFocused(false);
  };
  const handleClearHistory = () => {
    clearRecent();
    setRecent([]);
  };
  const navigateToItem = (item) => {
    const type = item.media_type ?? "movie";
    navigate({ to: `/${type}/$id`, params: { id: String(item.id) } });
  };
  const showRecentPanel = inputFocused && query.trim().length === 0 && recent.length > 0;
  const showPopular = !showRecentPanel && query.trim().length === 0;
  const isSearching = (isLoading || isFetching) && debouncedQuery.trim().length > 1;
  const showResults = !isSearching && results.length > 0 && debouncedQuery.trim().length > 1;
  const showNoResults = !isSearching && debouncedQuery.trim().length > 1 && rawResults.length === 0;
  const showFilteredEmpty = !isSearching && debouncedQuery.trim().length > 1 && rawResults.length > 0 && results.length === 0;
  const FILTER_TABS = [
    { label: "All", value: "all" },
    { label: "Movies", value: "movie" },
    { label: "TV Shows", value: "tv" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-background min-h-screen pb-24 md:pb-8",
      "data-ocid": "search-page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 md:px-6 pt-6 pb-4 sticky top-0 z-30 bg-background/95 backdrop-blur-md border-b border-border/40", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "groovy-header text-3xl text-primary mb-4 leading-tight", children: "Search" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Search,
                {
                  size: 17,
                  className: "absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  ref: inputRef,
                  type: "search",
                  value: query,
                  onChange: (e) => setQuery(e.target.value),
                  onFocus: () => setInputFocused(true),
                  onBlur: () => setTimeout(() => setInputFocused(false), 150),
                  placeholder: "Search movies, shows, actors...",
                  "aria-label": "Search movies and TV shows",
                  "data-ocid": "search-input",
                  className: "w-full pl-10 pr-10 py-3 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-smooth font-body text-sm caret-primary",
                  style: { background: "oklch(0.08 0 0)" }
                }
              ),
              query && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: handleClear,
                  "aria-label": "Clear search",
                  className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors p-0.5",
                  "data-ocid": "search-clear-btn",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 15 })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: handleVoice,
                "aria-label": isListening ? "Listening…" : "Voice search",
                "aria-pressed": isListening,
                "data-ocid": "search-voice-btn",
                className: `relative w-11 h-11 flex-shrink-0 flex items-center justify-center rounded-xl transition-smooth focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 border ${isListening ? "bg-primary text-[#050505] border-primary" : "bg-card border-border text-primary hover:border-primary/60 hover:glow-gold"}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FaMicrophone, { size: 15 }),
                  isListening && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-0 rounded-xl animate-ping bg-primary/40 pointer-events-none" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: voiceUnsupported && /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.p,
            {
              initial: { opacity: 0, y: -4 },
              animate: { opacity: 1, y: 0 },
              exit: { opacity: 0, y: -4 },
              className: "mt-2 text-xs text-destructive-foreground bg-destructive/20 border border-destructive/30 rounded-lg px-3 py-2",
              role: "alert",
              children: "Voice search not supported in this browser."
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 md:px-6 pt-4", children: [
          debouncedQuery.trim().length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: -6 },
              animate: { opacity: 1, y: 0 },
              className: "flex gap-2 mb-5",
              role: "tablist",
              "aria-label": "Filter by media type",
              "data-ocid": "search-filter-tabs",
              children: FILTER_TABS.map(({ label, value }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  role: "tab",
                  "aria-selected": filter === value,
                  onClick: () => setFilter(value),
                  "data-ocid": `filter-tab-${value}`,
                  className: `px-4 py-1.5 rounded-full text-xs font-semibold border transition-smooth focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 ${filter === value ? "bg-primary text-[#050505] border-primary" : "bg-transparent text-primary border-primary/40 hover:border-primary/80"}`,
                  children: label
                },
                value
              ))
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: showRecentPanel && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: -8 },
              animate: { opacity: 1, y: 0 },
              exit: { opacity: 0, y: -8 },
              transition: { duration: 0.2 },
              className: "bg-card border border-border rounded-xl overflow-hidden mb-4",
              "data-ocid": "search-recent-panel",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-2.5 border-b border-border", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-widest tech-metadata", children: "Recent Searches" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: handleClearHistory,
                      className: "text-xs text-primary hover:underline transition-colors",
                      "data-ocid": "search-clear-history",
                      children: "Clear history"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { children: recent.map((term) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => applyRecent(term),
                    className: "w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-muted/30 transition-smooth group",
                    "data-ocid": `recent-search-${term.replace(/\s+/g, "-").toLowerCase()}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Clock,
                        {
                          size: 14,
                          className: "text-muted-foreground flex-shrink-0"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground truncate group-hover:text-primary transition-colors", children: term })
                    ]
                  }
                ) }, term)) })
              ]
            }
          ) }),
          showPopular && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 12 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.3 },
              "data-ocid": "search-empty",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center py-8 gap-3 mb-6", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "w-20 h-20 rounded-full flex items-center justify-center",
                      style: {
                        background: "oklch(0.12 0.03 90 / 0.15)",
                        border: "1px solid oklch(0.67 0.15 90 / 0.25)"
                      },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { size: 32, className: "text-primary" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "groovy-header text-2xl text-primary text-center", children: "Find Your Film" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm text-center max-w-xs leading-relaxed", children: "Search across thousands of movies and TV shows. Try a title, actor, or genre." })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-widest tech-metadata mb-3", children: "Popular Searches" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "flex flex-wrap gap-2",
                    "data-ocid": "search-suggestions",
                    children: POPULAR_SUGGESTIONS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => {
                          setQuery(s);
                          setDebouncedQuery(s);
                        },
                        className: "px-4 py-2 rounded-full bg-card border border-border text-sm text-foreground hover:border-primary hover:text-primary hover:glow-gold transition-smooth focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2",
                        "data-ocid": `suggestion-${s.toLowerCase().replace(/\s+/g, "-")}`,
                        children: s
                      },
                      s
                    ))
                  }
                )
              ]
            }
          ),
          isSearching && /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonGrid, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: showResults && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              exit: { opacity: 0 },
              transition: { duration: 0.25 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "p",
                  {
                    className: "tech-metadata text-xs text-muted-foreground mb-3",
                    "aria-live": "polite",
                    children: [
                      results.length,
                      " result",
                      results.length !== 1 ? "s" : "",
                      " for",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary", children: [
                        '"',
                        debouncedQuery,
                        '"'
                      ] })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 md:gap-3",
                    "data-ocid": "search-results",
                    children: results.map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      motion.div,
                      {
                        initial: { opacity: 0, y: 10 },
                        animate: { opacity: 1, y: 0 },
                        transition: { delay: Math.min(index * 0.04, 0.4) },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          ResultCard,
                          {
                            item,
                            onClick: () => navigateToItem(item)
                          }
                        )
                      },
                      item.id
                    ))
                  }
                )
              ]
            },
            `results-${debouncedQuery}-${filter}`
          ) }),
          (showNoResults || showFilteredEmpty) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 10 },
              animate: { opacity: 1, y: 0 },
              className: "flex flex-col items-center justify-center py-16 text-center gap-4",
              "data-ocid": "search-no-results",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-16 h-16 rounded-full flex items-center justify-center",
                    style: {
                      background: "oklch(0.12 0 0)",
                      border: "1px solid oklch(0.2 0 0)"
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { size: 24, className: "text-muted-foreground" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-foreground font-semibold mb-1", children: [
                    "No results for",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary", children: [
                      '"',
                      debouncedQuery,
                      '"'
                    ] })
                  ] }),
                  showFilteredEmpty && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: 'Try switching to "All" to see more results.' })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: handleClear,
                      className: "px-4 py-2 rounded-lg bg-card border border-border text-sm text-foreground hover:border-primary hover:text-primary transition-smooth",
                      "data-ocid": "no-results-clear-btn",
                      children: "Clear search"
                    }
                  ),
                  showFilteredEmpty && filter !== "all" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setFilter("all"),
                      className: "px-4 py-2 rounded-lg bg-primary text-[#050505] text-sm font-semibold hover:bg-primary/80 transition-smooth",
                      "data-ocid": "no-results-show-all-btn",
                      children: "Show all types"
                    }
                  )
                ] })
              ]
            }
          )
        ] })
      ]
    }
  );
}
export {
  SearchPage as default
};
