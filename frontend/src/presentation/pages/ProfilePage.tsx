import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { getCurrentUser, logout } from "../../application/use-cases/auth";

export function ProfilePage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: user } = useQuery({
    queryKey: ["me"],
    queryFn: () => getCurrentUser(),
  });

  const logoutMutation = useMutation({
    mutationFn: () => logout(),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["me"] });
      await navigate({ to: "/" });
    },
  });

  if (!user) {
    return <p>No hay sesion activa.</p>;
  }

  return (
    <section>
      <h2>Perfil</h2>
      <p>Usuario: {user.name}</p>
      <p>Email: {user.email}</p>
      <button className="btn-primary" onClick={() => logoutMutation.mutate()}>
        Cerrar sesion
      </button>
    </section>
  );
}
