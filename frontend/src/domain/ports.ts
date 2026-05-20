import type { Game, GameFilters, Review, User } from "./entities";

export interface GamesRepository {
  list(filters: GameFilters): Promise<Game[]>;
  byId(id: string): Promise<Game | null>;
  addReview(
    gameId: string,
    review: Omit<Review, "id" | "createdAt">,
  ): Promise<Review>;
}

export interface AuthRepository {
  login(email: string, password: string): Promise<User>;
  register(name: string, email: string, password: string): Promise<User>;
  logout(): Promise<void>;
  me(): Promise<User | null>;
}
