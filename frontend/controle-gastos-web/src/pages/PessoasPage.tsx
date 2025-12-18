import { useEffect, useState } from "react";
import { api } from "../api/api";
import type { Pessoa } from "../models/Pessoa";

export function PessoasPage() {
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState<number | "">("");
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  async function carregarPessoas() {
    try {
      setErro("");
      setCarregando(true);

      const resp = await api.get<Pessoa[]>("/pessoas");
      setPessoas(resp.data);
    } catch {
      setErro("Não consegui carregar as pessoas.");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarPessoas();
  }, []);

  async function adicionar() {
    try {
      setErro("");

      const idadeNumero = typeof idade === "string" ? Number(idade) : idade;

      if (!nome.trim()) {
        setErro("Informe o nome.");
        return;
      }

      if (!Number.isInteger(idadeNumero) || idadeNumero <= 0) {
        setErro("Idade deve ser um número inteiro positivo.");
        return;
      }

      await api.post("/pessoas", {
        nome: nome.trim(),
        idade: idadeNumero,
      });

      setNome("");
      setIdade("");
      await carregarPessoas();
    } catch {
      setErro("Não consegui adicionar a pessoa.");
    }
  }

  async function excluir(id: number) {
    try {
      setErro("");
      await api.delete(`/pessoas/${id}`);
      await carregarPessoas();
    } catch {
      setErro("Não consegui excluir a pessoa.");
    }
  }

  return (
    <div className="card">
      <div className="cardBody">
        <div className="row" style={{ justifyContent: "space-between" }}>
          <div>
            <h1 className="h1">Pessoas</h1>
            <div className="subtle">
              Cadastre e gerencie as pessoas do sistema.
            </div>
          </div>

          <span className="badge">{pessoas.length} cadastrada(s)</span>
        </div>

        <hr className="sep" />

        <div className="row" style={{ alignItems: "flex-end" }}>
          <div className="field" style={{ flex: 1 }}>
            <div className="label">Nome</div>
            <input
              className="input"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Ex: Nathan Silva"
            />
          </div>

          <div className="field" style={{ width: 160 }}>
            <div className="label">Idade</div>
            <input
              className="input"
              value={idade}
              onChange={(e) => {
                const v = e.target.value;
                if (v === "") return setIdade("");
                const n = Number(v);
                if (!Number.isNaN(n)) setIdade(n);
              }}
              inputMode="numeric"
              placeholder="Ex: 26"
            />
          </div>

          <button
            className="btn btnAccent"
            onClick={adicionar}
            disabled={carregando}
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
        ) : pessoas.length === 0 ? (
          <div className="subtle">Nenhuma pessoa cadastrada ainda.</div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th style={{ width: 80 }}>ID</th>
                <th>Nome</th>
                <th style={{ width: 120 }}>Idade</th>
                <th style={{ width: 140 }} />
              </tr>
            </thead>
            <tbody>
              {pessoas.map((p) => (
                <tr key={p.id}>
                  <td className="subtle">#{p.id}</td>
                  <td style={{ fontWeight: 800 }}>{p.nome}</td>
                  <td>{p.idade} anos</td>
                  <td style={{ textAlign: "right" }}>
                    <button
                      className="btn btnDanger"
                      onClick={() => excluir(p.id)}
                    >
                      Excluir
                    </button>
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
