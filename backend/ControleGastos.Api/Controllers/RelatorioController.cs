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
            var (pessoas, totalReceitas, totalDespesas, saldoGeral)
                = await _service.ObterTotaisPorPessoaAsync();

            return Ok(new
            {
                Pessoas = pessoas,
                TotalReceitas = totalReceitas,
                TotalDespesas = totalDespesas,
                SaldoGeral = saldoGeral
            });
        }

        [HttpGet("categorias")]
        public async Task<IActionResult> GetTotaisPorCategoria()
        {
            var (categorias, totalReceitas, totalDespesas, saldoGeral)
                = await _service.ObterTotaisPorCategoriaAsync();

            return Ok(new
            {
                Categorias = categorias,
                TotalReceitas = totalReceitas,
                TotalDespesas = totalDespesas,
                SaldoGeral = saldoGeral
            });
        }
    }
}