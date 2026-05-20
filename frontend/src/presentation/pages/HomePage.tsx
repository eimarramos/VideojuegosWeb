import { Link } from "@tanstack/react-router";

export function HomePage() {
  return (
    <section>
      <h2>Resenas y valoraciones de videojuegos populares</h2>
      <p>
        Descubre reseñas detalladas, compara puntuaciones y encuentra tu proximo
        juego con filtros por genero, plataforma y popularidad.
      </p>
      <div className="hero-actions">
        <Link
          to="/games"
          search={{
            search: undefined,
            genre: "all",
            platform: "all",
            popularity: "all",
          }}
          className="btn-primary"
        >
          Ver videojuegos
        </Link>
      </div>
    </section>
  );
}
