import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { createReview, getGameById } from "../../application/use-cases/games";
import { getCurrentUser } from "../../application/use-cases/auth";

export function GameDetailPage() {
  const { id } = useParams({ from: "/games/$id" });
  const queryClient = useQueryClient();

  const { data: game, isLoading } = useQuery({
    queryKey: ["game", id],
    queryFn: () => getGameById(id),
  });

  const { data: user } = useQuery({
    queryKey: ["me"],
    queryFn: () => getCurrentUser(),
  });

  const addReview = useMutation({
    mutationFn: (payload: { rating: number; text: string }) =>
      createReview(id, user?.name || "Jugador", payload.rating, payload.text),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["game", id] });
      void queryClient.invalidateQueries({ queryKey: ["games"] });
    },
  });

  if (isLoading) return <p>Cargando detalle...</p>;
  if (!game) return <p>Juego no encontrado.</p>;

  return (
    <section>
      <h2>{game.title}</h2>
      {game.imageUrl ? (
        <img
          src={game.imageUrl}
          alt={`Imagen de ${game.title}`}
          className="game-cover"
          loading="lazy"
        />
      ) : null}
      <p>{game.longDescription}</p>
      <h3>Resenas</h3>
      <ul>
        {game.reviews.map((review) => (
          <li key={review.id}>
            {review.author}: {review.rating}/5 - {review.text}
          </li>
        ))}
      </ul>
      {user ? (
        <form
          className="review-form"
          onSubmit={(e) => {
            e.preventDefault();
            const form = new FormData(e.currentTarget);
            const rating = Number(form.get("rating"));
            const text = String(form.get("text") || "");
            addReview.mutate({ rating, text });
            e.currentTarget.reset();
          }}
        >
          <h3>Tu resena</h3>
          <label>
            Valoracion (1 a 5)
            <input type="number" name="rating" min={1} max={5} required />
          </label>
          <label>
            Comentario
            <textarea name="text" required />
          </label>
          <button
            type="submit"
            className="btn-primary"
            disabled={addReview.isPending}
          >
            Publicar
          </button>
        </form>
      ) : (
        <p>Inicia sesion para dejar una resena.</p>
      )}
    </section>
  );
}
