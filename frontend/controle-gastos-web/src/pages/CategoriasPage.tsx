import { useEffect, useState } from "react";
import { api } from "../api/api";
import type { Categoria } from "../models/Categoria";
import { FinalidadeCategoria, finalidadeCategoriaLabel } from "../models/Enums";

export function CategoriasPage() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [descricao, setDescricao] = useState("");
  const [finalidade, setFinalidade] = useState<FinalidadeCategoria>(
    FinalidadeCategoria.Despesa
  );
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function carregarCategorias() {
    try {
      setErro("");
      setCarregando(true);

      const response = await api.get<Categoria[]>("/categorias");
      setCategorias(response.data);
    } catch {
      setErro("Não consegui carregar as categorias.");
    } finally {
      setCarregando(false);
    }
  }

  async function criarCategoria() {
    try {
      setErro("");

      if (!descricao.trim()) {
        setErro("Informe a descrição da categoria.");
        return;
      }

      await api.post("/categorias", {
        descricao: descricao.trim(),
        finalidade,
      });

      setDescricao("");
      setFinalidade(FinalidadeCategoria.Despesa);
      await carregarCategorias();
    } catch {
      setErro("Não consegui criar a categoria.");
    }
  }

  useEffect(() => {
    carregarCategorias();
  }, []);

  return (
    <div className="card">
      <div className="cardBody">
        <div
          className="row"
          style={{ justifyContent: "space-between", alignItems: "flex-start" }}
        >
          <div>
            <h1 className="h1">Categorias</h1>
            <div className="subtle">
              Cadastre categorias e defina a finalidade.
            </div>
          </div>

          <span className="badge">{categorias.length} cadastrada(s)</span>
        </div>

        <hr className="sep" />

        <div className="row" style={{ alignItems: "flex-end" }}>
          <div className="field" style={{ flex: 1 }}>
            <div className="label">Descrição</div>
            <input
              className="input"
              placeholder="Ex: Alimentação"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
          </div>

          <div className="field" style={{ width: 220 }}>
            <div className="label">Finalidade</div>
            <select
              className="input"
              value={finalidade}
              onChange={(e) =>
                setFinalidade(Number(e.target.value) as FinalidadeCategoria)
              }
            >
              <option value={FinalidadeCategoria.Despesa}>Despesa</option>
              <option value={FinalidadeCategoria.Receita}>Receita</option>
              <option value={FinalidadeCategoria.Ambas}>Ambas</option>
            </select>
          </div>

          <button
            className="btn btnAccent"
            onClick={criarCategoria}
            disabled={!descricao.trim() || carregando}
          >
            Adicionar
          </button>
        </div>

        {erro && (
          <div style={{ marginTop: 12 }} className="card">
            <div
              className="cardBody"
              style={{ borderLeft: "4px solid rgba(229,83,61,0.55)" }}
            >
              <div style={{ fontWeight: 800 }}>Atenção</div>
              <div className="subtle" style={{ marginTop: 4 }}>
                {erro}
              </div>
            </div>
          </div>
        )}

        <hr className="sep" />

        {carregando ? (
          <div className="subtle">Carregando...</div>
        ) : categorias.length === 0 ? (
          <div className="subtle">Nenhuma categoria cadastrada ainda.</div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th style={{ width: 80 }}>ID</th>
                <th>Descrição</th>
                <th style={{ width: 220 }}>Finalidade</th>
              </tr>
            </thead>
            <tbody>
              {categorias.map((c) => (
                <tr key={c.id}>
                  <td className="subtle">#{c.id}</td>
                  <td style={{ fontWeight: 800 }}>{c.descricao}</td>
                  <td>
                    <span className="badge">
                      {finalidadeCategoriaLabel(c.finalidade)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
