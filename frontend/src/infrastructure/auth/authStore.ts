import type { User } from "../../domain/entities";
import type { AuthRepository } from "../../domain/ports";

const AUTH_KEY = "videojuegos-web-user";

function readUser(): User | null {
  const raw = localStorage.getItem(AUTH_KEY);
  if (!raw) {
    return null;
  }
  try {
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
}

function saveUser(user: User | null) {
  if (!user) {
    localStorage.removeItem(AUTH_KEY);
    return;
  }
  localStorage.setItem(AUTH_KEY, JSON.stringify(user));
}

export const authRepository: AuthRepository = {
  async login(email) {
    const user: User = {
      id: crypto.randomUUID(),
      name: email.split("@")[0] || "Jugador",
      email,
    };
    saveUser(user);
    return user;
  },
  async register(name, email) {
    const user: User = {
      id: crypto.randomUUID(),
      name,
      email,
    };
    saveUser(user);
    return user;
  },
  async logout() {
    saveUser(null);
  },
  async me() {
    return readUser();
  },
};
