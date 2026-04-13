import { Link, useRouterState } from "@tanstack/react-router";
import { FaFilm, FaHome, FaSearch, FaTv, FaUser } from "react-icons/fa";
import { FounderCard } from "../shared/FounderCard";

const NAV_ITEMS = [
  { icon: FaHome, label: "Home", to: "/" },
  { icon: FaFilm, label: "Movies", to: "/movies" },
  { icon: FaTv, label: "TV Shows", to: "/tv-shows" },
  { icon: FaSearch, label: "Search", to: "/search" },
  { icon: FaUser, label: "Profile", to: "/profile" },
];

const GENRE_ITEMS = [
  { label: "Home", to: "/" },
  { label: "Bangla", to: "/genre/bangla" },
  { label: "Hindi", to: "/genre/hindi" },
  { label: "18+ Adult", to: "/genre/adult" },
  { label: "Dual Audio", to: "/genre/dual" },
  { label: "English", to: "/genre/english" },
];

export function Sidebar() {
  const router = useRouterState();
  const pathname = router.location.pathname;

  const isActive = (to: string) => {
    if (to === "/") return pathname === "/";
    return pathname.startsWith(to);
  };

  return (
    <aside
      className="hidden lg:flex flex-col fixed left-0 top-0 bottom-0 w-[280px] xl:w-80 bg-card border-r border-border z-40 overflow-y-auto"
      data-ocid="sidebar"
    >
      {/* Logo */}
      <div className="px-6 py-5 border-b border-border">
        <span
          className="text-3xl font-bold tracking-widest select-none"
          style={{
            fontFamily: "var(--font-display)",
            color: "oklch(var(--primary))",
            textShadow: "0 0 24px rgba(226,177,89,0.5)",
          }}
        >
          KLYXO
        </span>
      </div>

      {/* Founder Profile */}
      <div className="border-b border-border">
        <FounderCard variant="full" />
      </div>

      {/* Navigation */}
      <nav className="px-3 py-4 flex-1" aria-label="Main navigation">
        <p className="px-3 mb-2 text-xs uppercase tracking-widest text-muted-foreground font-mono">
          Navigation
        </p>
        <ul className="space-y-0.5">
          {NAV_ITEMS.map(({ icon: Icon, label, to }) => (
            <li key={to}>
              <Link
                to={to}
                data-ocid={`nav-${label.toLowerCase().replace(" ", "-")}`}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-smooth focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 group ${
                  isActive(to)
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                <Icon
                  size={16}
                  className={`transition-smooth ${
                    isActive(to)
                      ? "text-primary drop-shadow-[0_0_6px_rgba(226,177,89,0.5)]"
                      : "group-hover:text-primary"
                  }`}
                />
                {label}
                {isActive(to) && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(226,177,89,0.8)]" />
                )}
              </Link>
            </li>
          ))}
        </ul>

        {/* Genre Categories */}
        <p className="px-3 mt-6 mb-2 text-xs uppercase tracking-widest text-muted-foreground font-mono">
          Categories
        </p>
        <ul className="space-y-0.5">
          {GENRE_ITEMS.map(({ label, to }) => (
            <li key={`${to}-${label}`}>
              <Link
                to={to}
                data-ocid={`genre-${label.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                className={`flex items-center px-3 py-2 rounded-lg text-sm transition-smooth focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 ${
                  isActive(to) && to !== "/"
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-border">
        <p
          className="text-xs"
          style={{ color: "#E2B159", fontFamily: "Special Elite, cursive" }}
        >
          © 2026 KLYXO | Designed &amp; Developed by Alvee Noor Siyam
        </p>
      </div>
    </aside>
  );
}
