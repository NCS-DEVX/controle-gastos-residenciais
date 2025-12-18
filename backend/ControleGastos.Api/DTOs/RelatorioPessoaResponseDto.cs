using System.Collections.Generic;

namespace ControleGastos.Api.DTOs
{
    public class RelatorioPessoaResponseDto
    {
        public List<RelatorioPessoaDto> Pessoas { get; set; } = new();

        public decimal TotalReceitas { get; set; }
        public decimal TotalDespesas { get; set; }

        public decimal SaldoGeral => TotalReceitas - TotalDespesas;
    }
}