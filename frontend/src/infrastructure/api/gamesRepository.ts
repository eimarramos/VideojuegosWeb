import type { Game, GameFilters, Review } from "../../domain/entities";
import type { GamesRepository } from "../../domain/ports";
import { gamesMock } from "./mockData";

let inMemoryGames: Game[] = [...gamesMock];
const userReviewsByGame = new Map<string, Review[]>();

const API_BASE = "/freetogame";

interface FreeToGameItem {
  id: number;
  title?: string;
  thumbnail?: string;
  genre?: string;
  platform?: string;
  short_description?: string;
  description?: string;
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function mapGenre(value: unknown): Game["genre"] {
  if (typeof value !== "string" || !value.trim()) {
    return "Adventure";
  }
  const normalized = value.toLowerCase();
  if (normalized.includes("rpg")) return "RPG";
  if (normalized.includes("shooter")) return "Shooter";
  if (normalized.includes("sport")) return "Sports";
  if (normalized.includes("action")) return "Action";
  return "Adventure";
}

function mapPlatform(value: unknown): Game["platform"] {
  if (typeof value !== "string" || !value.trim()) {
    return "PC";
  }
  const normalized = value.toLowerCase();
  if (normalized.includes("playstation")) return "PlayStation";
  if (normalized.includes("xbox")) return "Xbox";
  if (normalized.includes("nintendo")) return "Nintendo";
  return "PC";
}

function normalizeRemoteGame(raw: FreeToGameItem): Game {
  return {
    id: String(raw.id),
    title: raw.title ?? "Juego sin titulo",
    imageUrl: raw.thumbnail,
    genre: mapGenre(raw.genre),
    platform: mapPlatform(raw.platform),
    popularity: Number(raw.id ? 100 - (Number(raw.id) % 100) : 70),
    shortDescription:
      raw.short_description?.slice(0, 140) ?? "Sin descripcion breve",
    longDescription:
      raw.description ?? raw.short_description ?? "Sin descripcion detallada",
    reviews: userReviewsByGame.get(String(raw.id)) ?? [],
  };
}

async function fetchGamesFromApi(filters: GameFilters): Promise<Game[]> {
  const url = `${API_BASE}/api/games`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("No se pudo obtener la lista desde FreeToGame");
  }

  const payload = await response.json();
  const gamesRaw = Array.isArray(payload) ? payload : [];
  const mapped = gamesRaw.map((item: FreeToGameItem) =>
    normalizeRemoteGame(item),
  );
  return applyFilters(mapped, filters);
}

async function fetchGameByIdFromApi(id: string): Promise<Game | null> {
  const url = `${API_BASE}/api/game?id=${encodeURIComponent(id)}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("No se pudo obtener el detalle desde FreeToGame");
  }

  const payload = await response.json();
  const gameRaw = payload ?? null;
  if (!gameRaw) {
    return null;
  }

  return normalizeRemoteGame(gameRaw);
}

export function applyFilters(games: Game[], filters: GameFilters) {
  return games.filter((g) => {
    const search = (filters.search || "").toLowerCase().trim();
    const matchesSearch =
      !search ||
      g.title.toLowerCase().includes(search) ||
      g.shortDescription.toLowerCase().includes(search);

    const matchesGenre =
      !filters.genre || filters.genre === "all" || g.genre === filters.genre;
    const matchesPlatform =
      !filters.platform ||
      filters.platform === "all" ||
      g.platform === filters.platform;

    const matchesPopularity =
      !filters.popularity ||
      filters.popularity === "all" ||
      (filters.popularity === "high" && g.popularity >= 85) ||
      (filters.popularity === "medium" &&
        g.popularity >= 70 &&
        g.popularity < 85) ||
      (filters.popularity === "low" && g.popularity < 70);

    return (
      matchesSearch && matchesGenre && matchesPlatform && matchesPopularity
    );
  });
}

export const gamesRepository: GamesRepository = {
  async list(filters) {
    await wait(120);
    return fetchGamesFromApi(filters);
  },
  async byId(id) {
    await wait(120);
    return fetchGameByIdFromApi(id);
  },
  async addReview(gameId, reviewInput) {
    await wait(120);

    const review: Review = {
      ...reviewInput,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };

    const currentReviews = userReviewsByGame.get(gameId) ?? [];
    userReviewsByGame.set(gameId, [review, ...currentReviews]);

    inMemoryGames = inMemoryGames.map((g) =>
      g.id === gameId ? { ...g, reviews: [review, ...g.reviews] } : g,
    );

    return review;
  },
};
