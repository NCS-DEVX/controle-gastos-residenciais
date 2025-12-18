using ControleGastos.Api.DTOs;
using ControleGastos.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace ControleGastos.Api.Controllers
{
    [ApiController]
    [Route("api/relatorios")]
    public class RelatorioController : ControllerBase
    {
        private readonly RelatorioService _service;

        public RelatorioController(RelatorioService service)
        {
            _service = service;
        }

        [HttpGet("pessoas")]
        public async Task<IActionResult> GetTotaisPorPessoa()
        {
            var (pessoas, totalReceitas, totalDespesas, _) =
                await _service.ObterTotaisPorPessoaAsync();

            var response = new RelatorioPessoaResponseDto
            {
                Pessoas = pessoas,
                TotalReceitas = totalReceitas,
                TotalDespesas = totalDespesas
                // SaldoGeral é calculado automaticamente no DTO
            };

            return Ok(response);
        }

        [HttpGet("categorias")]
        public async Task<IActionResult> GetTotaisPorCategoria()
        {
            var (categorias, totalReceitas, totalDespesas, _) =
                await _service.ObterTotaisPorCategoriaAsync();

            var response = new RelatorioCategoriaResponseDto
            {
                Categorias = categorias,
                TotalReceitas = totalReceitas,
                TotalDespesas = totalDespesas
                // SaldoGeral é calculado automaticamente no DTO
            };

            return Ok(response);
        }
    }
}