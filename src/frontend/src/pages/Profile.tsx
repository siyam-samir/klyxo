import { useNavigate } from "@tanstack/react-router";
import { Film, Settings, Trash2, X } from "lucide-react";
import { motion } from "motion/react";
import { FaFacebook, FaGlobe, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { getBackdropUrl, getImageUrl } from "../lib/tmdb";
import { useKlyxoStore } from "../store";

// ── Constants ─────────────────────────────────────────────────────────────────

const PHOTO_URL = "https://onlymesiyam.netlify.app/assets/ceo.jpg";
const JOB_LINK = "https://raysotech.studyingtech.com/#";

const SOCIAL_LINKS = [
  {
    icon: FaWhatsapp,
    href: "https://wa.me/8801576447623",
    label: "WhatsApp",
  },
  {
    icon: FaFacebook,
    href: "https://www.facebook.com/profile.php?id=61580925924901",
    label: "Facebook",
  },
  {
    icon: FaLinkedin,
    href: "https://bd.linkedin.com/in/alvee-noor-siyam-0a1a84354",
    label: "LinkedIn",
  },
  {
    icon: FaGlobe,
    href: "https://onlymesiyam.netlify.app",
    label: "Portfolio",
  },
];

const SETTINGS = [
  { label: "Quality", value: "WEB-DL" },
  { label: "Theme", value: "Cinematic Dark" },
  { label: "Language", value: "English" },
];

// ── Section Header ────────────────────────────────────────────────────────────

function SectionHeader({
  title,
  action,
}: {
  title: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2
        className="groovy-header text-xl"
        style={{ color: "oklch(var(--primary))" }}
      >
        {title}
      </h2>
      {action}
    </div>
  );
}

// ── Founder Hero Section ──────────────────────────────────────────────────────

function FounderHeroSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center gap-4 py-10 px-6 rounded-2xl mb-6 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #0d0a04 0%, #050505 60%, #050505 100%)",
        boxShadow: "0 0 60px rgba(226,177,89,0.06) inset",
      }}
      data-ocid="profile-founder-hero"
    >
      {/* Ambient glow behind photo */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(226,177,89,0.12) 0%, transparent 70%)",
        }}
      />

      {/* Photo */}
      <div className="relative z-10">
        <div
          className="rounded-full p-0.5"
          style={{
            background:
              "linear-gradient(135deg, #E2B159 0%, rgba(226,177,89,0.3) 50%, #E2B159 100%)",
          }}
        >
          <img
            src={PHOTO_URL}
            alt="Alvee Noor Siyam"
            className="w-[100px] h-[100px] md:w-[130px] md:h-[130px] rounded-full object-cover object-top"
            style={{
              border: "2px solid #050505",
              boxShadow:
                "0 0 20px rgba(226,177,89,0.5), 0 0 40px rgba(226,177,89,0.2)",
            }}
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "/assets/images/placeholder.svg";
            }}
          />
        </div>
      </div>

      {/* Name & Title */}
      <div className="text-center z-10 space-y-1">
        <p
          className="text-2xl font-bold tracking-wide"
          style={{
            fontFamily: "var(--font-display)",
            color: "oklch(var(--primary))",
            textShadow: "0 0 20px rgba(226,177,89,0.4)",
          }}
          data-ocid="founder-name"
        >
          Alvee Noor Siyam
        </p>
        <a
          href={JOB_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-sm text-muted-foreground hover:text-primary transition-colors hover:underline underline-offset-4 decoration-primary/60"
          data-ocid="founder-job-link"
        >
          Frontend Engineer
        </a>
      </div>

      {/* Social Icons */}
      <div className="flex items-center gap-5 z-10" data-ocid="founder-socials">
        {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            data-ocid={`social-${label.toLowerCase()}`}
            className="text-2xl transition-smooth focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 rounded"
            style={{ color: "rgba(226,177,89,0.7)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color =
                "oklch(var(--primary))";
              (e.currentTarget as HTMLElement).style.transform = "scale(1.1)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color =
                "rgba(226,177,89,0.7)";
              (e.currentTarget as HTMLElement).style.transform = "scale(1)";
            }}
          >
            <Icon />
          </a>
        ))}
      </div>
    </motion.div>
  );
}

// ── About Section ─────────────────────────────────────────────────────────────

function AboutSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="mb-8"
      data-ocid="about-klyxo-section"
    >
      <SectionHeader title="About KLYXO" />
      <div
        className="rounded-xl p-5 border"
        style={{
          background: "#0a0a0a",
          borderColor: "rgba(226,177,89,0.2)",
          boxShadow: "0 0 20px rgba(226,177,89,0.04) inset",
        }}
      >
        <p className="text-sm text-muted-foreground leading-relaxed">
          KLYXO is a cinematic movie portal. Explore trending movies, TV shows,
          and more. All streams powered by Pollyflix.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {["HD Streaming", "Trending Daily", "Multi-Genre", "Free Access"].map(
            (tag) => (
              <span
                key={tag}
                className="tech-metadata px-2.5 py-1 rounded-md border text-xs"
                style={{
                  borderColor: "rgba(226,177,89,0.2)",
                  background: "rgba(226,177,89,0.05)",
                  color: "oklch(var(--primary))",
                }}
              >
                {tag}
              </span>
            ),
          )}
        </div>
      </div>
    </motion.section>
  );
}

// ── Watchlist Section ─────────────────────────────────────────────────────────

function WatchlistSection() {
  const navigate = useNavigate();
  const { watchlist, removeFromWatchlist } = useKlyxoStore();

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
      className="mb-8"
      data-ocid="watchlist-section"
    >
      <SectionHeader
        title="My Watchlist"
        action={
          <span className="tech-metadata text-xs text-muted-foreground">
            {watchlist.length} titles
          </span>
        }
      />

      {watchlist.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-14 rounded-xl border border-dashed gap-3 text-center"
          style={{ borderColor: "rgba(226,177,89,0.15)" }}
          data-ocid="watchlist-empty"
        >
          <Film
            size={36}
            className="text-muted-foreground/40"
            strokeWidth={1.2}
          />
          <p className="text-muted-foreground text-sm max-w-xs">
            Your watchlist is empty. Add movies to watch later.
          </p>
          <button
            type="button"
            onClick={() => navigate({ to: "/" })}
            className="text-primary text-xs hover:underline underline-offset-4 transition-colors"
            data-ocid="watchlist-browse-cta"
          >
            Browse movies →
          </button>
        </div>
      ) : (
        <div
          className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none" }}
        >
          {watchlist.map((item) => (
            <div
              key={`${item.type}-${item.id}`}
              className="relative flex-shrink-0 w-[110px] snap-start group"
              data-ocid={`watchlist-item-${item.id}`}
            >
              <motion.div
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.2 }}
                className="rounded-lg overflow-hidden cursor-pointer"
                style={{ boxShadow: "0 0 0 1px rgba(226,177,89,0.1)" }}
                onClick={() =>
                  navigate({
                    to: `/${item.type}/$id`,
                    params: { id: String(item.id) },
                  })
                }
              >
                <img
                  src={getImageUrl(item.posterPath, "w342")}
                  alt={item.title}
                  className="w-full aspect-[2/3] object-cover"
                  loading="lazy"
                />
              </motion.div>
              <p className="text-[10px] text-muted-foreground mt-1.5 leading-tight line-clamp-2">
                {item.title}
              </p>
              <button
                type="button"
                onClick={() => removeFromWatchlist(item.id, item.type)}
                aria-label={`Remove ${item.title} from watchlist`}
                data-ocid={`remove-watchlist-${item.id}`}
                className="absolute top-1.5 right-1.5 w-6 h-6 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-smooth"
                style={{
                  background: "rgba(5,5,5,0.85)",
                  color: "oklch(var(--destructive))",
                  border: "1px solid rgba(226,0,0,0.3)",
                }}
              >
                <X size={10} />
              </button>
            </div>
          ))}
        </div>
      )}
    </motion.section>
  );
}

// ── Recently Watched Section ──────────────────────────────────────────────────

function RecentlyWatchedSection() {
  const navigate = useNavigate();
  const { recentlyWatched, removeFromRecentlyWatched } = useKlyxoStore();

  const handleClearAll = () => {
    for (const item of recentlyWatched) {
      removeFromRecentlyWatched(item.id, item.type);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="mb-8"
      data-ocid="recently-watched-section"
    >
      <SectionHeader
        title="Recently Watched"
        action={
          recentlyWatched.length > 0 ? (
            <button
              type="button"
              onClick={handleClearAll}
              className="text-xs text-muted-foreground hover:text-primary transition-colors"
              data-ocid="clear-history-btn"
            >
              Clear history
            </button>
          ) : undefined
        }
      />

      {recentlyWatched.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-14 rounded-xl border border-dashed gap-3 text-center"
          style={{ borderColor: "rgba(226,177,89,0.15)" }}
          data-ocid="recently-watched-empty"
        >
          <Film
            size={36}
            className="text-muted-foreground/40"
            strokeWidth={1.2}
          />
          <p className="text-muted-foreground text-sm">
            Nothing in progress yet.
          </p>
        </div>
      ) : (
        <div
          className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none" }}
        >
          {recentlyWatched.map((item) => (
            <div
              key={`${item.type}-${item.id}`}
              className="flex-shrink-0 w-[160px] snap-start group relative"
              data-ocid={`recent-item-${item.id}`}
            >
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2 }}
                className="rounded-lg overflow-hidden cursor-pointer relative"
                style={{ boxShadow: "0 0 0 1px rgba(226,177,89,0.1)" }}
                onClick={() =>
                  navigate({
                    to: `/${item.type}/$id`,
                    params: { id: String(item.id) },
                  })
                }
              >
                <img
                  src={
                    item.backdropPath
                      ? getBackdropUrl(item.backdropPath, "w780")
                      : getImageUrl(item.posterPath, "w342")
                  }
                  alt={item.title}
                  className="w-full aspect-video object-cover"
                  loading="lazy"
                />
                {/* Progress overlay at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-muted/40">
                  <div
                    className="h-full"
                    style={{
                      width: `${item.progress}%`,
                      background: "oklch(var(--primary))",
                      boxShadow: "0 0 4px rgba(226,177,89,0.6)",
                    }}
                  />
                </div>
              </motion.div>

              <div className="mt-1.5 pr-5">
                <p className="text-[11px] font-medium text-foreground truncate leading-tight">
                  {item.title}
                </p>
                {item.episodeInfo && (
                  <p className="tech-metadata text-[10px] mt-0.5 truncate">
                    {item.episodeInfo}
                  </p>
                )}
                <p className="tech-metadata text-[10px] mt-0.5">
                  {item.progress}% watched
                </p>
              </div>

              <button
                type="button"
                onClick={() => removeFromRecentlyWatched(item.id, item.type)}
                aria-label={`Remove ${item.title}`}
                data-ocid={`remove-recent-${item.id}`}
                className="absolute top-1.5 right-1.5 w-6 h-6 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-smooth"
                style={{
                  background: "rgba(5,5,5,0.85)",
                  color: "oklch(var(--destructive))",
                  border: "1px solid rgba(226,0,0,0.3)",
                }}
              >
                <Trash2 size={10} />
              </button>
            </div>
          ))}
        </div>
      )}
    </motion.section>
  );
}

// ── App Settings Section ──────────────────────────────────────────────────────

function AppSettingsSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.25 }}
      className="mb-10"
      data-ocid="app-settings-section"
    >
      <SectionHeader title="App Settings" />
      <div
        className="rounded-xl border overflow-hidden"
        style={{
          background: "#0a0a0a",
          borderColor: "rgba(226,177,89,0.12)",
        }}
      >
        {SETTINGS.map(({ label, value }, idx) => (
          <div
            key={label}
            className="flex items-center justify-between px-4 py-3.5"
            style={
              idx > 0
                ? { borderTop: "1px solid rgba(226,177,89,0.08)" }
                : undefined
            }
            data-ocid={`setting-${label.toLowerCase()}`}
          >
            <div className="flex items-center gap-3">
              <Settings size={14} className="text-muted-foreground/50" />
              <span className="text-sm text-foreground">{label}</span>
            </div>
            <span
              className="tech-metadata text-xs px-2.5 py-1 rounded-md"
              style={{
                color: "oklch(var(--primary))",
                background: "rgba(226,177,89,0.08)",
                border: "1px solid rgba(226,177,89,0.15)",
              }}
            >
              {value}
            </span>
          </div>
        ))}
      </div>
    </motion.section>
  );
}

// ── Profile Page ──────────────────────────────────────────────────────────────

export default function ProfilePage() {
  return (
    <div
      className="bg-background min-h-screen px-4 md:px-6 pt-4 pb-8 max-w-2xl mx-auto"
      data-ocid="profile-page"
    >
      <FounderHeroSection />
      <AboutSection />
      <WatchlistSection />
      <RecentlyWatchedSection />
      <AppSettingsSection />

      {/* Footer */}
      <footer
        className="pt-6 text-center border-t"
        style={{ borderColor: "rgba(226,177,89,0.1)" }}
      >
        <p
          className="text-xs"
          style={{ color: "#E2B159", fontFamily: "Special Elite, cursive" }}
        >
          © 2026 KLYXO | Designed &amp; Developed by Alvee Noor Siyam
        </p>
      </footer>
    </div>
  );
}
