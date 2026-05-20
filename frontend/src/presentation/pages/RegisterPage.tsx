import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { register } from "../../application/use-cases/auth";

export function RegisterPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const registerMutation = useMutation({
    mutationFn: (payload: { name: string; email: string; password: string }) =>
      register(payload.name, payload.email, payload.password),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["me"] });
      await navigate({
        to: "/games",
        search: {
          search: undefined,
          genre: "all",
          platform: "all",
          popularity: "all",
        },
      });
    },
  });

  return (
    <section>
      <h2>Registro de usuario</h2>
      <form
        className="review-form"
        onSubmit={(e) => {
          e.preventDefault();
          const form = new FormData(e.currentTarget);
          const name = String(form.get("name") || "");
          const email = String(form.get("email") || "");
          const password = String(form.get("password") || "");
          registerMutation.mutate({ name, email, password });
        }}
      >
        <label>
          Nombre
          <input name="name" required />
        </label>
        <label>
          Email
          <input name="email" type="email" required />
        </label>
        <label>
          Password
          <input name="password" type="password" required />
        </label>
        <button
          type="submit"
          className="btn-primary"
          disabled={registerMutation.isPending}
        >
          Crear cuenta
        </button>
      </form>
    </section>
  );
}
