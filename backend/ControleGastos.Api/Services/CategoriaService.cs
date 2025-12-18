using ControleGastos.Api.Data;
using ControleGastos.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace ControleGastos.Api.Services
{
    public class CategoriaService
    {
        private readonly AppDbContext _context;

        public CategoriaService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Categoria>> ListarAsync()
        {
            return await _context.Categorias
                .AsNoTracking()
                .ToListAsync();
        }

        public async Task<Categoria> CriarAsync(Categoria categoria)
        {
            if (categoria == null)
                throw new ArgumentNullException(nameof(categoria));

            _context.Categorias.Add(categoria);
            await _context.SaveChangesAsync();

            return categoria;
        }
    }
}