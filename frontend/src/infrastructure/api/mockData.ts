import type { Game } from "../../domain/entities";

export const gamesMock: Game[] = [
  {
    id: "1",
    title: "Eclipse of Titans",
    imageUrl: "https://www.freetogame.com/g/540/thumbnail.jpg",
    genre: "RPG",
    platform: "PC",
    popularity: 94,
    shortDescription:
      "Un RPG tactico con decisiones que alteran todo el reino.",
    longDescription:
      "Eclipse of Titans mezcla combate por turnos con exploracion abierta. Cada alianza afecta misiones, economia y finales posibles.",
    reviews: [
      {
        id: "r1",
        gameId: "1",
        author: "LunaGamer",
        rating: 5,
        text: "El sistema de clases y ramas de historia es excelente.",
        createdAt: "2026-05-10",
      },
    ],
  },
  {
    id: "2",
    title: "Neon Drift X",
    imageUrl: "https://www.freetogame.com/g/516/thumbnail.jpg",
    genre: "Action",
    platform: "PlayStation",
    popularity: 81,
    shortDescription: "Carreras arcade con fisicas agresivas y mapas urbanos.",
    longDescription:
      "Neon Drift X apuesta por velocidad pura y personalizacion profunda de vehiculos. Ideal para partidas cortas y competitivas.",
    reviews: [
      {
        id: "r2",
        gameId: "2",
        author: "TurboMax",
        rating: 4,
        text: "Muy divertido, aunque algunos circuitos son repetitivos.",
        createdAt: "2026-05-11",
      },
    ],
  },
  {
    id: "3",
    title: "Frontline Delta",
    imageUrl: "https://www.freetogame.com/g/452/thumbnail.jpg",
    genre: "Shooter",
    platform: "Xbox",
    popularity: 72,
    shortDescription: "Shooter cooperativo con objetivos dinamicos.",
    longDescription:
      "Frontline Delta destaca por su IA adaptativa y misiones en escuadra. Tiene progresion de armas y modos de evento semanal.",
    reviews: [
      {
        id: "r3",
        gameId: "3",
        author: "RexOps",
        rating: 4,
        text: "Buen gunplay y partidas intensas en cooperativo.",
        createdAt: "2026-05-12",
      },
    ],
  },
  {
    id: "4",
    title: "Kingdoms of Verdant",
    imageUrl: "https://www.freetogame.com/g/521/thumbnail.jpg",
    genre: "Adventure",
    platform: "Nintendo",
    popularity: 66,
    shortDescription: "Aventura narrativa con exploracion de biomas magicos.",
    longDescription:
      "Kingdoms of Verdant combina puzzles ambientales con una historia coral de facciones y secretos antiguos.",
    reviews: [],
  },
];
