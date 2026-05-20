import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { login } from "../../application/use-cases/auth";

export function LoginPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: (payload: { email: string; password: string }) =>
      login(payload.email, payload.password),
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
      <h2>Iniciar sesion</h2>
      <form
        className="review-form"
        onSubmit={(e) => {
          e.preventDefault();
          const form = new FormData(e.currentTarget);
          const email = String(form.get("email") || "");
          const password = String(form.get("password") || "");
          loginMutation.mutate({ email, password });
        }}
      >
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
          disabled={loginMutation.isPending}
        >
          Entrar
        </button>
      </form>
    </section>
  );
}
