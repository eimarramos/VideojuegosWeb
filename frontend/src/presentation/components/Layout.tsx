import { Link, Outlet } from "@tanstack/react-router";

export function Layout() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <h1>Videojuegos Web</h1>
        <nav>
          <Link to="/" className="nav-link">
            Inicio
          </Link>
          <Link
            to="/games"
            search={{
              search: undefined,
              genre: "all",
              platform: "all",
              popularity: "all",
            }}
            className="nav-link"
          >
            Videojuegos
          </Link>
          <Link to="/login" className="nav-link">
            Login
          </Link>
          <Link to="/register" className="nav-link">
            Registro
          </Link>
        </nav>
      </header>
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}
