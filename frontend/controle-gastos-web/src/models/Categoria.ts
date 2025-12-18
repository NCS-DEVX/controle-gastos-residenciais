import { FinalidadeCategoria } from "./Enums";

export interface Categoria {
  id: number;
  descricao: string;
  finalidade: FinalidadeCategoria;
}
