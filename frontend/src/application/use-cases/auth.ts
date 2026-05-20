import { authRepository } from "../../infrastructure/auth/authStore";

export function login(email: string, password: string) {
  return authRepository.login(email, password);
}

export function register(name: string, email: string, password: string) {
  return authRepository.register(name, email, password);
}

export function logout() {
  return authRepository.logout();
}

export function getCurrentUser() {
  return authRepository.me();
}
