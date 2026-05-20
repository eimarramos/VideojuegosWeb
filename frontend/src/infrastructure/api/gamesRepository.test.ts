import { describe, expect, it } from "vitest";
import { applyFilters } from "./gamesRepository";
import { gamesMock } from "./mockData";

describe("applyFilters", () => {
  it("filtra por texto en titulo", () => {
    const result = applyFilters(gamesMock, { search: "eclipse" });
    expect(result).toHaveLength(1);
    expect(result[0]?.title).toBe("Eclipse of Titans");
  });

  it("filtra por genero y plataforma", () => {
    const result = applyFilters(gamesMock, {
      genre: "Shooter",
      platform: "Xbox",
      popularity: "all",
      search: undefined,
    });
    expect(result).toHaveLength(1);
    expect(result[0]?.id).toBe("3");
  });

  it("filtra por popularidad alta", () => {
    const result = applyFilters(gamesMock, { popularity: "high" });
    expect(result.every((g) => g.popularity >= 85)).toBe(true);
    expect(result).toHaveLength(1);
  });
});
