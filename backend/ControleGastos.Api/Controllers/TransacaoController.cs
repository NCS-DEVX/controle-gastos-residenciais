using ControleGastos.Api.Models;
using ControleGastos.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace ControleGastos.Api.Controllers
{
    [ApiController]
    [Route("api/transacoes")]
    public class TransacaoController : ControllerBase
    {
        private readonly TransacaoService _service;

        public TransacaoController(TransacaoService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var transacoes = await _service.ListarAsync();
            return Ok(transacoes);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Transacao transacao)
        {
            var criada = await _service.CriarAsync(transacao);
            return StatusCode(StatusCodes.Status201Created, criada);
        }
    }
}

