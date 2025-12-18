import { TipoTransacao } from "./Enums";

export interface Transacao {
  id: number;
  descricao: string;
  valor: number;
  tipo: TipoTransacao;
  pessoaId: number;
  categoriaId: number;
}
