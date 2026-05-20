export type Genre = "RPG" | "Action" | "Adventure" | "Sports" | "Shooter";
export type Platform = "PC" | "PlayStation" | "Xbox" | "Nintendo";

export interface Review {
  id: string;
  gameId: string;
  author: string;
  rating: number;
  text: string;
  createdAt: string;
}

export interface Game {
  id: string;
  title: string;
  imageUrl?: string;
  genre: Genre;
  platform: Platform;
  popularity: number;
  shortDescription: string;
  longDescription: string;
  reviews: Review[];
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface GameFilters {
  search?: string;
  genre?: Genre | "all";
  platform?: Platform | "all";
  popularity?: "all" | "high" | "medium" | "low";
}
