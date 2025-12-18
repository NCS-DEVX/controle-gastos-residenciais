export interface RelatorioPessoa {
  pessoaId: number;
  nomePessoa: string;
  totalReceitas: number;
  totalDespesas: number;
  saldo: number;
}

export interface RelatorioCategoria {
  categoriaId: number;
  descricaoCategoria: string;
  totalReceitas: number;
  totalDespesas: number;
  saldo: number;
}

export interface RelatorioPessoasResponse {
  pessoas: RelatorioPessoa[];
  totalReceitas: number;
  totalDespesas: number;
  saldoGeral: number;
}

export interface RelatorioCategoriasResponse {
  categorias: RelatorioCategoria[];
  totalReceitas: number;
  totalDespesas: number;
  saldoGeral: number;
}
