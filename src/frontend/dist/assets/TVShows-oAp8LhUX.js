import { j as jsxRuntimeExports, a as useNavigate, m as motion } from "./index-C8yyXDgB.js";
import { c as usePopularTVShows, e as useOnAirTVShows } from "./use-tmdb-BZZdlqsi.js";
import { b as getImageUrl, c as getMediaDate } from "./tmdb-widsgkgP.js";
function TVCard({ show }) {
  var _a;
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      whileHover: { scale: 1.04 },
      transition: { duration: 0.2 },
      className: "relative group cursor-pointer rounded-lg overflow-hidden",
      style: { boxShadow: "0 4px 20px rgba(0,0,0,0.5)" },
      onClick: () => navigate({ to: "/tv/$id", params: { id: String(show.id) } }),
      "data-ocid": `tv-card-${show.id}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: getImageUrl(show.poster_path, "w342"),
            alt: show.name,
            className: "w-full aspect-[2/3] object-cover",
            loading: "lazy"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-smooth flex flex-col justify-end p-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-foreground truncate", children: show.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-mono text-muted-foreground", children: (_a = getMediaDate(show)) == null ? void 0 : _a.slice(0, 4) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-2 left-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "distressed-rating text-primary text-xs drop-shadow-lg", children: [
          "⭐ ",
          show.vote_average.toFixed(1)
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-2 right-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tech-metadata bg-[#050505]/80 text-primary border border-primary/30 px-1.5 py-0.5 rounded text-[10px]", children: "SERIES" }) })
      ]
    }
  );
}
function TVShowsPage() {
  const { data: popular = [], isLoading: l1 } = usePopularTVShows();
  const { data: onAir = [], isLoading: l2 } = useOnAirTVShows();
  const isLoading = l1 || l2;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-background min-h-screen px-4 md:px-6 py-6",
      "data-ocid": "tvshows-page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "h1",
          {
            className: "stencil-title text-3xl font-bold uppercase mb-6 text-foreground",
            style: { textShadow: "0 0 20px rgba(226,177,89,0.2)" },
            children: "TV Shows"
          }
        ),
        isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 md:gap-3", children: Array.from({ length: 18 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "aspect-[2/3] rounded-lg bg-muted/30 animate-pulse"
          },
          i
        )) }),
        !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-8", "data-ocid": "on-air-section", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "groovy-header text-xl text-primary mb-3", children: "On Air Now" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 md:gap-3", children: onAir.slice(0, 12).map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(TVCard, { show: s }, s.id)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "section",
            {
              className: "mb-8 bg-muted/10 rounded-xl p-4 md:p-5",
              "data-ocid": "popular-tv-section",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "groovy-header text-xl text-primary mb-3", children: "Popular" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 md:gap-3", children: popular.slice(0, 18).map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(TVCard, { show: s }, s.id)) })
              ]
            }
          )
        ] })
      ]
    }
  );
}
export {
  TVShowsPage as default
};
