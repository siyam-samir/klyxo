import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { MediaType } from "../lib/tmdb";

export interface RecentlyWatchedItem {
  id: number;
  type: MediaType;
  title: string;
  posterPath: string | null;
  backdropPath: string | null;
  progress: number; // 0-100
  episodeInfo?: string; // e.g. "S3E5 · 53m left"
  timestamp: number;
}

export interface WatchlistItem {
  id: number;
  type: MediaType;
  title: string;
  posterPath: string | null;
}

interface KlyxoStore {
  recentlyWatched: RecentlyWatchedItem[];
  watchlist: WatchlistItem[];
  isTrailerModalOpen: boolean;
  trailerVideoKey: string | null;
  // Actions
  addToRecentlyWatched: (item: Omit<RecentlyWatchedItem, "timestamp">) => void;
  removeFromRecentlyWatched: (id: number, type: MediaType) => void;
  addToWatchlist: (item: WatchlistItem) => void;
  removeFromWatchlist: (id: number, type: MediaType) => void;
  isInWatchlist: (id: number, type: MediaType) => boolean;
  openTrailer: (key: string) => void;
  closeTrailer: () => void;
}

export const useKlyxoStore = create<KlyxoStore>()(
  persist(
    (set, get) => ({
      recentlyWatched: [
        {
          id: 94997,
          type: "tv",
          title: "House of the Dragon",
          posterPath: "/t9XkeE7HzOsdQcDDDapDYh8Rrmt.jpg",
          backdropPath: "/etj8E2o0Bud0HkONVQPjyCkIvpv.jpg",
          progress: 62,
          episodeInfo: "S2E4 · 28m left",
          timestamp: Date.now() - 1800000,
        },
        {
          id: 1011985,
          type: "movie",
          title: "Kung Fu Panda 4",
          posterPath: "/kDp1vUBnMpe8ak4rjgl3cLELqjU.jpg",
          backdropPath: "/1XDDXPXGiI8id7MrUxK36ke7gkX.jpg",
          progress: 38,
          timestamp: Date.now() - 7200000,
        },
        {
          id: 1399,
          type: "tv",
          title: "Game of Thrones",
          posterPath: "/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg",
          backdropPath: "/suopoADq0k8YZr4dQXcU6pToj6s.jpg",
          progress: 85,
          episodeInfo: "S6E9 · 14m left",
          timestamp: Date.now() - 86400000,
        },
      ],
      watchlist: [],
      isTrailerModalOpen: false,
      trailerVideoKey: null,

      addToRecentlyWatched: (item) => {
        set((state) => {
          const filtered = state.recentlyWatched.filter(
            (r) => !(r.id === item.id && r.type === item.type),
          );
          return {
            recentlyWatched: [
              { ...item, timestamp: Date.now() },
              ...filtered,
            ].slice(0, 20),
          };
        });
      },

      removeFromRecentlyWatched: (id, type) => {
        set((state) => ({
          recentlyWatched: state.recentlyWatched.filter(
            (r) => !(r.id === id && r.type === type),
          ),
        }));
      },

      addToWatchlist: (item) => {
        set((state) => {
          const exists = state.watchlist.some(
            (w) => w.id === item.id && w.type === item.type,
          );
          if (exists) return state;
          return { watchlist: [...state.watchlist, item] };
        });
      },

      removeFromWatchlist: (id, type) => {
        set((state) => ({
          watchlist: state.watchlist.filter(
            (w) => !(w.id === id && w.type === type),
          ),
        }));
      },

      isInWatchlist: (id, type) => {
        return get().watchlist.some((w) => w.id === id && w.type === type);
      },

      openTrailer: (key) => {
        set({ isTrailerModalOpen: true, trailerVideoKey: key });
      },

      closeTrailer: () => {
        set({ isTrailerModalOpen: false, trailerVideoKey: null });
      },
    }),
    {
      name: "klyxo-store",
      partialize: (state) => ({
        recentlyWatched: state.recentlyWatched,
        watchlist: state.watchlist,
      }),
    },
  ),
);
