import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/Layout";

import { PessoasPage } from "./pages/PessoasPage";
import { CategoriasPage } from "./pages/CategoriasPage";
import { TransacoesPage } from "./pages/TransacoesPage";
import { RelatoriosPage } from "./pages/RelatoriosPage";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout é o "pai" das rotas */}
        <Route element={<Layout />}>
          {/* rota padrão */}
          <Route path="/" element={<Navigate to="/pessoas" replace />} />

          {/* páginas */}
          <Route path="/pessoas" element={<PessoasPage />} />
          <Route path="/categorias" element={<CategoriasPage />} />
          <Route path="/transacoes" element={<TransacoesPage />} />
          <Route path="/relatorios" element={<RelatoriosPage />} />

          {/* fallback para qualquer rota inválida */}
          <Route path="*" element={<Navigate to="/pessoas" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
