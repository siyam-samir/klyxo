import {
  NotFoundRoute,
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import { Layout } from "./components/layout/Layout";

// ── Lazy Pages ────────────────────────────────────────────────────────────────

const HomePage = lazy(() => import("./pages/Home"));
const MoviesPage = lazy(() => import("./pages/Movies"));
const TVShowsPage = lazy(() => import("./pages/TVShows"));
const SearchPage = lazy(() => import("./pages/Search"));
const ProfilePage = lazy(() => import("./pages/Profile"));
const MovieDetailPage = lazy(() => import("./pages/MovieDetail"));
const TVDetailPage = lazy(() => import("./pages/TVDetail"));

// ── Loading Fallback ──────────────────────────────────────────────────────────

function PageSkeleton() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <span
          className="text-3xl font-bold tracking-widest animate-pulse"
          style={{
            fontFamily: "var(--font-display)",
            color: "oklch(var(--primary))",
            textShadow: "0 0 24px rgba(226,177,89,0.5)",
          }}
        >
          KLYXO
        </span>
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-primary animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Root Layout ───────────────────────────────────────────────────────────────

function RootLayout() {
  return (
    <Layout>
      <Suspense fallback={<PageSkeleton />}>
        <Outlet />
      </Suspense>
    </Layout>
  );
}

// ── Routes ────────────────────────────────────────────────────────────────────

const rootRoute = createRootRoute({ component: RootLayout });

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const moviesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/movies",
  component: MoviesPage,
});

const tvShowsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tv-shows",
  component: TVShowsPage,
});

const searchRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/search",
  component: SearchPage,
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: ProfilePage,
});

const movieDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/movie/$id",
  component: MovieDetailPage,
});

const tvDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tv/$id",
  component: TVDetailPage,
});

// Genre stub routes
const genreRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/genre/$slug",
  component: MoviesPage,
});

const notFoundRoute = new NotFoundRoute({
  getParentRoute: () => rootRoute,
  component: () => (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-4 text-center">
      <span
        className="text-6xl font-bold"
        style={{
          fontFamily: "var(--font-display)",
          color: "oklch(var(--primary))",
        }}
      >
        404
      </span>
      <p className="text-muted-foreground">
        This page doesn't exist in the KLYXO universe.
      </p>
      <a
        href="/"
        className="px-6 py-2 rounded-lg bg-primary text-[#050505] font-semibold hover:bg-primary/80 transition-smooth"
        data-ocid="not-found-home-cta"
      >
        Back to Home
      </a>
    </div>
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  moviesRoute,
  tvShowsRoute,
  searchRoute,
  profileRoute,
  movieDetailRoute,
  tvDetailRoute,
  genreRoute,
]);

const router = createRouter({ routeTree, notFoundRoute });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// ── App ───────────────────────────────────────────────────────────────────────

export default function App() {
  return <RouterProvider router={router} />;
}
