import { gamesRepository } from "../../infrastructure/api/gamesRepository";
import type { GameFilters } from "../../domain/entities";

export function listGames(filters: GameFilters) {
  return gamesRepository.list(filters);
}

export function getGameById(id: string) {
  return gamesRepository.byId(id);
}

export function createReview(
  gameId: string,
  author: string,
  rating: number,
  text: string,
) {
  return gamesRepository.addReview(gameId, { gameId, author, rating, text });
}
