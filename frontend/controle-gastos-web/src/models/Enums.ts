export const TipoTransacao = {
  Despesa: 0,
  Receita: 1,
} as const;

export type TipoTransacao = (typeof TipoTransacao)[keyof typeof TipoTransacao];

export const FinalidadeCategoria = {
  Despesa: 0,
  Receita: 1,
  Ambas: 2,
} as const;

export type FinalidadeCategoria =
  (typeof FinalidadeCategoria)[keyof typeof FinalidadeCategoria];

export function tipoTransacaoLabel(tipo: TipoTransacao): string {
  switch (tipo) {
    case TipoTransacao.Despesa:
      return "Despesa";
    case TipoTransacao.Receita:
      return "Receita";
    default:
      return "Desconhecido";
  }
}

export function finalidadeCategoriaLabel(
  finalidade: FinalidadeCategoria
): string {
  switch (finalidade) {
    case FinalidadeCategoria.Despesa:
      return "Despesa";
    case FinalidadeCategoria.Receita:
      return "Receita";
    case FinalidadeCategoria.Ambas:
      return "Ambas";
    default:
      return "Desconhecida";
  }
}
