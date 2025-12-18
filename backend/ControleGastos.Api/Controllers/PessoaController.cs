using ControleGastos.Api.Models;
using ControleGastos.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace ControleGastos.Api.Controllers
{
    [ApiController]
    [Route("api/pessoas")]
    public class PessoaController : ControllerBase
    {
        private readonly PessoaService _service;

        public PessoaController(PessoaService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var pessoas = await _service.ListarAsync();
            return Ok(pessoas);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Pessoa pessoa)
        {
            var criada = await _service.CriarAsync(pessoa);
            return CreatedAtAction(nameof(Get), new { id = criada.Id }, criada);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _service.RemoverAsync(id);
            return NoContent();
        }
    }
}