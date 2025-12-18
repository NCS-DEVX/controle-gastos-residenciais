import { NavLink, Outlet } from "react-router-dom";
import "./Layout.css";

/**
 * Layout base da aplicação.
 * Mantém as rotas organizadas e fornece uma navegação consistente.
 * Somente UI (não altera regra de negócio).
 */
export function Layout() {
  return (
    <div className="appShell">
      <header className="topbar">
        <div className="topbarInner">
          <div className="brand">
            <div className="brandMark" aria-hidden="true" />
            <div>
              <div className="brandTitle">Controle de Gastos</div>
              <div className="brandSub">Residencial</div>
            </div>
          </div>

          <nav className="nav">
            <NavLink
              to="/pessoas"
              className={({ isActive }) =>
                `navLink ${isActive ? "active" : ""}`
              }
            >
              Pessoas
            </NavLink>
            <NavLink
              to="/categorias"
              className={({ isActive }) =>
                `navLink ${isActive ? "active" : ""}`
              }
            >
              Categorias
            </NavLink>
            <NavLink
              to="/transacoes"
              className={({ isActive }) =>
                `navLink ${isActive ? "active" : ""}`
              }
            >
              Transações
            </NavLink>
            <NavLink
              to="/relatorios"
              className={({ isActive }) =>
                `navLink ${isActive ? "active" : ""}`
              }
            >
              Relatórios
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="container">
        <Outlet />
      </main>
    </div>
  );
}
