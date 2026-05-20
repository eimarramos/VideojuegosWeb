import {
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from "@tanstack/react-router";
import { getCurrentUser } from "../application/use-cases/auth";
import { Layout } from "./components/Layout";
import { GameDetailPage } from "./pages/GameDetailPage";
import { GamesPage } from "./pages/GamesPage";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { ProfilePage } from "./pages/ProfilePage";
import { RegisterPage } from "./pages/RegisterPage";

const allowedGenres = [
  "RPG",
  "Action",
  "Adventure",
  "Sports",
  "Shooter",
  "all",
];
const allowedPlatforms = ["PC", "PlayStation", "Xbox", "Nintendo", "all"];
const allowedPopularity = ["all", "high", "medium", "low"];

const rootRoute = createRootRoute({
  component: Layout,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const gamesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/games",
  validateSearch: (search: Record<string, unknown>) => {
    const genre = typeof search.genre === "string" ? search.genre : "all";
    const platform =
      typeof search.platform === "string" ? search.platform : "all";
    const popularity =
      typeof search.popularity === "string" ? search.popularity : "all";

    return {
      search: typeof search.search === "string" ? search.search : undefined,
      genre: allowedGenres.includes(genre) ? genre : "all",
      platform: allowedPlatforms.includes(platform) ? platform : "all",
      popularity: allowedPopularity.includes(popularity) ? popularity : "all",
    };
  },
  component: GamesPage,
});

const gameDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/games/$id",
  component: GameDetailPage,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/register",
  component: RegisterPage,
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile",
  beforeLoad: async () => {
    const user = await getCurrentUser();
    if (!user) {
      throw redirect({ to: "/login" });
    }
  },
  component: ProfilePage,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  gamesRoute,
  gameDetailRoute,
  loginRoute,
  registerRoute,
  profileRoute,
]);

export const router = createRouter({
  routeTree,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
