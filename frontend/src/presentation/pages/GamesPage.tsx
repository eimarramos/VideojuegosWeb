import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { listGames } from "../../application/use-cases/games";
import type { GameFilters } from "../../domain/entities";

export function GamesPage() {
  const navigate = useNavigate({ from: "/games" });
  const search = useSearch({ from: "/games" }) as GameFilters;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["games", search],
    queryFn: () => listGames(search),
  });

  const updateFilter = (patch: Partial<GameFilters>) => {
    void navigate({
      to: "/games",
      search: (prev) => ({ ...prev, ...patch }),
    });
  };

  const resetFilters = () => {
    void navigate({
      to: "/games",
      search: {
        search: undefined,
        genre: "all",
        platform: "all",
        popularity: "all",
      },
    });
  };

  if (isLoading) return <p>Cargando videojuegos...</p>;
  if (isError) return <p>No se pudo cargar la lista.</p>;

  return (
    <section>
      <h2>Lista de videojuegos</h2>
      <p>Filtra por genero, plataforma y popularidad desde la URL.</p>
      <div className="filters-bar">
        <label>
          Buscar
          <input
            value={search.search ?? ""}
            onChange={(e) =>
              updateFilter({
                search: e.target.value.trim() ? e.target.value : undefined,
              })
            }
            placeholder="Nombre o descripcion"
          />
        </label>
        <label>
          Genero
          <select
            value={search.genre ?? "all"}
            onChange={(e) =>
              updateFilter({ genre: e.target.value as GameFilters["genre"] })
            }
          >
            <option value="all">Todos</option>
            <option value="RPG">RPG</option>
            <option value="Action">Action</option>
            <option value="Adventure">Adventure</option>
            <option value="Sports">Sports</option>
            <option value="Shooter">Shooter</option>
          </select>
        </label>
        <label>
          Plataforma
          <select
            value={search.platform ?? "all"}
            onChange={(e) =>
              updateFilter({
                platform: e.target.value as GameFilters["platform"],
              })
            }
          >
            <option value="all">Todas</option>
            <option value="PC">PC</option>
            <option value="PlayStation">PlayStation</option>
            <option value="Xbox">Xbox</option>
            <option value="Nintendo">Nintendo</option>
          </select>
        </label>
        <label>
          Popularidad
          <select
            value={search.popularity ?? "all"}
            onChange={(e) =>
              updateFilter({
                popularity: e.target.value as GameFilters["popularity"],
              })
            }
          >
            <option value="all">Todas</option>
            <option value="high">Alta</option>
            <option value="medium">Media</option>
            <option value="low">Baja</option>
          </select>
        </label>
        <button type="button" className="btn-primary" onClick={resetFilters}>
          Limpiar
        </button>
      </div>
      <div className="cards-grid">
        {data?.map((game) => (
          <article className="card" key={game.id}>
            {game.imageUrl ? (
              <img
                src={game.imageUrl}
                alt={`Portada de ${game.title}`}
                className="game-thumb"
                loading="lazy"
              />
            ) : (
              <div className="game-thumb game-thumb-empty">Sin imagen</div>
            )}
            <h3>{game.title}</h3>
            <p>{game.shortDescription}</p>
            <p>
              {game.genre} | {game.platform} | Popularidad: {game.popularity}
            </p>
            <Link to="/games/$id" params={{ id: game.id }} className="link">
              Ver detalle
            </Link>
          </article>
        ))}
      </div>
      {data?.length === 0 ? <p>No hay resultados para estos filtros.</p> : null}
    </section>
  );
}
