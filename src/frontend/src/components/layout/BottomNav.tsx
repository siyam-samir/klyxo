import { Link, useRouterState } from "@tanstack/react-router";
import { FaFilm, FaHome, FaSearch, FaTv, FaUser } from "react-icons/fa";

const TABS = [
  { icon: FaHome, label: "Home", to: "/" },
  { icon: FaFilm, label: "Movies", to: "/movies" },
  { icon: FaTv, label: "TV", to: "/tv-shows" },
  { icon: FaSearch, label: "Search", to: "/search" },
  { icon: FaUser, label: "Profile", to: "/profile" },
];

export function BottomNav() {
  const router = useRouterState();
  const pathname = router.location.pathname;

  const isActive = (to: string) => {
    if (to === "/") return pathname === "/";
    return pathname.startsWith(to);
  };

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-50 h-[60px] flex items-center bg-[#050505]/95 backdrop-blur-md border-t border-border"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      aria-label="Bottom navigation"
      data-ocid="bottom-nav"
    >
      {TABS.map(({ icon: Icon, label, to }) => {
        const active = isActive(to);
        return (
          <Link
            key={to}
            to={to}
            aria-label={label}
            data-ocid={`bottom-nav-${label.toLowerCase()}`}
            className={`flex-1 flex flex-col items-center justify-center gap-0.5 h-full transition-smooth focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-[-4px] rounded-sm ${
              active
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <span
              className={`transition-smooth ${
                active
                  ? "drop-shadow-[0_0_8px_rgba(226,177,89,0.6)] scale-110"
                  : "scale-100"
              }`}
            >
              <Icon size={18} />
            </span>
            <span
              className={`text-[10px] font-medium font-mono transition-smooth ${
                active ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {label}
            </span>
            {active && (
              <span className="absolute bottom-0 w-8 h-0.5 rounded-full bg-primary shadow-[0_0_8px_rgba(226,177,89,0.8)]" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
