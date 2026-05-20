# Videojuegos Web (Frontend)

Aplicacion React + Vite + TanStack Router/Query para explorar videojuegos, ver detalle y gestionar resenas de usuario.

## API externa

Este frontend consume FreeToGame:

- Base URL: https://www.freetogame.com
- Endpoints usados:
  - /api/games
  - /api/game?id={id}

No requiere API key.

Si la API falla, la app usa datos mock como fallback.

## Comandos (Bun)

- bun install
- bun run dev
- bun run test
- bun run build
