import { c as createLucideIcon, j as jsxRuntimeExports, m as motion, b as FaWhatsapp, d as FaFacebook, e as FaLinkedin, f as FaGlobe, a as useNavigate, u as useKlyxoStore, X } from "./index-C8yyXDgB.js";
import { b as getImageUrl, a as getBackdropUrl } from "./tmdb-widsgkgP.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M7 3v18", key: "bbkbws" }],
  ["path", { d: "M3 7.5h4", key: "zfgn84" }],
  ["path", { d: "M3 12h18", key: "1i2n21" }],
  ["path", { d: "M3 16.5h4", key: "1230mu" }],
  ["path", { d: "M17 3v18", key: "in4fa5" }],
  ["path", { d: "M17 7.5h4", key: "myr1c1" }],
  ["path", { d: "M17 16.5h4", key: "go4c1d" }]
];
const Film = createLucideIcon("film", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",
      key: "1qme2f"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
];
const Settings = createLucideIcon("settings", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
  ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
  ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
  ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }]
];
const Trash2 = createLucideIcon("trash-2", __iconNode);
const PHOTO_URL = "https://onlymesiyam.netlify.app/assets/ceo.jpg";
const JOB_LINK = "https://raysotech.studyingtech.com/#";
const SOCIAL_LINKS = [
  {
    icon: FaWhatsapp,
    href: "https://wa.me/8801576447623",
    label: "WhatsApp"
  },
  {
    icon: FaFacebook,
    href: "https://www.facebook.com/profile.php?id=61580925924901",
    label: "Facebook"
  },
  {
    icon: FaLinkedin,
    href: "https://bd.linkedin.com/in/alvee-noor-siyam-0a1a84354",
    label: "LinkedIn"
  },
  {
    icon: FaGlobe,
    href: "https://onlymesiyam.netlify.app",
    label: "Portfolio"
  }
];
const SETTINGS = [
  { label: "Quality", value: "WEB-DL" },
  { label: "Theme", value: "Cinematic Dark" },
  { label: "Language", value: "English" }
];
function SectionHeader({
  title,
  action
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "h2",
      {
        className: "groovy-header text-xl",
        style: { color: "oklch(var(--primary))" },
        children: title
      }
    ),
    action
  ] });
}
function FounderHeroSection() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 24 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5 },
      className: "flex flex-col items-center gap-4 py-10 px-6 rounded-2xl mb-6 relative overflow-hidden",
      style: {
        background: "linear-gradient(180deg, #0d0a04 0%, #050505 60%, #050505 100%)",
        boxShadow: "0 0 60px rgba(226,177,89,0.06) inset"
      },
      "data-ocid": "profile-founder-hero",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 rounded-full pointer-events-none",
            style: {
              background: "radial-gradient(ellipse at center, rgba(226,177,89,0.12) 0%, transparent 70%)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "rounded-full p-0.5",
            style: {
              background: "linear-gradient(135deg, #E2B159 0%, rgba(226,177,89,0.3) 50%, #E2B159 100%)"
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: PHOTO_URL,
                alt: "Alvee Noor Siyam",
                className: "w-[100px] h-[100px] md:w-[130px] md:h-[130px] rounded-full object-cover object-top",
                style: {
                  border: "2px solid #050505",
                  boxShadow: "0 0 20px rgba(226,177,89,0.5), 0 0 40px rgba(226,177,89,0.2)"
                },
                onError: (e) => {
                  e.target.src = "/assets/images/placeholder.svg";
                }
              }
            )
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center z-10 space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-2xl font-bold tracking-wide",
              style: {
                fontFamily: "var(--font-display)",
                color: "oklch(var(--primary))",
                textShadow: "0 0 20px rgba(226,177,89,0.4)"
              },
              "data-ocid": "founder-name",
              children: "Alvee Noor Siyam"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: JOB_LINK,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "block text-sm text-muted-foreground hover:text-primary transition-colors hover:underline underline-offset-4 decoration-primary/60",
              "data-ocid": "founder-job-link",
              children: "Frontend Engineer"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-5 z-10", "data-ocid": "founder-socials", children: SOCIAL_LINKS.map(({ icon: Icon, href, label }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href,
            target: "_blank",
            rel: "noopener noreferrer",
            "aria-label": label,
            "data-ocid": `social-${label.toLowerCase()}`,
            className: "text-2xl transition-smooth focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 rounded",
            style: { color: "rgba(226,177,89,0.7)" },
            onMouseEnter: (e) => {
              e.currentTarget.style.color = "oklch(var(--primary))";
              e.currentTarget.style.transform = "scale(1.1)";
            },
            onMouseLeave: (e) => {
              e.currentTarget.style.color = "rgba(226,177,89,0.7)";
              e.currentTarget.style.transform = "scale(1)";
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, {})
          },
          label
        )) })
      ]
    }
  );
}
function AboutSection() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.section,
    {
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4, delay: 0.1 },
      className: "mb-8",
      "data-ocid": "about-klyxo-section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { title: "About KLYXO" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "rounded-xl p-5 border",
            style: {
              background: "#0a0a0a",
              borderColor: "rgba(226,177,89,0.2)",
              boxShadow: "0 0 20px rgba(226,177,89,0.04) inset"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: "KLYXO is a cinematic movie portal. Explore trending movies, TV shows, and more. All streams powered by Pollyflix." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 flex flex-wrap gap-2", children: ["HD Streaming", "Trending Daily", "Multi-Genre", "Free Access"].map(
                (tag) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "tech-metadata px-2.5 py-1 rounded-md border text-xs",
                    style: {
                      borderColor: "rgba(226,177,89,0.2)",
                      background: "rgba(226,177,89,0.05)",
                      color: "oklch(var(--primary))"
                    },
                    children: tag
                  },
                  tag
                )
              ) })
            ]
          }
        )
      ]
    }
  );
}
function WatchlistSection() {
  const navigate = useNavigate();
  const { watchlist, removeFromWatchlist } = useKlyxoStore();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.section,
    {
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4, delay: 0.15 },
      className: "mb-8",
      "data-ocid": "watchlist-section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SectionHeader,
          {
            title: "My Watchlist",
            action: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "tech-metadata text-xs text-muted-foreground", children: [
              watchlist.length,
              " titles"
            ] })
          }
        ),
        watchlist.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col items-center justify-center py-14 rounded-xl border border-dashed gap-3 text-center",
            style: { borderColor: "rgba(226,177,89,0.15)" },
            "data-ocid": "watchlist-empty",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Film,
                {
                  size: 36,
                  className: "text-muted-foreground/40",
                  strokeWidth: 1.2
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm max-w-xs", children: "Your watchlist is empty. Add movies to watch later." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => navigate({ to: "/" }),
                  className: "text-primary text-xs hover:underline underline-offset-4 transition-colors",
                  "data-ocid": "watchlist-browse-cta",
                  children: "Browse movies →"
                }
              )
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 snap-x snap-mandatory",
            style: { scrollbarWidth: "none" },
            children: watchlist.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "relative flex-shrink-0 w-[110px] snap-start group",
                "data-ocid": `watchlist-item-${item.id}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.div,
                    {
                      whileHover: { scale: 1.04 },
                      transition: { duration: 0.2 },
                      className: "rounded-lg overflow-hidden cursor-pointer",
                      style: { boxShadow: "0 0 0 1px rgba(226,177,89,0.1)" },
                      onClick: () => navigate({
                        to: `/${item.type}/$id`,
                        params: { id: String(item.id) }
                      }),
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "img",
                        {
                          src: getImageUrl(item.posterPath, "w342"),
                          alt: item.title,
                          className: "w-full aspect-[2/3] object-cover",
                          loading: "lazy"
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mt-1.5 leading-tight line-clamp-2", children: item.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => removeFromWatchlist(item.id, item.type),
                      "aria-label": `Remove ${item.title} from watchlist`,
                      "data-ocid": `remove-watchlist-${item.id}`,
                      className: "absolute top-1.5 right-1.5 w-6 h-6 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-smooth",
                      style: {
                        background: "rgba(5,5,5,0.85)",
                        color: "oklch(var(--destructive))",
                        border: "1px solid rgba(226,0,0,0.3)"
                      },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 10 })
                    }
                  )
                ]
              },
              `${item.type}-${item.id}`
            ))
          }
        )
      ]
    }
  );
}
function RecentlyWatchedSection() {
  const navigate = useNavigate();
  const { recentlyWatched, removeFromRecentlyWatched } = useKlyxoStore();
  const handleClearAll = () => {
    for (const item of recentlyWatched) {
      removeFromRecentlyWatched(item.id, item.type);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.section,
    {
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4, delay: 0.2 },
      className: "mb-8",
      "data-ocid": "recently-watched-section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SectionHeader,
          {
            title: "Recently Watched",
            action: recentlyWatched.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: handleClearAll,
                className: "text-xs text-muted-foreground hover:text-primary transition-colors",
                "data-ocid": "clear-history-btn",
                children: "Clear history"
              }
            ) : void 0
          }
        ),
        recentlyWatched.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col items-center justify-center py-14 rounded-xl border border-dashed gap-3 text-center",
            style: { borderColor: "rgba(226,177,89,0.15)" },
            "data-ocid": "recently-watched-empty",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Film,
                {
                  size: 36,
                  className: "text-muted-foreground/40",
                  strokeWidth: 1.2
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Nothing in progress yet." })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 snap-x snap-mandatory",
            style: { scrollbarWidth: "none" },
            children: recentlyWatched.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex-shrink-0 w-[160px] snap-start group relative",
                "data-ocid": `recent-item-${item.id}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    motion.div,
                    {
                      whileHover: { scale: 1.03 },
                      transition: { duration: 0.2 },
                      className: "rounded-lg overflow-hidden cursor-pointer relative",
                      style: { boxShadow: "0 0 0 1px rgba(226,177,89,0.1)" },
                      onClick: () => navigate({
                        to: `/${item.type}/$id`,
                        params: { id: String(item.id) }
                      }),
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "img",
                          {
                            src: item.backdropPath ? getBackdropUrl(item.backdropPath, "w780") : getImageUrl(item.posterPath, "w342"),
                            alt: item.title,
                            className: "w-full aspect-video object-cover",
                            loading: "lazy"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-0 right-0 h-0.5 bg-muted/40", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "h-full",
                            style: {
                              width: `${item.progress}%`,
                              background: "oklch(var(--primary))",
                              boxShadow: "0 0 4px rgba(226,177,89,0.6)"
                            }
                          }
                        ) })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1.5 pr-5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-medium text-foreground truncate leading-tight", children: item.title }),
                    item.episodeInfo && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "tech-metadata text-[10px] mt-0.5 truncate", children: item.episodeInfo }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "tech-metadata text-[10px] mt-0.5", children: [
                      item.progress,
                      "% watched"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => removeFromRecentlyWatched(item.id, item.type),
                      "aria-label": `Remove ${item.title}`,
                      "data-ocid": `remove-recent-${item.id}`,
                      className: "absolute top-1.5 right-1.5 w-6 h-6 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-smooth",
                      style: {
                        background: "rgba(5,5,5,0.85)",
                        color: "oklch(var(--destructive))",
                        border: "1px solid rgba(226,0,0,0.3)"
                      },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 10 })
                    }
                  )
                ]
              },
              `${item.type}-${item.id}`
            ))
          }
        )
      ]
    }
  );
}
function AppSettingsSection() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.section,
    {
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4, delay: 0.25 },
      className: "mb-10",
      "data-ocid": "app-settings-section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { title: "App Settings" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "rounded-xl border overflow-hidden",
            style: {
              background: "#0a0a0a",
              borderColor: "rgba(226,177,89,0.12)"
            },
            children: SETTINGS.map(({ label, value }, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center justify-between px-4 py-3.5",
                style: idx > 0 ? { borderTop: "1px solid rgba(226,177,89,0.08)" } : void 0,
                "data-ocid": `setting-${label.toLowerCase()}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { size: 14, className: "text-muted-foreground/50" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground", children: label })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "tech-metadata text-xs px-2.5 py-1 rounded-md",
                      style: {
                        color: "oklch(var(--primary))",
                        background: "rgba(226,177,89,0.08)",
                        border: "1px solid rgba(226,177,89,0.15)"
                      },
                      children: value
                    }
                  )
                ]
              },
              label
            ))
          }
        )
      ]
    }
  );
}
function ProfilePage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-background min-h-screen px-4 md:px-6 pt-4 pb-8 max-w-2xl mx-auto",
      "data-ocid": "profile-page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FounderHeroSection, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AboutSection, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(WatchlistSection, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(RecentlyWatchedSection, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AppSettingsSection, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "footer",
          {
            className: "pt-6 text-center border-t",
            style: { borderColor: "rgba(226,177,89,0.1)" },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-xs",
                style: { color: "#E2B159", fontFamily: "Special Elite, cursive" },
                children: "© 2026 KLYXO | Designed & Developed by Alvee Noor Siyam"
              }
            )
          }
        )
      ]
    }
  );
}
export {
  ProfilePage as default
};
