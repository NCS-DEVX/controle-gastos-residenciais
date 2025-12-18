using ControleGastos.Api.Models;
using ControleGastos.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace ControleGastos.Api.Controllers
{
    [ApiController]
    [Route("api/categorias")]
    public class CategoriaController : ControllerBase
    {
        private readonly CategoriaService _service;

        public CategoriaController(CategoriaService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var categorias = await _service.ListarAsync();
            return Ok(categorias);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Categoria categoria)
        {
            var criada = await _service.CriarAsync(categoria);
            return CreatedAtAction(nameof(Get), new { id = criada.Id }, criada);
        }
    }
}
