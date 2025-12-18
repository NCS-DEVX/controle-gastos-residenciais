import { useEffect, useMemo, useState } from "react";
import { api } from "../api/api";
import type { Pessoa } from "../models/Pessoa";
import type { Categoria } from "../models/Categoria";
import type { Transacao } from "../models/Transacao";
import {
  TipoTransacao,
  FinalidadeCategoria,
  tipoTransacaoLabel,
} from "../models/Enums";

export function TransacoesPage() {
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState<number | "">("");
  const [tipo, setTipo] = useState<TipoTransacao>(TipoTransacao.Despesa);
  const [pessoaId, setPessoaId] = useState<number>(0);
  const [categoriaId, setCategoriaId] = useState<number>(0);

  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  function formatarMoeda(v: number) {
    return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }

  async function carregarDados() {
    try {
      setErro("");
      setCarregando(true);

      const [t, p, c] = await Promise.all([
        api.get<Transacao[]>("/transacoes"),
        api.get<Pessoa[]>("/pessoas"),
        api.get<Categoria[]>("/categorias"),
      ]);

      setTransacoes(t.data);
      setPessoas(p.data);
      setCategorias(c.data);
    } catch {
      setErro("Não consegui carregar os dados.");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarDados();
  }, []);

  const categoriasFiltradas = useMemo(() => {
    return categorias.filter((c) => {
      if (c.finalidade === FinalidadeCategoria.Ambas) return true;

      return tipo === TipoTransacao.Despesa
        ? c.finalidade === FinalidadeCategoria.Despesa
        : c.finalidade === FinalidadeCategoria.Receita;
    });
  }, [categorias, tipo]);

  const podeCriar =
    descricao.trim().length >= 2 &&
    typeof valor === "number" &&
    valor > 0 &&
    pessoaId > 0 &&
    categoriaId > 0;

  async function criar() {
    try {
      setErro("");

      if (!podeCriar) {
        setErro("Preencha todos os campos obrigatórios.");
        return;
      }

      await api.post("/transacoes", {
        descricao: descricao.trim(),
        valor,
        tipo,
        pessoaId,
        categoriaId,
      });

      // Mantém pessoa/tipo para facilitar cadastro em sequência.
      setDescricao("");
      setValor("");
      setCategoriaId(0);

      await carregarDados();
    } catch (e) {
      setErro(typeof e === "string" ? e : "Erro ao criar transação.");
    }
  }

  return (
    <div className="card">
      <div className="cardBody">
        <div
          className="row"
          style={{ justifyContent: "space-between", alignItems: "flex-start" }}
        >
          <div>
            <h1 className="h1">Transações</h1>
            <div className="subtle">
              Cadastre despesas e receitas vinculadas a pessoas e categorias.
            </div>
          </div>

          <div className="row" style={{ gap: 10 }}>
            <span className="badge">{transacoes.length} registrada(s)</span>
            <span className="badge">
              Tipo: {tipo === TipoTransacao.Despesa ? "Despesa" : "Receita"}
            </span>
          </div>
        </div>

        <hr className="sep" />

        {/* Formulário */}
        <div className="row" style={{ alignItems: "flex-end" }}>
          <div className="field" style={{ flex: 1 }}>
            <div className="label">Descrição</div>
            <input
              className="input"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Ex: Aluguel, Mercado, Salário..."
            />
          </div>

          <div className="field" style={{ width: 180 }}>
            <div className="label">Valor</div>
            <input
              className="input"
              type="number"
              value={valor}
              onChange={(e) =>
                setValor(e.target.value === "" ? "" : Number(e.target.value))
              }
              min={0}
              step="0.01"
              placeholder="0,00"
            />
          </div>

          <div className="field" style={{ width: 180 }}>
            <div className="label">Tipo</div>
            <select
              className="input"
              value={tipo}
              onChange={(e) => {
                setTipo(Number(e.target.value) as TipoTransacao);
                setCategoriaId(0); // força selecionar categoria compatível
              }}
            >
              <option value={TipoTransacao.Despesa}>Despesa</option>
              <option value={TipoTransacao.Receita}>Receita</option>
            </select>
          </div>

          <div className="field" style={{ width: 260 }}>
            <div className="label">Pessoa</div>
            <select
              className="input"
              value={pessoaId}
              onChange={(e) => setPessoaId(Number(e.target.value))}
            >
              <option value={0}>Selecione</option>
              {pessoas.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nome} ({p.idade})
                </option>
              ))}
            </select>
          </div>

          <div className="field" style={{ width: 260 }}>
            <div className="label">Categoria</div>
            <select
              className="input"
              value={categoriaId}
              onChange={(e) => setCategoriaId(Number(e.target.value))}
            >
              <option value={0}>Selecione</option>
              {categoriasFiltradas.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.descricao}
                </option>
              ))}
            </select>
          </div>

          <button
            className="btn btnAccent"
            onClick={criar}
            disabled={!podeCriar || carregando}
          >
            Adicionar
          </button>
        </div>

        {erro && (
          <div style={{ marginTop: 12 }}>
            <span className="badge">{erro}</span>
          </div>
        )}

        <hr className="sep" />

        {/* Lista */}
        {carregando ? (
          <div className="subtle">Carregando...</div>
        ) : transacoes.length === 0 ? (
          <div className="subtle">Nenhuma transação registrada.</div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Descrição</th>
                <th>Tipo</th>
                <th>Valor</th>
              </tr>
            </thead>
            <tbody>
              {transacoes.map((t) => (
                <tr key={t.id}>
                  <td>#{t.id}</td>
                  <td>{t.descricao}</td>
                  <td>
                    <span className="badge">{tipoTransacaoLabel(t.tipo)}</span>
                  </td>
                  <td>{formatarMoeda(t.valor)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
