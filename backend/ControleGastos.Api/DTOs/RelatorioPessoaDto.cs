namespace ControleGastos.Api.DTOs
{
    public class RelatorioPessoaDto
    {
        public int PessoaId { get; set; }
        public string NomePessoa { get; set; } = string.Empty;

        public decimal TotalReceitas { get; set; }
        public decimal TotalDespesas { get; set; }

        public decimal Saldo => TotalReceitas - TotalDespesas;
    }
}