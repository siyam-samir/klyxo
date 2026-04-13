import { c as createLucideIcon, a as useNavigate, g as useParams, u as useKlyxoStore, r as reactExports, j as jsxRuntimeExports, m as motion, T as TrailerModal } from "./index-C8yyXDgB.js";
import { C as ChevronLeft, P as Play, M as MovieCard } from "./MovieCard-Cm--8EtN.js";
import { g as useMediaDetails, h as useRecommendations } from "./use-tmdb-BZZdlqsi.js";
import { a as getBackdropUrl, b as getImageUrl } from "./tmdb-widsgkgP.js";
import { S as Star, T as TvMinimal, C as Calendar, a as Check, P as Plus } from "./tv-minimal-CGzJLLcq.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]];
const ChevronDown = createLucideIcon("chevron-down", __iconNode);
const STREAM_URL = "http://pollyflix.cineplexbd.net/";
function DetailSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", "data-ocid": "tv-detail-loading", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-[50vh] bg-muted/20 animate-pulse" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 md:px-8 py-6 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 md:gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden sm:block flex-shrink-0 w-28 md:w-40 aspect-[2/3] rounded-xl bg-muted/30 animate-pulse" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-3 pt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-3/4 bg-muted/30 rounded animate-pulse" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-1/2 bg-muted/20 rounded animate-pulse" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-6 w-16 bg-muted/20 rounded-full animate-pulse"
            },
            i
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-full bg-muted/20 rounded animate-pulse" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-4/5 bg-muted/20 rounded animate-pulse" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6 w-24 bg-muted/30 rounded animate-pulse" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-3", children: [1, 2, 3, 4, 5].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex-shrink-0 flex flex-col items-center gap-1",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-muted/30 animate-pulse" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-2 bg-muted/20 rounded animate-pulse" })
            ]
          },
          i
        )) })
      ] })
    ] })
  ] });
}
function DetailError({ onBack }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen bg-background flex flex-col items-center justify-center gap-4 px-4 text-center",
      "data-ocid": "tv-detail-error",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TvMinimal, { size: 48, className: "text-muted-foreground/40" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "stencil-title text-xl text-foreground/70", children: "FAILED TO LOAD" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-xs", children: "Could not fetch show details. Please check your connection and try again." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: onBack,
            className: "flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold border border-primary/40 text-primary hover:bg-primary/10 transition-smooth",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { size: 16 }),
              " Go Back"
            ]
          }
        )
      ]
    }
  );
}
function TVDetailPage() {
  var _a, _b, _c, _d, _e, _f, _g, _h;
  const navigate = useNavigate();
  const { id } = useParams({ strict: false });
  const showId = Number(id);
  const { data: show, isLoading, isError } = useMediaDetails(showId, "tv");
  const { data: recommendations = [] } = useRecommendations(showId, "tv");
  const { openTrailer, addToWatchlist, removeFromWatchlist, isInWatchlist } = useKlyxoStore();
  const inWatchlist = isInWatchlist(showId, "tv");
  const [selectedSeason, setSelectedSeason] = reactExports.useState(1);
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(DetailSkeleton, {});
  if (isError || !show)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(DetailError, { onBack: () => navigate({ to: "/" }) });
  const trailer = ((_b = (_a = show.videos) == null ? void 0 : _a.results) == null ? void 0 : _b.find(
    (v) => v.site === "YouTube" && v.type === "Trailer"
  )) ?? ((_d = (_c = show.videos) == null ? void 0 : _c.results) == null ? void 0 : _d.find((v) => v.site === "YouTube"));
  const toggleWatchlist = () => {
    if (inWatchlist) {
      removeFromWatchlist(showId, "tv");
    } else {
      addToWatchlist({
        id: showId,
        type: "tv",
        title: show.name,
        posterPath: show.poster_path
      });
    }
  };
  const seasonsCount = show.number_of_seasons ?? 0;
  const episodesCount = show.number_of_episodes ?? 0;
  const seasonOptions = Array.from({ length: seasonsCount }, (_, i) => i + 1);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background min-h-screen", "data-ocid": "tv-detail-page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full h-[50vh] md:h-[60vh] overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: getBackdropUrl(show.backdrop_path, "original"),
          alt: show.name,
          className: "absolute inset-0 w-full h-full object-cover"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "absolute inset-0 pointer-events-none",
          style: {
            background: "radial-gradient(ellipse at 50% 90%, rgba(80,0,0,0.55) 0%, transparent 65%)"
          }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/50 to-transparent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/20 to-transparent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => navigate({ to: -1 }),
          "aria-label": "Go back",
          "data-ocid": "back-btn",
          className: "absolute top-4 left-4 z-20 flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#050505]/70 border border-border text-muted-foreground hover:text-primary hover:border-primary/50 transition-smooth text-sm font-mono backdrop-blur-sm focus-visible:outline-2 focus-visible:outline-primary",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { size: 16 }),
            "Back"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-0 right-0 p-4 md:p-10 pb-6 md:pb-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tech-metadata text-primary uppercase", children: "SERIES" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tech-metadata text-muted-foreground", children: "·" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tech-metadata text-muted-foreground", children: (_e = show.first_air_date) == null ? void 0 : _e.slice(0, 4) }),
          seasonsCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tech-metadata text-muted-foreground", children: "·" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "tech-metadata text-muted-foreground", children: [
              seasonsCount,
              " Season",
              seasonsCount > 1 ? "s" : "",
              episodesCount > 0 && ` · ${episodesCount} Episodes`
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "h1",
          {
            className: "text-3xl md:text-5xl lg:text-6xl font-bold uppercase leading-tight mb-3 text-foreground drop-shadow-lg",
            style: {
              fontFamily: "Oswald, sans-serif",
              letterSpacing: "0.15em",
              WebkitTextStroke: "0.5px rgba(226,177,89,0.6)"
            },
            children: show.name
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: "flex items-center gap-1 text-primary text-sm",
              style: { fontFamily: "Rubik Dirt, cursive" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { size: 12, fill: "currentColor" }),
                show.vote_average.toFixed(1),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground text-[10px] font-mono ml-0.5", children: [
                  "(",
                  show.vote_count.toLocaleString(),
                  ")"
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "px-2 py-0.5 rounded text-xs border bg-primary/15 text-primary border-primary/30",
              style: {
                fontFamily: "Share Tech Mono, monospace",
                letterSpacing: "0.05em"
              },
              children: "SERIES"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center flex-wrap gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              href: STREAM_URL,
              target: "_blank",
              rel: "noopener noreferrer",
              "data-ocid": "watch-now-btn",
              className: "flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-sm transition-smooth focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2",
              style: {
                background: "oklch(var(--primary))",
                color: "#050505",
                boxShadow: "0 0 24px rgba(226,177,89,0.5)"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { size: 16, fill: "currentColor" }),
                "WATCH NOW"
              ]
            }
          ),
          trailer && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => openTrailer(trailer.key),
              "data-ocid": "play-trailer-btn",
              className: "flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold border border-primary/50 text-primary hover:bg-primary/10 transition-smooth focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { size: 16 }),
                "PLAY TRAILER"
              ]
            }
          )
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 md:px-8 py-6 md:py-8", "data-ocid": "tv-info-section", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-5 md:gap-8 max-w-5xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          className: "hidden sm:block flex-shrink-0 w-28 md:w-44 rounded-xl overflow-hidden self-start",
          style: {
            boxShadow: "0 0 30px rgba(0,0,0,0.7), 0 0 15px rgba(226,177,89,0.1)"
          },
          initial: { opacity: 0, x: -20 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.4 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: getImageUrl(show.poster_path, "w342"),
              alt: show.name,
              className: "w-full aspect-[2/3] object-cover"
            }
          )
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          className: "flex-1 min-w-0",
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.4, delay: 0.1 },
          children: [
            seasonsCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-primary/25 bg-primary/8 text-primary text-xs mb-3",
                style: { fontFamily: "Share Tech Mono, monospace" },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TvMinimal, { size: 13 }),
                  seasonsCount,
                  " Season",
                  seasonsCount > 1 ? "s" : "",
                  episodesCount > 0 && ` · ${episodesCount} Episodes`
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 md:gap-3 mb-3", children: [
              show.first_air_date && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "tech-metadata flex items-center gap-1 text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 12 }),
                "First aired:",
                " ",
                new Date(show.first_air_date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric"
                })
              ] }),
              show.status && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "text-[10px] px-2 py-0.5 rounded-full border font-mono",
                  style: {
                    borderColor: show.status === "Ended" ? "rgba(148,163,184,0.4)" : show.status === "Returning Series" ? "rgba(34,197,94,0.4)" : "rgba(226,177,89,0.3)",
                    color: show.status === "Ended" ? "rgba(148,163,184,0.8)" : show.status === "Returning Series" ? "rgb(134,239,172)" : "oklch(var(--primary))",
                    background: show.status === "Ended" ? "rgba(148,163,184,0.08)" : show.status === "Returning Series" ? "rgba(34,197,94,0.08)" : "rgba(226,177,89,0.08)"
                  },
                  children: show.status
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5 mb-4", children: (_f = show.genres) == null ? void 0 : _f.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "text-xs px-2.5 py-1 rounded-full bg-muted/40 text-muted-foreground border border-border",
                style: { fontFamily: "Share Tech Mono, monospace" },
                children: g.name
              },
              g.id
            )) }),
            show.tagline && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "p",
              {
                className: "text-sm italic text-primary/70 mb-3",
                style: { fontFamily: "Pacifico, cursive" },
                children: [
                  '"',
                  show.tagline,
                  '"'
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl mb-5", children: show.overview }),
            seasonsCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  htmlFor: "season-select",
                  className: "block text-xs text-muted-foreground mb-1.5",
                  style: { fontFamily: "Share Tech Mono, monospace" },
                  children: "SELECT SEASON"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative inline-block", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "select",
                  {
                    id: "season-select",
                    value: selectedSeason,
                    onChange: (e) => setSelectedSeason(Number(e.target.value)),
                    "data-ocid": "season-select",
                    className: "appearance-none pr-8 pl-3 py-2 rounded-lg border border-primary/30 bg-card text-foreground text-sm cursor-pointer hover:border-primary/60 transition-smooth focus:outline-none focus-visible:outline-2 focus-visible:outline-primary/70",
                    style: {
                      fontFamily: "Share Tech Mono, monospace",
                      minWidth: "160px"
                    },
                    children: seasonOptions.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: s, children: [
                      "Season ",
                      s
                    ] }, s))
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ChevronDown,
                  {
                    size: 14,
                    className: "absolute right-2.5 top-1/2 -translate-y-1/2 text-primary/60 pointer-events-none"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1.5 font-mono", children: [
                "Season ",
                selectedSeason,
                " selected"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center flex-wrap gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "a",
                {
                  href: STREAM_URL,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  "data-ocid": "watch-now-btn-info",
                  className: "flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-sm transition-smooth focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2",
                  style: {
                    background: "oklch(var(--primary))",
                    color: "#050505",
                    boxShadow: "0 0 20px rgba(226,177,89,0.4)"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { size: 16, fill: "currentColor" }),
                    "WATCH NOW"
                  ]
                }
              ),
              trailer && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => openTrailer(trailer.key),
                  "data-ocid": "play-trailer-btn-info",
                  className: "flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold border border-primary/40 text-primary hover:bg-primary/10 transition-smooth focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { size: 16 }),
                    "Trailer"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: toggleWatchlist,
                  "data-ocid": "watchlist-btn",
                  className: "flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold border border-border text-muted-foreground hover:border-primary/50 hover:text-primary transition-smooth focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2",
                  children: [
                    inWatchlist ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 16 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 16 }),
                    inWatchlist ? "Saved" : "Watchlist"
                  ]
                }
              )
            ] })
          ]
        }
      )
    ] }) }),
    (((_h = (_g = show.credits) == null ? void 0 : _g.cast) == null ? void 0 : _h.length) ?? 0) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "px-4 md:px-8 pb-8", "data-ocid": "cast-section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "groovy-header text-xl md:text-2xl text-primary mb-4", children: "Cast" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          className: "flex gap-4 overflow-x-auto pb-3 scrollbar-hide",
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.4, delay: 0.2 },
          children: show.credits.cast.slice(0, 15).map((member, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              className: "flex-shrink-0 w-[72px] text-center group",
              "data-ocid": `cast-member-${member.id}`,
              initial: { opacity: 0, scale: 0.85 },
              animate: { opacity: 1, scale: 1 },
              transition: { delay: 0.2 + i * 0.05 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-16 h-16 rounded-full overflow-hidden mx-auto mb-2 border-2 border-border group-hover:border-primary/60 transition-smooth",
                    onMouseEnter: (e) => {
                      e.currentTarget.style.boxShadow = "0 0 12px rgba(226,177,89,0.35)";
                    },
                    onMouseLeave: (e) => {
                      e.currentTarget.style.boxShadow = "none";
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: getImageUrl(member.profile_path, "w185"),
                        alt: member.name,
                        className: "w-full h-full object-cover",
                        loading: "lazy",
                        onError: (e) => {
                          e.currentTarget.src = "/assets/images/placeholder.svg";
                        }
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-semibold text-foreground/90 truncate leading-tight", children: member.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-[9px] text-muted-foreground truncate leading-tight mt-0.5",
                    style: { fontFamily: "Share Tech Mono, monospace" },
                    children: member.character
                  }
                )
              ]
            },
            member.id
          ))
        }
      )
    ] }),
    recommendations.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "px-4 md:px-8 pb-10 bg-muted/10 pt-6",
        "data-ocid": "recommendations-section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "groovy-header text-xl md:text-2xl text-primary mb-4", children: "More Like This" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3", children: recommendations.slice(0, 10).map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 16 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.1 + i * 0.05 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(MovieCard, { item, type: "tv" })
            },
            item.id
          )) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "lg:hidden px-4 py-6 text-center border-t border-border bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "p",
      {
        className: "text-xs",
        style: { color: "#E2B159", fontFamily: "Special Elite, cursive" },
        children: "© 2026 KLYXO | Designed & Developed by Alvee Noor Siyam"
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TrailerModal, {})
  ] });
}
export {
  TVDetailPage as default
};
