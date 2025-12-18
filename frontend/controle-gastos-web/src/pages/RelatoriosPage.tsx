import { useEffect, useMemo, useState } from "react";
import { api } from "../api/api";
import type {
  RelatorioPessoasResponse,
  RelatorioCategoriasResponse,
} from "../models/Relatorios";

export function RelatoriosPage() {
  const [relatorioPessoas, setRelatorioPessoas] =
    useState<RelatorioPessoasResponse | null>(null);

  const [relatorioCategorias, setRelatorioCategorias] =
    useState<RelatorioCategoriasResponse | null>(null);

  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  /**
   * Formata valores monetários no padrão pt-BR (R$ 1.234,56).
   */
  const formatadorMoeda = useMemo(
    () =>
      new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }),
    []
  );

  function moeda(valor: number) {
    return formatadorMoeda.format(valor);
  }

  async function carregarRelatorios() {
    try {
      setErro("");
      setCarregando(true);

      const [pessoasResp, categoriasResp] = await Promise.all([
        api.get<RelatorioPessoasResponse>("/relatorios/pessoas"),
        api.get<RelatorioCategoriasResponse>("/relatorios/categorias"),
      ]);

      setRelatorioPessoas(pessoasResp.data);
      setRelatorioCategorias(categoriasResp.data);
    } catch {
      setErro("Não consegui carregar os relatórios.");
      setRelatorioPessoas(null);
      setRelatorioCategorias(null);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarRelatorios();
  }, []);

  return (
    <div className="card">
      <div className="cardBody">
        {/* Cabeçalho */}
        <div
          className="row"
          style={{ justifyContent: "space-between", alignItems: "flex-start" }}
        >
          <div>
            <h1 className="h1">Relatórios</h1>
            <div className="subtle">
              Visão consolidada de receitas, despesas e saldo.
            </div>
          </div>

          <span className="badge">
            {carregando ? "Atualizando…" : "Consolidado"}
          </span>
        </div>

        <hr className="sep" />

        {erro && (
          <div className="card" style={{ marginBottom: 16 }}>
            <div
              className="cardBody"
              style={{ borderLeft: "4px solid rgba(229,83,61,0.55)" }}
            >
              <div style={{ fontWeight: 800, color: "#7a1b10" }}>
                Erro ao carregar relatórios
              </div>
              <div className="subtle" style={{ marginTop: 4 }}>
                {erro}
              </div>
            </div>
          </div>
        )}

        {carregando && <div className="subtle">Carregando relatórios…</div>}

        {/* ===================== */}
        {/* RELATÓRIO POR PESSOA */}
        {/* ===================== */}
        <section style={{ marginTop: 12 }}>
          <h2 style={{ margin: "0 0 8px 0" }}>Totais por Pessoa</h2>

          {!relatorioPessoas && !carregando ? (
            <div className="subtle">Nenhum dado disponível.</div>
          ) : (
            relatorioPessoas && (
              <>
                <table className="table">
                  <thead>
                    <tr>
                      <th style={{ width: 80 }}>ID</th>
                      <th>Pessoa</th>
                      <th style={{ width: 160 }}>Receitas</th>
                      <th style={{ width: 160 }}>Despesas</th>
                      <th style={{ width: 160 }}>Saldo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {relatorioPessoas.pessoas.map((p) => (
                      <tr key={p.pessoaId}>
                        <td className="subtle">#{p.pessoaId}</td>
                        <td style={{ fontWeight: 800 }}>{p.nomePessoa}</td>
                        <td>{moeda(p.totalReceitas)}</td>
                        <td>{moeda(p.totalDespesas)}</td>
                        <td style={{ fontWeight: 800 }}>{moeda(p.saldo)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Totais */}
                <div
                  className="row"
                  style={{ justifyContent: "flex-end", marginTop: 10 }}
                >
                  <span className="badge">
                    Receitas: {moeda(relatorioPessoas.totalReceitas)}
                  </span>
                  <span className="badge">
                    Despesas: {moeda(relatorioPessoas.totalDespesas)}
                  </span>
                  <span className="badge">
                    Saldo Geral: {moeda(relatorioPessoas.saldoGeral)}
                  </span>
                </div>
              </>
            )
          )}
        </section>

        <hr className="sep" />

        {/* ======================== */}
        {/* RELATÓRIO POR CATEGORIA */}
        {/* ======================== */}
        <section>
          <h2 style={{ margin: "0 0 8px 0" }}>Totais por Categoria</h2>

          {!relatorioCategorias && !carregando ? (
            <div className="subtle">Nenhum dado disponível.</div>
          ) : (
            relatorioCategorias && (
              <>
                <table className="table">
                  <thead>
                    <tr>
                      <th style={{ width: 80 }}>ID</th>
                      <th>Categoria</th>
                      <th style={{ width: 160 }}>Receitas</th>
                      <th style={{ width: 160 }}>Despesas</th>
                      <th style={{ width: 160 }}>Saldo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {relatorioCategorias.categorias.map((c) => (
                      <tr key={c.categoriaId}>
                        <td className="subtle">#{c.categoriaId}</td>
                        <td style={{ fontWeight: 800 }}>
                          {c.descricaoCategoria}
                        </td>
                        <td>{moeda(c.totalReceitas)}</td>
                        <td>{moeda(c.totalDespesas)}</td>
                        <td style={{ fontWeight: 800 }}>{moeda(c.saldo)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div
                  className="row"
                  style={{ justifyContent: "flex-end", marginTop: 10 }}
                >
                  <span className="badge">
                    Receitas: {moeda(relatorioCategorias.totalReceitas)}
                  </span>
                  <span className="badge">
                    Despesas: {moeda(relatorioCategorias.totalDespesas)}
                  </span>
                  <span className="badge">
                    Saldo Geral: {moeda(relatorioCategorias.saldoGeral)}
                  </span>
                </div>
              </>
            )
          )}
        </section>
      </div>
    </div>
  );
}
